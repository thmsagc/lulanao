# lulanao.com.br

> **A verdade dura. Com fonte.**

Site **de direita**, interativo, mobile-first e 100% estático que mostra, com fontes verificáveis e linguagem acessível, o que Lula, o PT e seu entorno defendem e fizeram, e tudo aquilo em que foram investigados, com o status jurídico exato de cada caso. E mostra **a outra face da moeda**: os valores da direita, tema por tema. 🔴 Vermelho = esquerda · 🔵 Azul = direita · ⚪ Papel = fatos.

## Status: protótipo com 1 tema completo

**Tema implementado:** 🎓 *Escola em Ruínas*, com foco em **conduta**: o professor agredido, o fim da Moral e Cívica, a bagunça na sala de aula. São 8 posts em slides, a moeda **"Disciplina e respeito"**, linha do tempo, Biblioteca de Fontes (53 fontes) e todos os recursos de navegação.

**Formato:** cada post é uma sequência de slides, como um post de Instagram. Cada slide tem uma **frase grande e dura**, um **contexto curto em letra grande** e o botão **"Quero entender melhor"**, que abre o detalhe numa janela por cima, sem sair da página. A sequência típica é: o problema → o que a esquerda fez → a consequência → a visão da direita → nossa posição.

| Recurso | Onde ver |
|---|---|
| Feed de slides (↑ próximo assunto, ← → slides do mesmo assunto) | `/` e `/e/escola` |
| "Quero entender melhor" (janela que fecha com ✕, "Continuar lendo" ou arrastando) | botão em cada slide |
| Selo de fonte → ficha com trecho, nível e link (com ← Voltar dentro da janela) | qualquer selo de fonte |
| Recibo de fontes | "Ver as N fontes", no último slide de cada post |
| Vire a Moeda (giro 3D) + "Os números" | `/duas-faces/disciplina-excelencia` |
| Lado a Lado com divisor arrastável | mesma página, em tela larga |
| Selo ☭ ancorado em fato | botão ☭ na face vermelha (`?simbolo=sempre` ou `desligado` para pré-visualizar) |
| Orbe + Bússola (busca por texto e voz) | botão dourado; toque longo = voz |
| Kit Zap (imagem 1080×1350 com a fonte impressa) | último slide de cada post |
| Ouvir (leitura em voz alta) | botão 🔊 em cada post |
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
| `src/content/posts/*.yaml` | Um assunto = um post com 3 a 7 `slides` |
| `src/content/moedas/*.yaml` | Uma moeda = face `vermelha` (2 a 5 slides) + face `azul` (2 a 5 slides) + `placar` |
| `src/data/fontes.yaml` | Biblioteca de fontes (id, nível A/B/C, trecho, links) |
| `src/data/linha-do-tempo.yaml` | Eventos com ano, quem decidiu e fontes |
| `src/data/glossario.yaml` | Termos explicados em linguagem simples |
| `src/data/eixos.yaml` | Os 11 temas |

**Um slide:**

```yaml
- tipo: consequencia            # problema | esquerda | consequencia | direita | fecho (define cor e rótulo)
  rotulo: No que deu            # opcional: troca o rótulo padrão
  numero: { valor: 80, sufixo: "%" }   # opcional: número gigante acima da frase
  frase: dos professores já foram agredidos na escola.   # até 130 caracteres
  autor: Lula, 2023             # opcional: transforma a frase numa citação literal
  contexto: E a violência nas escolas mais que triplicou em 10 anos. [[fapesp-violencia-escolas]]   # até 260
  mais:                         # opcional: o "Quero entender melhor"
    titulo: Como é a agressão contra o professor
    blocos: [ ... ]             # texto, lista, destaque, barras, citacao, linha, antesAgora
```

**Marcações no texto:** `[[id-da-fonte]]` vira selo de fonte · `((termo))` abre o glossário · `**negrito**` · `==marca-texto==`.

**Sem fonte, não compila:** o build falha se um slide de fato (`problema`, `esquerda`, `consequencia`, ou qualquer slide com número ou citação) não tiver fonte, se uma fonte citada não existir, se um termo não estiver no glossário ou se a frase ou o contexto passarem do limite de tamanho.

**Blocos do "Quero entender melhor":** `texto`, `lista`, `destaque`, `barras`, `citacao`, `linha`, `antesAgora`. Cada bloco aceita `face: vermelha | azul` para mostrar quem fala, e `rotulo: posicao` marca a opinião do site como "Nossa posição".

## Tecnologia

Astro 7 (site estático) · TypeScript sem bibliotecas no navegador (cerca de 8 KB de JavaScript comprimido) · CSS moderno com *scroll-snap*, transformações 3D e fontes variáveis · Cloudflare Workers (arquivos estáticos). Sem banco de dados, sem cookies e sem coleta de dados pessoais.

## Documentação

| Documento | Conteúdo |
|---|---|
| [Planejamento completo](docs/01-planejamento.md) | Conceito, navegação, formatos, fontes, identidade visual, IA, stack, Cloudflare, cronograma, riscos |
| [Protocolo editorial](docs/02-protocolo-editorial.md) | Regras de verdade, fontes, vocabulário jurídico, linguagem, regras eleitorais e das duas faces |
| [Pautas](docs/03-pautas.md) | Backlog de conteúdo por eixo, com status de verificação |
| [Duas faces da moeda](docs/04-duas-faces.md) | Valores da direita por tema, com fundamentos, evidências e limites; roteiro da face vermelha |
| [Educação: disciplina e respeito](docs/05-educacao-disciplina.md) | Pesquisa que embasa o tema implementado |
