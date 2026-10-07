import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../config';

export type Fonte = CollectionEntry<'fontes'>['data'] & { id: string };
export type Post = CollectionEntry<'posts'>;
export type Moeda = CollectionEntry<'moedas'>;
export type Termo = { id: string; termo: string; explicacao: string };

const MARCA_FONTE = /\[\[([a-z0-9-]+)\]\]/g;
const MARCA_TERMO = /\(\(([^)|]+)(?:\|([a-z0-9-]+))?\)\)/g;

export function slugificar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapar(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- Carregamento e validação ("sem fonte, não compila") ---------- */

type Conteudo = {
  fontes: Map<string, Fonte>;
  termos: Map<string, Termo>;
  posts: Post[];
  moedas: Moeda[];
  eixos: CollectionEntry<'eixos'>[];
  linha: CollectionEntry<'linhaDoTempo'>[];
  usoDasFontes: Map<string, { titulo: string; url: string }[]>;
  pendencias: string[];
};

let cache: Promise<Conteudo> | null = null;

export function carregarConteudo(): Promise<Conteudo> {
  cache ??= montar();
  return cache;
}

/** Devolve, na ordem em que aparecem, todos os ids de fonte citados (marcas [[id]] e listas `fontes`). */
export function idsCitados(valor: unknown): Set<string> {
  const ids = new Set<string>();
  const visitar = (v: unknown, chave?: string) => {
    if (typeof v === 'string') {
      for (const m of v.matchAll(MARCA_FONTE)) ids.add(m[1]);
    } else if (Array.isArray(v)) {
      if (chave === 'fontes') v.forEach((id) => typeof id === 'string' && ids.add(id));
      else v.forEach((x) => visitar(x));
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) visitar(x, k);
    }
  };
  visitar(valor);
  return ids;
}

function varrer(valor: unknown, strings: string[]) {
  if (typeof valor === 'string') strings.push(valor);
  else if (Array.isArray(valor)) valor.forEach((v) => varrer(v, strings));
  else if (valor && typeof valor === 'object') Object.values(valor).forEach((v) => varrer(v, strings));
}

function termosCitados(valor: unknown): string[] {
  const strings: string[] = [];
  varrer(valor, strings);
  const ids: string[] = [];
  for (const s of strings) for (const m of s.matchAll(MARCA_TERMO)) ids.push(m[2] ?? slugificar(m[1]));
  return ids;
}

/** Blocos com rótulo factual precisam de fonte no próprio bloco ou marcada no texto. */
function validarBlocos(blocos: any[], onde: string, erros: string[]) {
  blocos.forEach((b, i) => {
    if (b.tipo === 'texto' || b.tipo === 'lista') {
      const factual = ['fato', 'dado', 'declaracao', 'contexto'].includes(b.rotulo);
      const temMarca = JSON.stringify(b).match(MARCA_FONTE);
      if (factual && !b.fontes?.length && !temMarca) {
        erros.push(`${onde}, bloco ${i + 1} (${b.rotulo}): afirmação sem fonte.`);
      }
    }
  });
}

/** Slides de fato (problema, esquerda, consequência), números e citações precisam de fonte. */
function validarSlides(slides: any[], onde: string, erros: string[]) {
  slides.forEach((sl, i) => {
    const local = `${onde}, slide ${i + 1} (${sl.tipo})`;
    const temFonte = sl.fontes?.length || `${sl.frase} ${sl.contexto ?? ''}`.match(MARCA_FONTE);
    const exige = ['problema', 'esquerda', 'consequencia'].includes(sl.tipo) || sl.numero || sl.autor;
    if (exige && !temFonte) erros.push(`${local}: slide de fato sem fonte.`);
    if (sl.mais) validarBlocos(sl.mais.blocos, `${local} › quero entender melhor`, erros);
  });
}

