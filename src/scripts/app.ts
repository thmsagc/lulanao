/* =========================================================
   lulanao.com.br: comportamento do site (sem dependências)
   Feed em camadas · Orbe e Bússola · fichas de fonte · voz ·
   quiz · verdadeiro ou falso · Kit Zap · leitura em voz alta
   ========================================================= */

type FonteCliente = {
  curto: string;
  tipo: string;
  nivel: 'A' | 'B' | 'C';
  nivelTexto: string;
  veiculo: string;
  titulo: string;
  autor?: string;
  data?: string;
  url?: string;
  urlArquivo?: string;
  trecho: string;
  trechoConferido: boolean;
  selos: string[];
  nota?: string;
  usadaEm: { titulo: string; url: string }[];
};
type Dados = {
  fontes: Record<string, FonteCliente>;
  termos: Record<string, { termo: string; explicacao: string }>;
  busca: { titulo: string; resumo: string; url: string; tipo: string; texto: string }[];
};
type Deck = HTMLElement & { irPara?: (i: number, suave?: boolean) => void; camadaAtual?: () => number };

const painelFontes = document.getElementById('fontes-ao-vivo');
const dados: Dados = JSON.parse(document.getElementById('dados-site')?.textContent || '{}');
const raiz = document.documentElement;
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const guardar = {
  ler(chave: string) {
    try {
      return localStorage.getItem(`lulanao:${chave}`);
    } catch {
      return null;
    }
  },
  gravar(chave: string, valor: string) {
    try {
      localStorage.setItem(`lulanao:${chave}`, valor);
    } catch {
      /* navegação privada: segue sem guardar */
    }
  },
};

const esc = (s = '') => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function aviso(texto: string) {
  const el = document.createElement('div');
  el.className = 'aviso-toast';
  el.setAttribute('role', 'status');
  el.textContent = texto;
  document.body.append(el);
  setTimeout(() => el.remove(), 2600);
}

/* ---------- Folha (painel de baixo) ---------- */

const folha = document.getElementById('folha') as HTMLDialogElement | null;
const corpoFolha = document.getElementById('folha-corpo');
const voltarFolha = document.getElementById('folha-voltar');
const pilhaFolha: string[] = [];

/** Abre a janela por cima. Se já estiver aberta e `empilhar` for true, o "← Voltar" retorna ao conteúdo anterior. */
export function abrirFolha(html: string, empilhar = false) {
  if (!folha || !corpoFolha) return;
  if (empilhar && folha.open) pilhaFolha.push(corpoFolha.innerHTML);
  else pilhaFolha.length = 0;
  corpoFolha.innerHTML = `${html}<button type="button" class="botao continuar" data-fechar>Continuar lendo</button>`;
  if (voltarFolha) voltarFolha.hidden = pilhaFolha.length === 0;
  if (!folha.open) folha.showModal();
  corpoFolha.scrollTop = 0;
}
voltarFolha?.addEventListener('click', () => {
  if (!corpoFolha) return;
  const anterior = pilhaFolha.pop();
  if (anterior !== undefined) corpoFolha.innerHTML = anterior;
  if (voltarFolha) voltarFolha.hidden = pilhaFolha.length === 0;
  corpoFolha.scrollTop = 0;
});
folha?.addEventListener('close', () => {
  pilhaFolha.length = 0;
});

folha?.addEventListener('click', (e) => {
  if (e.target === folha) folha.close();
});
(() => {
  if (!folha || !corpoFolha) return;
  let y0 = 0;
  folha.addEventListener('touchstart', (e) => (y0 = e.touches[0].clientY), { passive: true });
  folha.addEventListener(
    'touchend',
    (e) => {
      if (corpoFolha.scrollTop <= 0 && e.changedTouches[0].clientY - y0 > 90) folha.close();
    },
    { passive: true },
  );
})();

const ROTULO_SELO: Record<string, [string, string]> = {
  oficial: ['Documento oficial', 'verde'],
  'dado-governo': ['Dado do próprio governo', 'verde'],
  judicial: ['Decisão judicial', 'verde'],
  'linhas-diferentes': ['Veículo de outra linha editorial', ''],
  'campo-esquerda': ['Fonte do próprio campo da esquerda', 'vermelho'],
};

