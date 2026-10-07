import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* ---------- Peças comuns ---------- */

const fontes = z.array(z.string().min(1)).default([]);
const fontesObrigatorias = z.array(z.string().min(1)).min(1, 'Sem fonte, não compila: informe ao menos uma fonte.');

/** Quem está falando: define a cor (vermelho = esquerda, azul = direita, papel = fato). */
const face = z.enum(['neutra', 'vermelha', 'azul']);

/** Rótulo de cada afirmação (protocolo editorial, item 3). */
/** 'posicao' = a voz do site ("Nossa posição"): opinião assumida, sempre marcada como tal. */
const rotulo = z.enum(['fato', 'dado', 'declaracao', 'contexto', 'opiniao', 'valor', 'posicao', 'pergunta']);

const bloco = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('texto'),
    texto: z.string(),
    rotulo: rotulo.default('fato'),
    face: face.optional(),
    fontes,
  }),
  z.object({
    tipo: z.literal('destaque'),
    numero: z.string(),
    texto: z.string(),
    face: face.optional(),
    fontes: fontesObrigatorias,
  }),
  z.object({
    tipo: z.literal('barras'),
    titulo: z.string(),
    unidade: z.string().default('%'),
    itens: z.array(z.object({ rotulo: z.string(), valor: z.number(), destaque: z.boolean().default(false) })).min(2),
    fontes: fontesObrigatorias,
  }),
  z.object({
    tipo: z.literal('citacao'),
    texto: z.string(),
    autor: z.string(),
    contexto: z.string().optional(),
    face: face.default('neutra'),
    fontes: fontesObrigatorias,
  }),
  z.object({
    tipo: z.literal('linha'),
    titulo: z.string().optional(),
    itens: z
      .array(
        z.object({
          ano: z.string(),
          texto: z.string(),
          quem: z.string().optional(),
          face: face.default('neutra'),
          fontes: fontesObrigatorias,
        }),
      )
      .min(1),
  }),
  z.object({
    tipo: z.literal('lista'),
    titulo: z.string().optional(),
    itens: z.array(z.string()).min(1),
    rotulo: rotulo.default('fato'),
    face: face.optional(),
    fontes,
  }),
  z.object({
    tipo: z.literal('antesAgora'),
    titulo: z.string(),
    unidade: z.string().default('%'),
    antes: z.object({ rotulo: z.string(), valor: z.number(), texto: z.string() }),
    agora: z.object({ rotulo: z.string(), valor: z.number(), texto: z.string() }),
    fontes: fontesObrigatorias,
  }),
]);

export type Bloco = z.infer<typeof bloco>;

const numero = z.object({
  valor: z.number(),
  decimais: z.number().int().default(0),
  prefixo: z.string().default(''),
  sufixo: z.string().default(''),
});

/**
 * Slide no formato de post de Instagram: frase grande + contexto curto.
 * O detalhe fica no botão "Quero entender melhor" (janela por cima, sem sair da página).
 * tipo define a cor e o rótulo: problema/consequencia = fato (papel),
 * esquerda = vermelho, direita/fecho = azul (a voz do site).
 */
const slide = z.object({
  tipo: z.enum(['problema', 'esquerda', 'consequencia', 'direita', 'fecho']),
  face: face.optional(),
  rotulo: z.string().optional(),
  numero: numero.optional(),
  frase: z.string().max(130, 'Frase grande demais: no máximo 130 caracteres.'),
  autor: z.string().optional(), // se houver, a frase é uma citação literal desta pessoa
  contexto: z.string().max(260, 'Contexto longo demais: no máximo 260 caracteres.').optional(),
  fontes,
  mais: z.object({ titulo: z.string().optional(), blocos: z.array(bloco).min(1) }).optional(),
});
export type Slide = z.infer<typeof slide>;

/* ---------- Coleções ---------- */

const fontesColecao = defineCollection({
  loader: file('src/data/fontes.yaml'),
  schema: z.object({
    curto: z.string().max(28),
    tipo: z.enum([
      'lei',
      'decisao-judicial',
      'documento-oficial',
      'dado-oficial',
      'reportagem',
      'declaracao-oficial',
      'artigo-academico',
      'livro',
      'checagem',
      'enciclopedia',
    ]),
    nivel: z.enum(['A', 'B', 'C']),
    veiculo: z.string(),
    titulo: z.string(),
    autor: z.string().optional(),
    data: z.string().optional(),
    url: z.string().url().optional(),
    urlArquivo: z.string().url().optional(),
    trecho: z.string(),
    trechoConferido: z.boolean().default(false),
    selos: z.array(z.enum(['oficial', 'judicial', 'dado-governo', 'linhas-diferentes', 'campo-esquerda'])).default([]),
    nota: z.string().optional(),
    acessadoEm: z.string(),
  }),
});

const glossario = defineCollection({
  loader: file('src/data/glossario.yaml'),
  schema: z.object({ termo: z.string(), explicacao: z.string() }),
});

const eixos = defineCollection({
  loader: file('src/data/eixos.yaml'),
  schema: z.object({
    nome: z.string(),
    icone: z.string(),
    pergunta: z.string(),
    ordem: z.number(),
  }),
});

const linhaDoTempo = defineCollection({
  loader: file('src/data/linha-do-tempo.yaml'),
  schema: z.object({
    ano: z.number(),
    eixo: z.string(),
    texto: z.string(),
    quem: z.string(),
    face: face.default('neutra'),
    fontes: fontesObrigatorias,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/posts' }),
  schema: z.object({
    titulo: z.string(),
    eixo: z.string(),
    ordem: z.number(),
    resumo: z.string(),
    moeda: z.string().optional(),
    kit: z.object({ frase: z.string().max(150), fonte: z.string(), face: face.default('neutra') }),
    slides: z.array(slide).min(3).max(7),
    risco: z.enum(['baixo', 'medio', 'alto']).default('baixo'),
    revisao: z.object({ editorial: z.boolean().default(false), juridica: z.boolean().default(false) }).default({ editorial: false, juridica: false }),
    atualizadoEm: z.coerce.date(),
  }),
});

const faceMoeda = z.object({
  rotulo: z.string(),
  selo: z.object({ texto: z.string(), fontes: fontesObrigatorias }).optional(),
  slides: z.array(slide).min(2).max(5),
});

const moedas = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/moedas' }),
  schema: z.object({
    titulo: z.string(),
    eixo: z.string(),
    pergunta: z.string(),
    vermelha: faceMoeda,
    azul: faceMoeda,
    placar: z.array(z.object({ numero: z.string(), texto: z.string(), fontes: fontesObrigatorias })).min(1),
    atualizadoEm: z.coerce.date(),
  }),
});

export const collections = {
  fontes: fontesColecao,
  glossario,
  eixos,
  linhaDoTempo,
  posts,
  moedas,
};
