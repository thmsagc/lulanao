/* =========================================================
   "Vire a Moeda": a tela inteira gira em 3D entre as duas faces.
   No computador, as faces ficam lado a lado com divisor arrastável.
   ========================================================= */
import { ativarDeck } from './app';

type Deck = HTMLElement & { irPara?: (i: number, suave?: boolean) => void; camadaAtual?: () => number };
type Lado = 'vermelha' | 'azul';

const palco = document.querySelector<HTMLElement>('.moeda-palco');
const moeda = palco?.querySelector<HTMLElement>('.moeda');

if (palco && moeda) {
  const faces: Record<Lado, Deck> = {
    vermelha: palco.querySelector<Deck>('.face-vermelha')!,
    azul: palco.querySelector<Deck>('.face-azul')!,
  };
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const largo = matchMedia('(min-width: 1000px)');
  const anuncio = document.getElementById('anuncio-face');
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const slug = palco.dataset.moeda!;
  let lado: Lado = new URLSearchParams(location.search).get('face') === 'azul' ? 'azul' : 'vermelha';
  let girando = false;

  const ladoALado = () => palco.classList.contains('lado-a-lado') && largo.matches;

  function aplicar(novo: Lado) {
    lado = novo;
    moeda!.classList.toggle('mostrando-azul', lado === 'azul');
    const outro: Lado = lado === 'azul' ? 'vermelha' : 'azul';
    if (ladoALado()) {
      faces.vermelha.inert = false;
      faces.azul.inert = false;
      faces.vermelha.classList.add('ativo');
      faces.azul.classList.add('ativo');
    } else {
      faces[lado].inert = false;
      faces[outro].inert = true;
      ativarDeck(faces[lado]);
    }
    palco!.dataset.lado = lado;
    if (meta) meta.content = lado === 'azul' ? '#0B2D6B' : '#CC0000';
    if (anuncio) anuncio.textContent = lado === 'azul' ? 'Mostrando a face azul: o que a direita defende.' : 'Mostrando a face vermelha: o que a esquerda defende.';
  }

  function virar() {
    if (girando || ladoALado()) return;
    const de = lado;
    const para: Lado = de === 'vermelha' ? 'azul' : 'vermelha';
    // O leitor cai na mesma camada da outra face: comparação justa.
    const camada = faces[de].camadaAtual?.() ?? 0;
    faces[para].irPara?.(camada, false);

    if (reduzido) {
      const a = moeda!.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], { duration: 360 });
      setTimeout(() => aplicar(para), 180);
      a.onfinish = () => undefined;
      return;
    }
    girando = true;
    faces[para].inert = false;
    moeda!.classList.add('girando');
    const inicio = de === 'vermelha' ? 0 : 180;
    const anim = moeda!.animate(
      [
        { transform: `rotateY(${inicio}deg) scale(1)` },
        { transform: `translateY(-6vh) rotateY(${inicio + 250}deg) scale(0.74)`, offset: 0.5 },
        { transform: `rotateY(${inicio + 540}deg) scale(1)` },
      ],
      { duration: 1050, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'forwards' },
    );
    anim.onfinish = () => {
      aplicar(para);
      anim.cancel();
      moeda!.classList.remove('girando');
      girando = false;
      navigator.vibrate?.(18);
    };
  }

  document.getElementById('botao-virar')?.addEventListener('click', virar);
  palco.querySelectorAll('[data-virar]').forEach((b) => b.addEventListener('click', virar));
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('dialog[open]') || (e.target as HTMLElement).closest('input')) return;
    const deck = faces[lado];
    if (e.key.toLowerCase() === 'v') virar();
    else if (e.key === 'ArrowRight') deck.irPara?.((deck.camadaAtual?.() ?? 0) + 1);
    else if (e.key === 'ArrowLeft') deck.irPara?.((deck.camadaAtual?.() ?? 0) - 1);
  });

  /* Lado a lado (computador) */
  const botaoModo = document.getElementById('botao-modo-moeda');
  function definirLadoALado(ativo: boolean) {
    palco!.classList.toggle('lado-a-lado', ativo);
    if (botaoModo) botaoModo.textContent = ativo ? '↻ Ver como moeda' : '⇆ Ver lado a lado';
    aplicar(lado);
  }
  botaoModo?.addEventListener('click', () => definirLadoALado(!palco.classList.contains('lado-a-lado')));
  largo.addEventListener('change', () => aplicar(lado));

  const borda = palco.querySelector<HTMLElement>('.borda');
  borda?.addEventListener('pointerdown', (e) => {
    if (!ladoALado()) return;
    borda.setPointerCapture(e.pointerId);
    const mover = (ev: PointerEvent) => {
      const r = palco.getBoundingClientRect();
      const pct = Math.min(75, Math.max(25, ((ev.clientX - r.left) / r.width) * 100));
      palco.style.setProperty('--divisao', `${pct}%`);
    };
    const soltar = () => {
      borda.removeEventListener('pointermove', mover);
      borda.removeEventListener('pointerup', soltar);
    };
    borda.addEventListener('pointermove', mover);
    borda.addEventListener('pointerup', soltar);
  });

  /* "E você?": escolha guardada só no aparelho */
  const chave = 'lulanao:sua-moeda';
  const lerEscolhas = (): Record<string, string> => {
    try {
      return JSON.parse(localStorage.getItem(chave) || '{}');
    } catch {
      return {};
    }
  };
  const marcarEscolha = (escolha?: string) => {
    palco.querySelectorAll<HTMLElement>('[data-escolha]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.escolha === escolha)));
    palco.querySelectorAll<HTMLElement>('.voce-obrigado').forEach((p) => (p.hidden = !escolha));
  };
  marcarEscolha(lerEscolhas()[slug]);
  palco.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-escolha]');
    if (!b) return;
    const escolhas = lerEscolhas();
    escolhas[slug] = b.dataset.escolha!;
    try {
      localStorage.setItem(chave, JSON.stringify(escolhas));
    } catch {
      /* sem armazenamento: tudo bem */
    }
    marcarEscolha(b.dataset.escolha);
    navigator.vibrate?.(15);
  });

  definirLadoALado(largo.matches);
}