function formatarData(d?: string) {
  if (!d) return '';
  const [a, m, dia] = d.split('-');
  return dia ? `${dia}/${m}/${a}` : m ? `${m}/${a}` : a;
}

function fichaFonte(id: string) {
  const f = dados.fontes[id];
  if (!f) return `<p>Fonte não encontrada.</p>`;
  const etiquetas = [
    `<span class="etiqueta nivel-${f.nivel}">Nível ${f.nivel}</span>`,
    `<span class="etiqueta">${esc(f.tipo)}</span>`,
    ...f.selos.map((s) => `<span class="etiqueta ${ROTULO_SELO[s]?.[1] ?? ''}">${esc(ROTULO_SELO[s]?.[0] ?? s)}</span>`),
  ].join('');
  const meta = [f.veiculo, f.autor, formatarData(f.data)].filter(Boolean).map(esc).join(' · ');
  const usada = f.usadaEm.length
    ? `<p class="usada">Usada em: ${f.usadaEm.map((u) => `<a href="${esc(u.url)}">${esc(u.titulo)}</a>`).join(', ')}</p>`
    : '';
  return `
    <div class="etiquetas">${etiquetas}</div>
    <h3>${esc(f.titulo)}</h3>
    <p class="veiculo">${meta}</p>
    <blockquote class="trecho">“${esc(f.trecho)}”</blockquote>
    ${f.trechoConferido ? '' : '<p class="aviso-trecho">⚠ Trecho da apuração preliminar, ainda não conferido palavra por palavra no original.</p>'}
    <div class="links">
      ${f.url ? `<a href="/ir/${id}" target="_blank" rel="noopener">Ver o original <span aria-hidden="true">↗</span></a>` : '<span class="links indisponivel" style="padding:10px 14px;border:1px dashed #d6cdbb;border-radius:12px">Livro impresso: veja a referência</span>'}
      ${f.urlArquivo ? `<a href="${esc(f.urlArquivo)}" target="_blank" rel="noopener">Ver a cópia arquivada <span aria-hidden="true">↗</span></a>` : f.url ? '<span class="indisponivel" style="padding:10px 14px;border:1px dashed #d6cdbb;border-radius:12px">Cópia arquivada: pendente</span>' : ''}
      <button type="button" data-copiar-ref="${id}">Copiar referência <span aria-hidden="true">⧉</span></button>
      <a href="/fontes#${id}">Ver na Biblioteca de Fontes <span aria-hidden="true">→</span></a>
    </div>
    <p class="nota">${esc(f.nivelTexto)}</p>
    ${f.nota ? `<p class="nota"><strong>Nota editorial:</strong> ${esc(f.nota)}</p>` : ''}
    ${usada}`;
}

function fichaTermo(id: string) {
  const t = dados.termos[id];
  if (!t) return '<p>Termo não encontrado.</p>';
  return `
    <div class="etiquetas"><span class="etiqueta">Glossário</span></div>
    <h3>${esc(t.termo)}</h3>
    <p style="font-size:1.12rem">${esc(t.explicacao)}</p>`;
}

function referencia(id: string) {
  const f = dados.fontes[id];
  const hoje = new Date().toLocaleDateString('pt-BR');
  return `${f.veiculo}. ${f.titulo}.${f.data ? ` ${formatarData(f.data)}.` : ''}${f.url ? ` Disponível em: ${f.url}. Acesso em: ${hoje}.` : ''}`;
}

/* ---------- Leitura em voz alta ---------- */

let botaoLendo: HTMLElement | null = null;
function pararLeitura() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  botaoLendo?.setAttribute('aria-pressed', 'false');
  botaoLendo = null;
}
function lerEmVozAlta(botao: HTMLElement) {
  if (!('speechSynthesis' in window)) return aviso('Seu navegador não tem leitura em voz alta.');
  if (botaoLendo === botao) return pararLeitura();
  pararLeitura();
  const deck = botao.closest<Deck>('[data-deck]');
  const conteudo = deck?.querySelector('.camada.ativa .conteudo');
  if (!conteudo) return;
  const copia = conteudo.cloneNode(true) as HTMLElement;
  copia.querySelectorAll('[data-nao-ler], .selo, .rotulo, .quem-fala').forEach((el) => el.remove());
  const texto = (copia.textContent || '').replace(/\s+/g, ' ').trim();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  fala.rate = 0.98;
  const voz = speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith('pt-br'));
  if (voz) fala.voice = voz;
  fala.onend = () => pararLeitura();
  botao.setAttribute('aria-pressed', 'true');
  botaoLendo = botao;
  speechSynthesis.speak(fala);
}

