/**
 * Configuração geral do site.
 * `simboloComunista`: 'ancorado' (recomendado) | 'sempre' | 'desligado'.
 * Para pré-visualizar outro modo sem mudar o código: ?simbolo=sempre
 */
export type ModoSimbolo = 'ancorado' | 'sempre' | 'desligado';

export const SITE = {
  nome: 'Lula Não',
  dominio: 'lulanao.com.br',
  url: 'https://lulanao.com.br',
  lema: 'Contra fatos, não há narrativa.',
  simboloComunista: 'ancorado' as ModoSimbolo,
  /** 'prototipo' avisa sobre pendências; 'producao' impede o build se houver pendências. */
  modo: (process.env.LULANAO_MODO === 'producao' ? 'producao' : 'prototipo') as 'prototipo' | 'producao',
  /** Fica false até definir o expediente e concluir a revisão jurídica. */
  indexavel: false,
  expediente: {
    responsavel: '', // definir antes de publicar (vedação do anonimato)
    contato: 'contato@lulanao.com.br',
    correcoes: 'correcoes@lulanao.com.br',
  },
};
