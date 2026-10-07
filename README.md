# lulanao.com.br

> **A verdade dura. Com fonte.**

Site **de direita**, interativo, mobile-first e 100% estático que mostra, com fontes verificáveis e linguagem acessível, o que Lula, o PT e seu entorno defendem e fizeram, e tudo aquilo em que foram investigados, com o status jurídico exato de cada caso. E mostra **a outra face da moeda**: os valores da direita, tema por tema. 🔴 Vermelho = esquerda · 🔵 Azul = direita · ⚪ Papel = fatos.

## Status: protótipo com 1 tema completo

**Tema implementado:** 🎓 *Escola em Ruínas*, com 6 posts em camadas, a moeda **"Disciplina e excelência"**, linha do tempo, Biblioteca de Fontes (44 fontes) e todos os recursos de navegação.

| Recurso | Onde ver |
|---|---|
| Feed em Camadas (↑↓ assunto, ←→ profundidade) | `/` e `/e/escola` |
| Selo de fonte → ficha com trecho, nível e link | qualquer selo `[Fonte ✓]` |
| Recibo de fontes (6ª camada de cada post) | fim de cada post |
| Vire a Moeda (giro 3D) + Placar dos Fatos | `/duas-faces/disciplina-excelencia` |
| Lado a Lado com divisor arrastável | mesma página, em tela larga |
| Selo ☭ ancorado em fato | botão ☭ na face vermelha (`?simbolo=sempre` ou `desligado` para pré-visualizar) |
| Orbe + Bússola (busca por texto e voz) | botão dourado; toque longo = voz |
| Kit Zap (imagem 1080×1350 com a fonte impressa) | camada "Pense nisso" |
| Ouvir (leitura em voz alta) | botão 🔊 em cada post |
| Modo simples / completo | 2ª tela do "Comece aqui" ou na Bússola |
| Quiz, Verdadeiro ou Falso, Antes × Agora | posts do tema |
| Mesa de Investigação (fontes ao vivo) | computador, tela ≥ 1100 px |
| Linha do tempo, Sua Moeda, Sobre, Correções | pela Bússola |

**Pendências antes de publicar** (o build em modo produção bloqueia até resolver):

- conferir no original o trecho literal de cada fonte (`trechoConferido: true`);
- gerar as cópias arquivadas (Wayback Machine) de cada link (`urlArquivo`);
- trocar as fontes de nível C por fontes A/B;
- fazer a revisão editorial de cada post (`revisao.editorial: true`);
- definir o responsável no expediente (`src/config.ts`), por causa da vedação do anonimato;
- quando tudo estiver pronto, liberar a indexação (`indexavel: true`, `public/robots.txt` e `public/_headers`).

## Como rodar

```bash
npm install
npm run dev              # http://localhost:4321
npm run build            # gera dist/ (modo protótipo: avisa as pendências)
npm run build:producao   # falha se houver qualquer pendência editorial
```

## Como publicar na Cloudflare (gratuito)

1. Cloudflare → *Workers & Pages* → *Create* → *Import a repository* → `thmsagc/lulanao`.
2. Build command: `npm run build` · Output: `dist` (o `wrangler.jsonc` já está configurado).
3. *Custom domains* → `lulanao.com.br` (os nameservers do Registro.br devem apontar para a Cloudflare; veja o [planejamento](docs/01-planejamento.md#11-publicação-gratuita-na-cloudflare-passo-a-passo)).

Cada `git push` publica de novo. Outros branches geram endereços de pré-visualização.

## Como escrever conteúdo

Todo o conteúdo fica em arquivos YAML, sem código:

| Pasta / arquivo | O que é |
|---|---|
| `src/content/posts/*.yaml` | Um assunto = um post com 5 camadas: `capa`, `entenda`, `prova`, `outroLado`, `penseNisso` |
| `src/content/moedas/*.yaml` | Uma moeda = face `vermelha` + face `azul` + `placar` |
| `src/data/fontes.yaml` | Biblioteca de fontes (id, nível A/B/C, trecho, links) |
| `src/data/linha-do-tempo.yaml` | Eventos com ano, quem decidiu e fontes |
| `src/data/glossario.yaml` | Termos explicados em linguagem simples |
| `src/data/eixos.yaml` | Os 11 temas |

**Marcações no texto:** `[[id-da-fonte]]` vira selo de fonte · `((termo))` abre o glossário · `**negrito**` · `==marca-texto==`.

**Sem fonte, não compila:** o build falha se uma afirmação factual não tiver fonte, se uma fonte citada não existir ou se um termo não estiver no glossário.

**Blocos disponíveis:** `texto`, `lista`, `destaque`, `barras`, `citacao`, `linha`, `vf` (verdadeiro ou falso), `antesAgora`. Cada bloco aceita `face: vermelha | azul` para mostrar quem fala e `detalhe: true` para aparecer só no modo completo.

## Tecnologia

Astro 7 (site estático) · TypeScript sem bibliotecas no navegador (cerca de 8 KB de JavaScript comprimido) · CSS moderno com *scroll-snap*, transformações 3D e fontes variáveis · Cloudflare Workers (arquivos estáticos). Sem banco de dados, sem cookies e sem coleta de dados pessoais.

## Documentação

| Documento | Conteúdo |
|---|---|
| [Planejamento completo](docs/01-planejamento.md) | Conceito, navegação, formatos, fontes, identidade visual, IA, stack, Cloudflare, cronograma, riscos |
| [Protocolo editorial](docs/02-protocolo-editorial.md) | Regras de verdade, fontes, vocabulário jurídico, linguagem, regras eleitorais e das duas faces |
| [Pautas](docs/03-pautas.md) | Backlog de conteúdo por eixo, com status de verificação |
| [Duas faces da moeda](docs/04-duas-faces.md) | Valores da direita por tema, com fundamentos, evidências e limites; roteiro da face vermelha |
| [Educação: disciplina e excelência](docs/05-educacao-disciplina.md) | Pesquisa que embasa o tema implementado |