/* ---------- Decks (posts e faces da moeda) ---------- */

function animarContagens(camada: Element | null) {
  camada?.querySelectorAll<HTMLElement>('[data-contar]:not([data-contado])').forEach((el) => {
    el.dataset.contado = '1';
    if (reduzido) return;
    const alvo = Number(el.dataset.valor);
    const casas = Number(el.dataset.decimais || 0);
    const inicio = performance.now();
    const duracao = 1300;
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / duracao);
      const v = alvo * (1 - Math.pow(1 - t, 3));
      el.textContent = v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  });
}

function animarAntesAgora(camada: Element | null) {
  camada?.querySelectorAll<HTMLElement>('[data-aa]:not([data-animado])').forEach((aa) => {
    aa.dataset.animado = '1';
    const faixa = aa.querySelector<HTMLInputElement>('input[type=range]');
    if (!faixa || reduzido) return;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio - 500) / 1400);
      if (t > 0) {
        faixa.value = String(Math.round(100 * (1 - Math.pow(1 - t, 3))));
        atualizarAntesAgora(aa, faixa);
      }
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  });
}

function atualizarAntesAgora(aa: HTMLElement, faixa: HTMLInputElement) {
  const t = Number(faixa.value) / 100;
  const antes = Number(aa.dataset.antes);
  const agora = Number(aa.dataset.agora);
  const v = antes + (agora - antes) * t;
  aa.querySelector<HTMLElement>('.aa-coluna i')?.style.setProperty('--v', String(v));
  const num = aa.querySelector('[data-aa-num]');
  if (num) num.textContent = Math.round(v).toLocaleString('pt-BR');
  const fim = t >= 0.5;
  const ano = aa.querySelector('[data-aa-ano]');
  if (ano) ano.textContent = (fim ? aa.dataset.rotuloAgora : aa.dataset.rotuloAntes) || '';
  const texto = aa.querySelector('[data-aa-texto]');
  if (texto) texto.textContent = (fim ? aa.dataset.textoAgora : aa.dataset.textoAntes) || '';
}

function aoMudarCamada(deck: Deck, camada: HTMLElement) {
  const face = camada?.dataset.face;
  if (face && !deck.classList.contains(`t-${face}`) && !deck.classList.contains('face')) {
    deck.classList.remove('t-neutra', 't-vermelha', 't-azul');
    deck.classList.add(`t-${face}`);
  }
  if (!deck.classList.contains('ativo')) return;
  animarContagens(camada);
  animarAntesAgora(camada);
  atualizarFontesAoVivo(camada);
}

export function iniciarDeck(deck: Deck) {
  const faixa = deck.querySelector<HTMLElement>('[data-camadas]');
  if (!faixa) return;
  const camadas = [...faixa.children] as HTMLElement[];
  const trilho = [...deck.querySelectorAll<HTMLElement>('.trilho [data-ir-camada]')];
  let atual = -1;
  const marcar = (i: number) => {
    i = Math.max(0, Math.min(camadas.length - 1, i));
    if (i === atual) return;
    atual = i;
    camadas.forEach((c, j) => c.classList.toggle('ativa', j === i));
    trilho.forEach((b, j) => {
      b.classList.toggle('feito', j <= i);
      if (j === i) b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
    });
    if (botaoLendo && deck.contains(botaoLendo)) pararLeitura();
    aoMudarCamada(deck, camadas[i]);
  };
  let quadro = 0;
  faixa.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => marcar(Math.round(faixa.scrollLeft / faixa.clientWidth)));
    },
    { passive: true },
  );
  deck.irPara = (i: number, suave = true) => {
    i = Math.max(0, Math.min(camadas.length - 1, i));
    faixa.scrollTo({ left: i * faixa.clientWidth, behavior: suave && !reduzido ? 'smooth' : 'auto' });
    if (!suave) marcar(i);
  };
  deck.camadaAtual = () => atual;
  marcar(0);
}