async function montar(): Promise<Conteudo> {
  const [fontesC, glossC, postsC, moedasC, eixosC, linhaC] = await Promise.all([
    getCollection('fontes'),
    getCollection('glossario'),
    getCollection('posts'),
    getCollection('moedas'),
    getCollection('eixos'),
    getCollection('linhaDoTempo'),
  ]);

  const fontes = new Map<string, Fonte>(fontesC.map((f) => [f.id, { ...f.data, id: f.id }]));
  const termos = new Map<string, Termo>(glossC.map((g) => [g.id, { id: g.id, ...g.data }]));
  const posts = [...postsC].sort((a, b) => a.data.ordem - b.data.ordem);
  const moedas = moedasC;
  const erros: string[] = [];
  const pendencias: string[] = [];
  const usoDasFontes = new Map<string, { titulo: string; url: string }[]>();

  const registrarUso = (ids: Set<string>, titulo: string, url: string) => {
    for (const id of ids) {
      const lista = usoDasFontes.get(id) ?? [];
      if (!lista.some((u) => u.url === url)) lista.push({ titulo, url });
      usoDasFontes.set(id, lista);
    }
  };

  const conferir = (valor: unknown, onde: string) => {
    for (const id of idsCitados(valor)) if (!fontes.has(id)) erros.push(`${onde}: fonte "${id}" não existe em src/data/fontes.yaml.`);
    for (const t of termosCitados(valor)) if (!termos.has(t)) erros.push(`${onde}: termo "${t}" não existe no glossário.`);
  };

  for (const p of posts) {
    const onde = `Post "${p.id}"`;
    conferir(p.data, onde);
    validarSlides(p.data.slides, onde, erros);
    if (p.data.moeda && !moedas.some((m) => m.id === p.data.moeda)) erros.push(`${onde}: moeda "${p.data.moeda}" não existe.`);
    if (!eixosC.some((e) => e.id === p.data.eixo)) erros.push(`${onde}: eixo "${p.data.eixo}" não existe.`);
    if (!p.data.revisao.editorial) pendencias.push(`${onde}: revisão editorial pendente.`);
    if (p.data.risco === 'alto' && !p.data.revisao.juridica) pendencias.push(`${onde}: risco alto sem revisão jurídica.`);
    registrarUso(idsCitados(p.data), p.data.titulo, `/p/${p.id}`);
  }

  for (const m of moedas) {
    const onde = `Moeda "${m.id}"`;
    conferir(m.data, onde);
    for (const lado of ['vermelha', 'azul'] as const) validarSlides(m.data[lado].slides, `${onde} › ${lado}`, erros);
    // Face vermelha: nas palavras da própria esquerda (fonte nível A do campo).
    const idsVerm = idsCitados(m.data.vermelha);
    const temFonteDoCampo = [...idsVerm].some((id) => fontes.get(id)?.selos.includes('campo-esquerda'));
    if (!temFonteDoCampo) pendencias.push(`${onde}: face vermelha sem nenhuma fonte do próprio campo (selo campo-esquerda).`);
    registrarUso(idsCitados(m.data), m.data.titulo, `/duas-faces/${m.id}`);
  }

  for (const e of linhaC) {
    conferir(e.data, `Linha do tempo "${e.id}"`);
    registrarUso(idsCitados(e.data), 'Linha do tempo', '/linha-do-tempo');
  }

  // Pendências de fontes efetivamente usadas.
  for (const id of usoDasFontes.keys()) {
    const f = fontes.get(id);
    if (!f) continue;
    if (!f.trechoConferido) pendencias.push(`Fonte "${id}": trecho literal ainda não conferido no original.`);
    if (!f.urlArquivo && f.url) pendencias.push(`Fonte "${id}": falta link arquivado (Wayback/archive.today).`);
    if (f.nivel === 'C') pendencias.push(`Fonte "${id}": nível C não sustenta fato sozinha; acrescentar fonte A ou B.`);
  }

  if (erros.length) {
    throw new Error(`\n\n✖ SEM FONTE, NÃO COMPILA (${erros.length} problema(s)):\n  - ${erros.join('\n  - ')}\n`);
  }
  if (pendencias.length) {
    const msg = `${pendencias.length} pendência(s) editorial(is):\n  - ${pendencias.join('\n  - ')}`;
    if (SITE.modo === 'producao') throw new Error(`\n\n✖ MODO PRODUÇÃO BLOQUEADO — ${msg}\n`);
    console.warn(`\n⚠ Protótipo — ${msg}\n`);
  }

  return {
    fontes,
    termos,
    posts,
    moedas,
    eixos: [...eixosC].sort((a, b) => a.data.ordem - b.data.ordem),
    linha: [...linhaC].sort((a, b) => a.data.ano - b.data.ano),
    usoDasFontes,
    pendencias,
  };
}

/* ---------- Marcação de texto ---------- */
/**
 * **negrito**, ==marca-texto==, *itálico*, ((termo do glossário)) ou ((texto|id-do-termo)),
 * e [[id-da-fonte]] vira o selo de fonte clicável.
 */