export function ativarDeck(deck: Deck) {
  document.querySelectorAll('[data-deck].ativo').forEach((d) => d !== deck && d.classList.remove('ativo'));
  deck.classList.add('ativo');
  aoMudarCamada(deck, deck.querySelector('.camada.ativa') as HTMLElement);
  document.dispatchEvent(new CustomEvent('deck-ativo', { detail: deck }));
}

const decks = [...document.querySelectorAll<Deck>('[data-deck]')];
decks.forEach(iniciarDeck);

/* ---------- Mesa de Investigação (computador): fontes ao vivo ---------- */

function atualizarFontesAoVivo(camada: HTMLElement | null) {
  if (!painelFontes || !camada) return;
  const ids = (camada.dataset.fontes || '').split(',').filter(Boolean);
  painelFontes.innerHTML = ids.length
    ? ids
        .map((id) => {
          const f = dados.fontes[id];
          if (!f) return '';
          return `<article><b>${esc(f.curto)} · nível ${f.nivel}</b>${esc(f.titulo)}<br><button type="button" data-fonte="${id}">Ver a ficha completa</button></article>`;
        })
        .join('')
    : '<p class="vazio">Esta tela não cita fontes. Siga para a próxima camada.</p>';
}

/* ---------- Feed ---------- */

const feed = document.querySelector<HTMLElement>('.feed');
const botaoMoeda = document.getElementById('botao-moeda') as HTMLAnchorElement | null;

function deckAtivo(): Deck | undefined {
  return (document.querySelector<Deck>('[data-deck].ativo') ?? decks[0]) || undefined;
}
function irParaDeck(delta: number) {
  if (!feed) return;
  const i = decks.indexOf(deckAtivo()!);
  const alvo = decks[i + delta];
  if (alvo) feed.scrollTo({ top: alvo.offsetTop, behavior: reduzido ? 'auto' : 'smooth' });
}

if (feed) {
  const inicio = feed.dataset.inicio;
  const alvo = inicio ? document.getElementById(`p-${inicio}`) : null;
  if (alvo) feed.scrollTop = alvo.offsetTop;

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) if (e.isIntersecting) ativarDeck(e.target as Deck);
    },
    { root: feed, threshold: 0.6 },
  );
  decks.forEach((d) => observador.observe(d));

  document.addEventListener('deck-ativo', (e) => {
    const deck = (e as CustomEvent<Deck>).detail;
    const slug = deck.dataset.slug;
    const caminho = slug ? `/p/${slug}` : feed.dataset.raiz || '/';
    if (location.pathname !== caminho) history.replaceState(null, '', caminho);
    if (slug) guardar.gravar('continuar', slug);
    if (botaoMoeda) {
      const moeda = deck.dataset.moeda;
      botaoMoeda.hidden = !moeda;
      if (moeda) botaoMoeda.href = `/duas-faces/${moeda}`;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (document.querySelector('dialog[open]') || (e.target as HTMLElement).closest('input, textarea')) return;
    const deck = deckAtivo();
    if (!deck) return;
    if (['ArrowDown', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      irParaDeck(1);
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      irParaDeck(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      deck.irPara?.((deck.camadaAtual?.() ?? 0) + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      deck.irPara?.((deck.camadaAtual?.() ?? 0) - 1);
    } else if (e.key.toLowerCase() === 'v' && deck.dataset.moeda) {
      location.href = `/duas-faces/${deck.dataset.moeda}`;
    }
  });
} else if (decks.length === 0) {
  // Páginas comuns: nada a ativar.
}

/* ---------- Orbe e Bússola ---------- */

const orbe = document.getElementById('orbe');
const bussola = document.getElementById('bussola') as HTMLDialogElement | null;
const campoBusca = document.getElementById('campo-busca') as HTMLInputElement | null;
const resultados = document.getElementById('resultados');
const statusVoz = document.getElementById('status-voz');
const botaoVoz = document.getElementById('botao-voz');

if (orbe && !guardar.ler('usou-orbe')) orbe.classList.add('respira');

function abrirBussola() {
  if (!bussola) return;
  pararLeitura();
  const cont = document.getElementById('continuar') as HTMLAnchorElement | null;
  const slug = guardar.ler('continuar');
  if (cont && slug && !location.pathname.endsWith(`/p/${slug}`)) {
    cont.href = `/p/${slug}`;
    cont.hidden = false;
  }
  bussola.showModal();
  orbe?.classList.remove('respira');
  guardar.gravar('usou-orbe', '1');
}

(() => {
  if (!orbe) return;
  let timer = 0;
  let longo = false;
  orbe.addEventListener('pointerdown', () => {
    longo = false;
    timer = window.setTimeout(() => {
      longo = true;
      abrirBussola();
      iniciarVoz();
    }, 550);
  });
  const cancelar = () => clearTimeout(timer);
  orbe.addEventListener('pointerup', cancelar);
  orbe.addEventListener('pointerleave', cancelar);
  orbe.addEventListener('contextmenu', (e) => e.preventDefault());
  orbe.addEventListener('click', (e) => {
    if (longo) {
      e.preventDefault();
      return;
    }
    abrirBussola();
  });
})();

bussola?.addEventListener('click', (e) => {
  if (e.target === bussola) bussola.close();
});

function buscar(termo: string) {
  if (!resultados) return;
  const palavras = normalizar(termo).split(/\s+/).filter((p) => p.length > 1);
  if (!palavras.length) {
    resultados.innerHTML = '';
    return;
  }
  const achados = dados.busca
    .map((item) => {
      const titulo = normalizar(item.titulo);
      const tudo = normalizar(`${item.titulo} ${item.resumo} ${item.texto}`);
      if (!palavras.every((p) => tudo.includes(p))) return null;
      const pontos = palavras.reduce((s, p) => s + (titulo.includes(p) ? 3 : 1), 0);
      return { item, pontos };
    })
    .filter(Boolean)
    .sort((a, b) => b!.pontos - a!.pontos)
    .slice(0, 6) as { item: Dados['busca'][number] }[];
  resultados.innerHTML = achados.length
    ? achados.map(({ item }) => `<a href="${item.url}"><small>${esc(item.tipo)}</small><strong>${esc(item.titulo)}</strong><p>${esc(item.resumo)}</p></a>`).join('')
    : `<p class="status-voz">Ainda não temos nada sobre "${esc(termo)}". Este tema pode estar em preparação.</p>`;
}
campoBusca?.addEventListener('input', () => buscar(campoBusca.value));

type Reconhecedor = {
  lang: string;
  interimResults: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
};
function iniciarVoz() {
  const R = (window as unknown as { SpeechRecognition?: new () => Reconhecedor; webkitSpeechRecognition?: new () => Reconhecedor }).SpeechRecognition ??
    (window as unknown as { webkitSpeechRecognition?: new () => Reconhecedor }).webkitSpeechRecognition;
  if (!R || !statusVoz) {
    if (statusVoz) statusVoz.textContent = 'A busca por voz não funciona neste navegador. Digite o que procura.';
    campoBusca?.focus();
    return;
  }
  const rec = new R();
  rec.lang = 'pt-BR';
  rec.interimResults = true;
  botaoVoz?.classList.add('ouvindo');
  statusVoz.textContent = 'Estou ouvindo… fale o que você quer saber.';
  rec.onresult = (e) => {
    const texto = Array.from(e.results)
      .map((r) => r[0].transcript)
      .join(' ');
    if (campoBusca) campoBusca.value = texto;
    buscar(texto);
  };
  rec.onend = () => {
    botaoVoz?.classList.remove('ouvindo');
    statusVoz.textContent = '';
  };
  rec.onerror = () => {
    statusVoz.textContent = 'Não consegui ouvir. Tente de novo ou digite.';
  };
  rec.start();
}
botaoVoz?.addEventListener('click', iniciarVoz);

/* ---------- Kit Zap: imagem pronta para o WhatsApp ---------- */

function quebrarLinhas(ctx: CanvasRenderingContext2D, texto: string, largura: number) {
  const palavras = texto.split(' ');
  const linhas: string[] = [];
  let linha = '';
  for (const p of palavras) {
    const teste = linha ? `${linha} ${p}` : p;
    if (ctx.measureText(teste).width > largura && linha) {
      linhas.push(linha);
      linha = p;
    } else linha = teste;
  }
  if (linha) linhas.push(linha);
  return linhas;
}

async function gerarImagem(kit: HTMLElement): Promise<Blob | null> {
  const { frase = '', kitFonte: fonte = '', url = '', face = 'neutra', kicker = '' } = kit.dataset;
  const L = 1080;
  const A = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = L;
  canvas.height = A;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const titulo = face === 'vermelha' ? '"Oswald Variable"' : face === 'azul' ? '"Fraunces Variable"' : '"Archivo Variable"';
  await Promise.all([
    document.fonts.load(`700 80px ${titulo}`),
    document.fonts.load('900 60px "Archivo Variable"'),
    document.fonts.load('600 30px "JetBrains Mono Variable"'),
  ]).catch(() => undefined);

  const cores = {
    neutra: { bg: '#F3EFE6', fg: '#14171C', acento: '#FFC72C', sec: '#474C55' },
    vermelha: { bg: '#CC0000', fg: '#FFF1DC', acento: '#FFD700', sec: '#FFD7BD' },
    azul: { bg: '#0B2D6B', fg: '#F7F3EA', acento: '#C9A227', sec: '#C9D3E6' },
  }[face as 'neutra' | 'vermelha' | 'azul'];

  ctx.fillStyle = cores.bg;
  ctx.fillRect(0, 0, L, A);
  if (face === 'vermelha') {
    ctx.save();
    ctx.translate(L / 2, A * 0.72);
    ctx.rotate((-14 * Math.PI) / 180);
    ctx.fillStyle = '#1A0505';
    ctx.fillRect(-L, -110, L * 2, 220);
    ctx.restore();
  }
  ctx.fillStyle = cores.acento;
  ctx.fillRect(0, 0, L, 18);

  ctx.fillStyle = cores.sec;
  ctx.font = '600 30px "JetBrains Mono Variable", monospace';
  ctx.fillText(kicker.toUpperCase(), 80, 120);

  ctx.fillStyle = cores.fg;
  let tamanho = 96;
  let linhas: string[] = [];
  const pesoTitulo = face === 'azul' ? 600 : face === 'vermelha' ? 700 : 900;
  const fraseFinal = face === 'vermelha' ? frase.toUpperCase() : frase;
  do {
    ctx.font = `${pesoTitulo} ${tamanho}px ${titulo}, sans-serif`;
    linhas = quebrarLinhas(ctx, fraseFinal, L - 160);
    tamanho -= 4;
  } while (linhas.length * tamanho * 1.12 > 760 && tamanho > 44);
  const altura = tamanho * 1.12;
  linhas.forEach((l, i) => ctx.fillText(l, 80, 220 + altura * (i + 1)));

  const yFonte = Math.min(1080, 240 + altura * (linhas.length + 1) + 30);
  ctx.fillStyle = cores.acento;
  ctx.fillRect(80, yFonte - 44, 120, 8);
  ctx.fillStyle = cores.fg;
  ctx.font = '600 32px "JetBrains Mono Variable", monospace';
  quebrarLinhas(ctx, `Fonte: ${fonte}`, L - 160).forEach((l, i) => ctx.fillText(l, 80, yFonte + i * 42));

  ctx.fillStyle = face === 'neutra' ? '#14171C' : 'rgba(0,0,0,.28)';
  ctx.fillRect(0, A - 170, L, 170);
  ctx.fillStyle = face === 'neutra' ? '#F3EFE6' : cores.fg;
  ctx.font = '900 54px "Archivo Variable", sans-serif';
  ctx.fillText('LULA NÃO', 80, A - 92);
  ctx.font = '600 28px "JetBrains Mono Variable", monospace';
  ctx.fillText('A verdade dura. Com fonte.', 80, A - 48);
  ctx.textAlign = 'right';
  ctx.fillStyle = cores.acento;
  ctx.fillText(url.replace(/^https?:\/\//, ''), L - 80, A - 92);

  return new Promise((ok) => canvas.toBlob((b) => ok(b), 'image/png'));
}

async function baixarImagem(kit: HTMLElement) {
  const blob = await gerarImagem(kit);
  if (!blob) return aviso('Não foi possível gerar a imagem.');
  const nome = `lulanao-${(kit.dataset.url || '').split('/').pop() || 'post'}.png`;
  const arquivo = new File([blob], nome, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
  if (nav.canShare?.({ files: [arquivo] })) {
    try {
      await navigator.share({ files: [arquivo], text: `${kit.dataset.frase}\nFonte: ${kit.dataset.kitFonte}\n${kit.dataset.url}` });
      return;
    } catch {
      /* cancelado: cai para o download */
    }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  aviso('Imagem salva. A fonte já vai impressa nela.');
}

async function compartilhar(kit: HTMLElement) {
  const texto = `${kit.dataset.frase}\n\nFonte: ${kit.dataset.kitFonte}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Lula Não', text: texto, url: kit.dataset.url });
      return;
    } catch {
      return;
    }
  }
  await navigator.clipboard?.writeText(`${texto}\n${kit.dataset.url}`);
  aviso('Texto copiado, com a fonte e o link.');
}

/* ---------- Cliques (delegação) ---------- */

document.addEventListener('click', async (e) => {
  const alvo = e.target as HTMLElement;

  const dentroDaFolha = !!alvo.closest('#folha');
  const fonte = alvo.closest<HTMLElement>('[data-fonte]');
  if (fonte) {
    abrirFolha(fichaFonte(fonte.dataset.fonte!), dentroDaFolha);
    return;
  }
  const termo = alvo.closest<HTMLElement>('[data-termo]');
  if (termo) {
    abrirFolha(fichaTermo(termo.dataset.termo!), dentroDaFolha);
    return;
  }
  const tpl = alvo.closest<HTMLElement>('[data-folha-tpl]');
  if (tpl) {
    const t = document.getElementById(tpl.dataset.folhaTpl!) as HTMLTemplateElement | null;
    if (t) abrirFolha(t.innerHTML);
    return;
  }
  if (alvo.closest('[data-fechar]')) {
    alvo.closest('dialog')?.close();
    return;
  }
  const copiar = alvo.closest<HTMLElement>('[data-copiar-ref]');
  if (copiar) {
    await navigator.clipboard?.writeText(referencia(copiar.dataset.copiarRef!));
    aviso('Referência copiada.');
    return;
  }

  const ir = alvo.closest<HTMLElement>('[data-ir]');
  if (ir) {
    const deck = ir.closest<Deck>('[data-deck]');
    if (ir.dataset.ir === 'proximo-deck') irParaDeck(1);
    else if (deck && ir.dataset.ir === 'proxima') deck.irPara?.((deck.camadaAtual?.() ?? 0) + 1);
    return;
  }
  const irCamada = alvo.closest<HTMLElement>('[data-ir-camada]');
  if (irCamada) {
    irCamada.closest<Deck>('[data-deck]')?.irPara?.(Number(irCamada.dataset.irCamada));
    return;
  }
  const ouvir = alvo.closest<HTMLElement>('[data-ouvir]');
  if (ouvir) {
    lerEmVozAlta(ouvir);
    return;
  }

  const kitImagem = alvo.closest<HTMLElement>('[data-kit-imagem]');
  if (kitImagem) {
    const kit = kitImagem.closest<HTMLElement>('[data-kit]');
    if (kit) await baixarImagem(kit);
    return;
  }
  const kitComp = alvo.closest<HTMLElement>('[data-kit-compartilhar]');
  if (kitComp) {
    const kit = kitComp.closest<HTMLElement>('[data-kit]');
    if (kit) await compartilhar(kit);
  }
});

document.addEventListener('input', (e) => {
  const faixa = e.target as HTMLInputElement;
  const aa = faixa.closest<HTMLElement>('[data-aa]');
  if (aa && faixa.type === 'range') atualizarAntesAgora(aa, faixa);
});

window.addEventListener('pagehide', pararLeitura);