export function marcar(texto: string, c: Pick<Conteudo, 'fontes' | 'termos'>): string {
  let s = escapar(texto);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/==(.+?)==/g, '<mark class="marca">$1</mark>');
  s = s.replace(/(^|[\s(])\*(?!\s)(.+?)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
  s = s.replace(MARCA_TERMO, (_, exibido: string, id?: string) => {
    const chave = id ?? slugificar(exibido);
    return `<button type="button" class="termo" data-termo="${chave}">${exibido}</button>`;
  });
  s = s.replace(/\s*\[\[([a-z0-9-]+)\]\]/g, (_, id: string) => seloHTML(id, c.fontes));
  return s;
}

export function seloHTML(id: string, fontes: Map<string, Fonte>): string {
  const f = fontes.get(id);
  const nome = escapar(f?.curto ?? id);
  return ` <button type="button" class="selo" data-fonte="${id}" data-nao-ler aria-label="Ver fonte: ${nome}"><span>${nome}</span><i aria-hidden="true">✓</i></button>`;
}

/** Texto puro (para leitura em voz alta, busca e descrições). */
export function textoPuro(texto: string): string {
  return texto
    .replace(MARCA_FONTE, '')
    .replace(MARCA_TERMO, '$1')
    .replace(/\*\*|==|\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const ROTULOS: Record<string, string> = {
  fato: 'Fato',
  dado: 'Dado',
  declaracao: 'Declaração',
  contexto: 'Contexto',
  opiniao: 'Opinião',
  valor: 'Valor defendido',
  posicao: 'Nossa posição',
  pergunta: 'Pergunta',
};

export const TIPOS_FONTE: Record<string, string> = {
  lei: 'Lei',
  'decisao-judicial': 'Decisão judicial',
  'documento-oficial': 'Documento oficial',
  'dado-oficial': 'Dado oficial',
  reportagem: 'Reportagem',
  'declaracao-oficial': 'Declaração oficial',
  'artigo-academico': 'Artigo acadêmico',
  livro: 'Livro',
  checagem: 'Checagem',
  enciclopedia: 'Enciclopédia',
};

export const NIVEIS: Record<string, string> = {
  A: 'Nível A: documento primário (lei, dado oficial, decisão, fala da própria pessoa)',
  B: 'Nível B: imprensa profissional ou estudo publicado',
  C: 'Nível C: complementar; não sustenta fato sozinha',
};

/** Dados enviados ao navegador (fichas de fonte, glossário, busca). */
/** Junta só o texto legível de um slide ou bloco (sem tipos, cores e ids de fonte), para a busca. */
function textoParaBusca(valor: unknown): string {
  const partes: string[] = [];
  const ignorar = new Set(['tipo', 'face', 'rotulo', 'fontes']);
  const visitar = (v: unknown) => {
    if (typeof v === 'string') partes.push(v);
    else if (Array.isArray(v)) v.forEach(visitar);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!ignorar.has(k)) visitar(x);
  };
  visitar(valor);
  return textoPuro(partes.join(' ')).replace(/\s+/g, ' ').trim();
}

export function dadosCliente(c: Conteudo) {
  return {
    fontes: Object.fromEntries(
      [...c.fontes.values()].map((f) => [
        f.id,
        {
          curto: f.curto,
          tipo: TIPOS_FONTE[f.tipo],
          nivel: f.nivel,
          nivelTexto: NIVEIS[f.nivel],
          veiculo: f.veiculo,
          titulo: f.titulo,
          autor: f.autor,
          data: f.data,
          url: f.url,
          urlArquivo: f.urlArquivo,
          trecho: f.trecho,
          trechoConferido: f.trechoConferido,
          selos: f.selos,
          nota: f.nota,
          usadaEm: c.usoDasFontes.get(f.id) ?? [],
        },
      ]),
    ),
    termos: Object.fromEntries([...c.termos.values()].map((t) => [t.id, { termo: t.termo, explicacao: t.explicacao }])),
    busca: [
      ...c.posts.map((p) => ({
        titulo: p.data.titulo,
        resumo: p.data.resumo,
        url: `/p/${p.id}`,
        tipo: 'Post',
        texto: textoParaBusca(p.data.slides),
      })),
      ...c.moedas.map((m) => ({
        titulo: m.data.titulo,
        resumo: m.data.pergunta,
        url: `/duas-faces/${m.id}`,
        tipo: 'Duas faces',
        texto: textoParaBusca([m.data.vermelha, m.data.azul]),
      })),
    ],
  };
}

export function jsonSeguro(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, '\\u003c');
}
