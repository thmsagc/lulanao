# Planejamento completo — lulanao.com.br

> **Contra fatos, não há narrativa.**

Documento-mestre do projeto. Define o conceito, a experiência, a navegação, a identidade visual, a tecnologia, o recurso de IA, a publicação gratuita na Cloudflare e o cronograma.

Documentos irmãos:

- [`02-protocolo-editorial.md`](02-protocolo-editorial.md): regras de verdade, fontes, linguagem e segurança jurídica. **Leitura obrigatória antes de escrever qualquer conteúdo.**
- [`03-pautas.md`](03-pautas.md): backlog de conteúdo por eixo, com fatos já levantados, fontes iniciais e status de verificação.
- [`04-duas-faces.md`](04-duas-faces.md): os valores da direita (economia, segurança, saúde, educação, família, religião, igualdade, propriedade) com fundamentos e evidências, e o roteiro da face vermelha de cada tema.
- [`05-educacao-disciplina.md`](05-educacao-disciplina.md): o que aconteceu com a disciplina, a autoridade do professor e a excelência na escola; o que diz a ciência; os valores de cada lado.

---

## 0. Resumo em 1 minuto

| | |
|---|---|
| **O que é** | Um "feed" interativo, no formato de posts de rede social desenhados por designers, que mostra **o que Lula, o PT e seu entorno defendem e fizeram**, além das **investigações** que os envolveram. Cada afirmação traz a fonte a um toque de distância. |
| **Para quem** | Do eleitor com pouca escolaridade, que usa um Android simples e se informa pelo WhatsApp, ao leitor cético que quer ver o documento original. |
| **Grande ideia** | **O Feed em Camadas**: deslizar para cima leva ao próximo assunto, e deslizar para o lado aprofunda o mesmo assunto (10 segundos, 1 minuto, prova, outro lado, reflexão). Cada pessoa escolhe até onde quer ir. |
| **Diferencial** | As fontes são o centro do site, e não uma nota de rodapé. Cada frase tem um **selo de fonte**; cada post tem um **recibo de fontes**; o site tem uma **Biblioteca de Fontes** pesquisável. O lema interno é: *sem fonte, não compila* (o site nem é gerado se faltar fonte). |
| **Duas faces da moeda** | Cada tema tem uma **moeda**. Na **face vermelha** está o que a esquerda defende, nas palavras dela; na **face azul**, os valores da direita (livre mercado, ordem, família, fé, igualdade perante a lei, propriedade). Um toque **vira a tela inteira** como uma moeda, e no meio fica o **Placar dos Fatos**, que os dois lados precisam encarar. Detalhes em [`04-duas-faces.md`](04-duas-faces.md). |
| **Cor = quem fala** | 🔴 **Vermelho** (o vermelho do comunismo) sempre que o assunto é a esquerda. 🔵 **Azul** para os valores da direita. ⚪ **Papel** para fatos e dados neutros. |
| **Sem cabeçalho/rodapé** | A navegação toda acontece por gestos e por um **Orbe** flutuante (a "Bússola"), com busca por voz. |
| **Tecnologia** | Site 100% estático (Astro + ilhas Svelte + GSAP), publicado de graça na Cloudflare. Sem banco de dados. A IA opcional usa uma função serverless gratuita da própria Cloudflare. |
| **Tom** | **Lado assumido: direita.** Frases duras em linguagem simples, mostrando as consequências das decisões da esquerda. Opinião marcada como "Nossa posição" e todo fato com fonte. Sem xingamento (protocolo, item 0). |

---

## 1. Missão, público e princípios

### 1.1 Missão

Mostrar, com fontes verificáveis e linguagem que qualquer brasileiro entende:

1. **O que o campo político de Lula defende**: propostas, votações, declarações, decisões de governo e de aliados, em temas como educação, segurança e direito de defesa, família e fé, espaços femininos, raça e cotas, civismo, política externa e economia do dia a dia.
2. **O estado das coisas**: dados que medem o descaso (aprendizado, alfabetização, violência contra professores, patrimônio público).
3. **Tudo o que Lula e pessoas diretamente ligadas a ele foram investigados**, com o status jurídico exato de cada caso: investigado, denunciado, réu, condenado, absolvido, anulado, prescrito ou arquivado. Sem imputar crime a ninguém, mas sem deixar nada escondido.
4. **A outra face da moeda**: os valores da direita, que não se confundem com nenhum político ou candidato: livre mercado e concorrência, ordem e segurança, legítima defesa, família, liberdade religiosa e valores cristãos, igualdade perante a lei, propriedade privada. Para cada problema mostrado, a alternativa defendida. Não é só criticar: é **propor**.

### 1.2 Personas (para quem desenhamos)

| Persona | Perfil | O que precisa | Como o site atende |
|---|---|---|---|
| **Dona Cida, 61** | Ensino fundamental, Android de entrada, plano pré-pago, WhatsApp "ilimitado" | Entender em segundos; ouvir em vez de ler; mandar para a família | Camada "10 segundos", botão **Ouvir**, **Kit Zap** (imagem pronta com a fonte impressa) |
| **Rogério, 38** | Motorista de aplicativo, ensino médio, lê nos intervalos | Coisas curtas, números que dá para comparar | Números traduzidos ("isso dá X escolas"), posts de 1 minuto, "continuar de onde parei" |
| **Pastor Elias, 50** | Líder comunitário, repassa conteúdo para grupos | Material confiável e pronto para repassar sem passar vergonha | Kit Zap, recibo de fontes, selo "verificado em DD/MM" |
| **Júlia, 23** | Universitária e cética | Documento original, contexto, o outro lado | Camadas "Prova" e "Outro lado", Biblioteca de Fontes, versões arquivadas |
| **O adversário** | Jornalista ou militante procurando um erro | Um deslize para desacreditar tudo | Protocolo editorial rígido, errata pública e status jurídico exato. O site precisa **aguentar escrutínio**. |

> O "adversário" é a persona mais importante para a qualidade: se o site resiste a ele, convence todos os outros.

> **Insight brasileiro:** milhões de usuários pré-pagos têm WhatsApp sem custo de dados, mas pagam para abrir links. Por isso a mensagem precisa viajar **dentro** do WhatsApp (imagem e texto com a fonte impressa), e não só como link.

### 1.3 Princípios

1. **Verdade verificável**: nenhuma frase sem fonte, nenhum status jurídico impreciso.
2. **Simples primeiro, profundo sob demanda**: cada assunto começa com uma frase e um número e termina no documento original.
3. **Mostrar, não xingar**: criticar ideias, políticas e atos, nunca pessoas por quem elas são.
4. **Celular de entrada primeiro**: tem que ser rápido num celular de R$ 600 com 4G fraco.
5. **Compartilhável por natureza**: cada tela é uma peça pronta para circular, e a fonte vai junto.
6. **Transparência radical**: errata pública, data de atualização, expediente com responsável identificado.

---

## 2. O conceito: o Feed em Camadas

### 2.1 A grande ideia: navegação em duas dimensões

```
                 ↑  próximo assunto
                 │
   ┌─────────────┼─────────────────────────────────────────────────────┐
   │  CAPA  →  ENTENDA  →  PROVA  →  OUTRO LADO  →  PENSE NISSO        │  ← post atual
   │  10 s       1 min      dados     contraponto     pergunta + kit    │     (deslize →
   └─────────────┼─────────────────────────────────────────────────────┘      para aprofundar)
                 │
                 ↓  assunto anterior
```

- **Vertical (↑↓)**: muda de assunto, como no Reels/TikTok/Stories. Todo mundo já sabe usar.
- **Horizontal (←→)**: aprofunda o mesmo assunto. Quem quer só o essencial segue para cima; quem quer tudo vai para o lado.
- **Trilho de progresso** no topo (as barrinhas dos Stories) mostra em que camada a pessoa está e quantas faltam.

### 2.2 Cada post é uma sequência de slides (formato de post de Instagram)

> **Atualização (outubro de 2026):** as 5 camadas (Capa, Entenda, Prova, Outro lado, Pense nisso) foram trocadas por **slides no formato de post de Instagram**. Cada slide tem **uma frase grande e dura**, um **contexto curto em letra grande** e, quando há mais a dizer, o botão **"Quero entender melhor"**, que abre o detalhe numa janela por cima da página. A janela fecha com ✕, com "Continuar lendo" ou arrastando para baixo, e o leitor volta exatamente para onde estava. Os quizzes e o "Verdadeiro ou Falso" saíram.

| Tipo de slide | Cor | Rótulo padrão | O que mostra |
|---|---|---|---|
| `problema` | Papel | "O problema" | O fato ou número que dói, com fonte |
| `esquerda` | Vermelho | "O que a esquerda fez" | A decisão ou a fala da esquerda, de preferência nas palavras dela |
| `consequencia` | Papel | "A consequência" | O que veio depois, em números, com fonte |
| `direita` | Azul | "A visão da direita" | O valor da direita que responde ao problema |
| `fecho` | Azul | "Nossa posição" | A frase final para compartilhar (Kit Zap e "Vire a moeda") |

Regras do formato:

- **Frase** com no máximo 130 caracteres e **contexto** com no máximo 260. O build recusa textos maiores.
- Slides `problema`, `esquerda` e `consequencia`, e qualquer slide com número ou citação, **não compilam sem fonte**.
- O detalhe (gráficos, linha do tempo, citações, "o que eles dizem e a nossa resposta") fica todo no "Quero entender melhor".
- Dentro da janela, tocar numa fonte ou num termo abre a ficha por cima, com **← Voltar**.

### 2.3 Modos de leitura

> **Atualização (outubro de 2026):** o seletor "Modo simples / Modo completo" foi retirado. O próprio formato já resolve: quem quer o essencial lê as frases grandes e segue; quem quer tudo toca em "Quero entender melhor".

### 2.4 Ordem do feed (sem algoritmo nem servidor)

- **"Comece aqui"**: sequência curada de 7 posts que apresenta o site e os eixos.
- Depois, o feed **alterna eixos** (educação, casos, segurança...) para não cansar.
- **Continuar de onde parei**, **Salvos** e **Já vi** ficam guardados no aparelho.
- Quem chega por um link compartilhado cai direto no post. Ao terminar, recebe "mais deste tema" e depois volta ao feed geral.

### 2.5 "Vire a Moeda": as duas faces de cada tema

Além de **↑↓ (assunto)** e **←→ (profundidade)**, o site ganha uma terceira dimensão: **virar** (a outra face).

```
        FACE VERMELHA                    (borda)                     FACE AZUL
  ┌──────────────────────┐          PLACAR DOS FATOS          ┌──────────────────────┐
  │ ☭ O QUE A ESQUERDA   │       ┌───────────────────┐        │ O QUE A DIREITA      │
  │   DEFENDE            │       │ 63,94% votaram NÃO│        │   DEFENDE          ⚖ │
  │                      │  ◀──▶ │ só 35% dos        │  ◀──▶  │                      │
  │ "nas palavras dela": │       │ homicídios são    │        │ valores + fundamento │
  │ programa, lei, voto, │       │ esclarecidos      │        │ + evidência          │
  │ declaração literal   │       └───────────────────┘        │                      │
  │        [fonte ✓]     │        fatos neutros, que          │        [fonte ✓]     │
  │      ( ↻ virar )     │        os dois lados encaram       │      ( ↻ virar )     │
  └──────────────────────┘                                    └──────────────────────┘
```

**Como funciona**

| Interação | O que acontece |
|---|---|
| Tocar na **moeda ↻** (canto inferior, ao lado do Orbe) | A **tela inteira gira 180° em 3D** como uma moeda lançada: sobe, gira, aterrissa. Durante o giro aparece a **borda serrilhada** da moeda. O tema visual troca (vermelho ↔ azul) e o celular vibra de leve ao "aterrissar" |
| Deslizar ←→ dentro da moeda | Percorre as camadas (Capa, Entenda, Prova...) **na face atual**; ao virar, o leitor cai **na mesma camada** da outra face, e a comparação fica justa |
| Tocar na borda / "Placar dos Fatos" | Abre os **dados neutros** (papel branco) que os dois lados precisam encarar |
| Celular deitado ou computador | Modo **Lado a Lado**: as duas faces lado a lado com um **divisor arrastável** (arrastar para a esquerda revela mais azul; para a direita, mais vermelho) e o Placar dos Fatos no centro |
| Fim da moeda | **"E você?"** O leitor marca qual face o convenceu mais (ou "ainda estou pensando") |

**"Sua Moeda"**: depois de alguns temas, o site mostra um resumo pessoal ("em 7 de 10 temas, você ficou com a face azul"). Fica guardado **só no aparelho**; nada é enviado. **Nunca** é associado a candidato ou partido, por respeito à regra eleitoral e porque o objetivo é refletir sobre valores, não fichar ninguém.

**Por que funciona**

- "As duas faces da moeda" é uma expressão que todo brasileiro entende, e a interação é literal: virar.
- Transforma crítica em **escolha consciente**: o leitor vê o que cada lado defende e decide.
- O "Placar dos Fatos" no meio mostra que o site não tem medo dos dados.
- Implementação: cartão 3D com `transform-style: preserve-3d` e `backface-visibility`, animado com GSAP (lançamento e giro); troca de tema por `data-face="vermelha|azul"` na raiz; com movimento reduzido, troca por esmaecimento simples.

**Nos posts comuns:** todo post sobre a esquerda (face vermelha) termina com **"↻ Vire a moeda: o que a direita propõe para isso"**, levando à face azul do tema. Cada problema mostrado vem acompanhado de uma alternativa.

---

## 3. Navegação sem cabeçalho nem rodapé

### 3.1 O Orbe e a Bússola

Um único botão flutuante (o **Orbe**) fica na zona do polegar, embaixo e ao centro. Ele substitui o menu, o cabeçalho e o rodapé.

- **Toque**: abre a **Bússola**, uma tela cheia com os eixos em ícones grandes e coloridos, além de Buscar, Pergunte, Linha do Tempo, Teia, Fontes e Salvos.
- **Toque longo**: **busca por voz** ("fale o que você quer saber"). É essencial para quem tem dificuldade de digitar.
- **Arrastar o Orbe para cima**: atalho para a Biblioteca de Fontes do post atual.
- O Orbe "respira" (animação sutil) só nas primeiras visitas, para ensinar que ele existe.

```
┌────────────────────────────┐        ┌────────────────────────────┐
│ ▬▬▬ ▭▭▭ ▭▭▭ ▭▭▭ ▭▭▭        │        │  BÚSSOLA            ✕      │
│ 🛡 DIREITO DE DEFESA        │        │                            │
│                            │        │  🎤 Fale ou digite...       │
│          63,94%            │        │                            │
│                            │        │  🕵 Os Casos   🎓 Escola    │
│   dos eleitores disseram   │        │  🛡 Defesa     👪 Família   │
│   NÃO à proibição da venda │        │  ♀ Mulher     ⚖ Iguais     │
│   de armas, em 2005.       │        │  🇧🇷 Orgulho   🌎 Lá Fora   │
│                 [TSE ✓]    │        │  👥 Com Quem  💰 Seu Bolso  │
│                            │        │  🩺 Saúde     🪙 DUAS FACES │
│  🔊 Ouvir        Entenda → │        │  ⏱ Linha do tempo  🕸 Teia  │
│                            │        │  📚 Fontes   💬 Pergunte    │
│     ↻      ( ◉ )           │        │  🔖 Salvos   ⚙ Modo simples│
└────────────────────────────┘        └────────────────────────────┘
   Tela de capa de um post                 Bússola (toque no Orbe)
```

### 3.2 Gestos, com alternativas sempre visíveis

| Gesto | Ação | Alternativa sem gesto |
|---|---|---|
| Deslizar ↑ / ↓ | Próximo / anterior assunto | Setas discretas na borda; teclado ↑↓ |
| Deslizar → / ← | Aprofundar / voltar camada | Botão "Entenda →"; teclado →← |
| Tocar no selo `[fonte ✓]` | Abre a ficha da fonte (painel de baixo) | Botão "Fontes" no fim de cada camada |
| Toque longo no Orbe | Busca por voz | Campo de busca na Bússola |
| Tocar na moeda ↻ | Vira a tela para a outra face (esquerda ↔ direita) | Botão "Vire a moeda" no fim de cada post; tecla **V** |
| Tocar numa palavra sublinhada | Glossário ("o que é *réu*?") | Página Glossário |

**Tutorial de 3 segundos** na primeira visita: uma mão animada mostra "↑ próximo assunto" e "→ saber mais". Pode ser pulado e não volta a aparecer.

### 3.3 No computador: a "Mesa de Investigação"

No desktop, o feed vira uma coluna central (como um celular) e as laterais ganham função:

```
┌──────────────────┬──────────────────────────┬────────────────────────┐
│  EIXOS / MAPA    │                          │  FONTES DESTE TRECHO   │
│  ● Os Casos      │     [ post atual em      │  ┌──────────────────┐  │
│  ○ Escola        │       formato celular ]  │  │ TSE — Resultado   │  │
│  ○ Defesa        │                          │  │ do Referendo 2005 │  │
│  ...             │     ← → camadas          │  │ ver original ↗    │  │
│                  │     ↑ ↓ assuntos         │  │ ver arquivado ↗   │  │
│  Linha do tempo  │                          │  └──────────────────┘  │
│  ▁▂▃▅▇ (mini)    │                          │  (atualiza conforme    │
│                  │                          │   a leitura avança)    │
└──────────────────┴──────────────────────────┴────────────────────────┘
```

As fontes acompanham a leitura em tempo real: é a experiência do leitor cético.

### 3.4 Endereços curtos e compartilháveis

| Rota | Conteúdo |
|---|---|
| `/` | Feed (começa em "Comece aqui" ou onde parou) |
| `/p/{slug}` | Post (abre na camada Capa; `?c=2` abre direto na Prova) |
| `/e/{eixo}` | Feed filtrado por eixo |
| `/caso/{id}` | Dossiê do caso, com Rastreio do Processo |
| `/pessoa/{id}` | Ficha da pessoa: cargos, vínculo com Lula (com fonte) e casos com status |
| `/fontes` | Biblioteca de Fontes |
| `/fontes/{id}` | Ficha de uma fonte e todos os posts que a usam |
| `/linha-do-tempo` | Linha do tempo interativa |
| `/teia` | Teia de conexões |
| `/pergunte` | Pergunta Aí (perguntas guiadas e IA) |
| `/glossario` | Glossário em linguagem simples |
| `/duas-faces` | O "cofre de moedas": uma moeda por tema, rolando em carrossel |
| `/duas-faces/{tema}` | A moeda de um tema (`?face=azul` abre direto na face azul) |
| `/sua-moeda` | Resumo pessoal das escolhas do leitor (guardado só no aparelho) |
| `/sobre` | Missão, expediente (responsável), protocolo editorial, contato |
| `/errata` | Todas as correções e atualizações, com data |

---

## 4. Formatos-assinatura (componentes interativos)

São as "peças de designer" que dão identidade ao site. Cada post usa um ou mais destes formatos na camada Prova.

| # | Formato | O que faz | Exemplo de uso |
|---|---|---|---|
| 1 | **Rastreio do Processo** | Mostra a vida de um caso judicial como o rastreio de uma encomenda: cada etapa com data, órgão e fonte | Triplex: denúncia → condenação → prisão → anulação → prescrição |
| 2 | **A Teia** | Mapa interativo de pessoas, empresas, cargos e operações. Cada linha é um fato documentado ("foi ministro de", "foi tesoureiro de"), com fonte e status | Entorno de Lula nos casos Mensalão, Lava Jato e INSS |
| 3 | **Linha do Tempo Viva** | Do 1980 a hoje, com zoom e filtros por eixo; governos ao fundo como faixas coloridas | "O que aconteceu na educação de 2003 a 2026" |
| 4 | **Placar** | Resultado de votação, referendo ou pesquisa, animado por estado | Referendo 2005; votações nominais na Câmara |
| 5 | **Disse × Fez** | Declaração (com vídeo e minutagem) lado a lado com um ato ou dado | Promessa de campanha × preço medido pelo IBGE |
| 6 | **Quanto Custa?** | Converte valores enormes em coisas concretas: salários mínimos, cestas básicas, escolas, ambulâncias. Os custos unitários também têm fonte | "R$ X bilhões = Y escolas novas" |
| 7 | **Antes × Agora** | Controle deslizante comparando dados (ou fotos licenciadas) de dois momentos | Indicadores educacionais ao longo dos anos |
| 8 | **Verdadeiro ou Falso?** | Cartas para deslizar (→ verdadeiro, ← falso). Cada resposta revela a fonte. **Inclui boatos dos dois lados**, o que dá credibilidade | "Lula foi absolvido no caso do triplex?" (Resposta: não, foi anulado e depois prescreveu) |
| 9 | **Raio-X do Documento** | Trecho de documento oficial (decisão, plano de governo, decreto) com marca-texto animado nas partes importantes e link para o PDF | Plano de governo registrado no TSE; decreto de armas de 2023 |
| 10 | **Mapa do Brasil** | Mapa por estado com dados oficiais | Alfabetização por estado (Indicador Criança Alfabetizada) |
| 11 | **Quem Decidiu?** | Etiqueta que mostra, sem ambiguidade, quem tomou cada decisão: Presidente/Executivo, Ministério, STF, Congresso, Estado/Município, PT ou aliado | Evita atribuir a Lula o que foi do STF (e vice-versa) |
| 12 | **Contagem Viva** | Números que "sobem" ao entrar na tela, com comparação ("4 vezes a média") | TALIS: 12,5% contra 3,4% |
| 13 | **Vire a Moeda** | A tela inteira gira em 3D e mostra a outra face do tema (item 2.5) | "Armas: o que cada lado defende" |
| 14 | **Lado a Lado** | As duas faces lado a lado, com divisor arrastável (celular deitado ou computador) | Comparar propostas de educação |
| 15 | **Placar dos Fatos** | Dados neutros na "borda" da moeda, inclusive os que incomodam a direita | Taxa de esclarecimento de homicídios; Ideb |
| 16 | **Selo Comunista ☭** | Foice e martelo como **carimbo ancorado em fato documentado**, com explicação ao tocar (item 7.2) | "O PT é federado ao Partido Comunista do Brasil desde 2022" |

### 4.1 Dois exemplos completos (storyboards)

**A) "O povo disse NÃO" (eixo Direito de Defesa)**

| Camada | Tela |
|---|---|
| Capa | **63,94%** sobe na tela: "dos eleitores votaram NÃO à proibição da venda de armas, em 2005." Selo `[TSE ✓]` |
| Entenda | "Em 2005, o Brasil votou num referendo. A pergunta: *o comércio de armas e munição deve ser proibido?* A maioria disse NÃO. A venda continuou permitida." 🔊 |
| Prova | **Placar** por estado + **Linha do Tempo**: 2003, Estatuto do Desarmamento sancionado; 2005, referendo; 2019–2022, decretos que flexibilizam; 2023, decretos que voltam a restringir. Cada marco com fonte. |
| Outro lado | "Quem defende mais restrições argumenta que..." (com fonte de pesquisadores e entidades dessa posição). "Atenção: o referendo tratava só da **venda**, e não do Estatuto inteiro." |
| Pense nisso | "Se a maioria disse NÃO à proibição da venda, regras que dificultam o acesso respeitam essa decisão? O que você acha?" + quiz + Kit Zap |

> Repare na precisão: o referendo foi sobre o artigo 35 (proibição do comércio), e não sobre o Estatuto inteiro. Dizer isso corretamente **fortalece** o argumento e tira munição de quem quiser desmentir.

**B) "Triplex: o que aconteceu de verdade" (eixo Os Casos)**

```
TRIPLEX DO GUARUJÁ — rastreio do processo          (datas a confirmar nas fontes primárias)
● 2016  Denunciado pelo MPF ..................................... [fonte]
● 2017  Condenado em 1ª instância (9 anos e 6 meses) ............ [fonte]
● 2018  Condenado em 2ª instância — TRF4 (12 anos e 1 mês) ...... [fonte]
● 2018  Preso. Ficou 580 dias ................................... [fonte]
● 2019  STJ mantém a condenação e reduz a pena .................. [fonte]
● 2019  Solto após o STF mudar o entendimento sobre 2ª instância  [fonte]
◆ 2021  STF anula: o caso deveria ter corrido em Brasília ........ [fonte]
◆ 2021  STF declara o juiz Sergio Moro parcial ................... [fonte]
○ 2021–22 Em Brasília: prescrição (prazo cai pela metade
          para maiores de 70) → caso arquivado ................... [fonte]
     ╰─▶  ANULADO não é o mesmo que INOCENTADO.
          O mérito (se houve ou não crime) não foi julgado de novo.
```

- **Outro lado**: a defesa sustenta que houve perseguição (lawfare); o STF reconheceu a parcialidade do juiz; houve as mensagens reveladas em 2019 ("Vaza Jato"). Tudo com fonte.
- **Pense nisso**: "A Justiça não condenou nem absolveu de novo. O tempo acabou. O que você conclui?"
- **↻ Vire a moeda**: "Prisão após condenação em 2ª instância: o que cada lado defende?"

**C) Moeda "Armas e legítima defesa" (Duas Faces)**

| Camada | 🔴 Face vermelha (esquerda) | ⚪ Placar dos Fatos | 🔵 Face azul (direita) |
|---|---|---|---|
| Capa | "Menos armas, menos mortes." (ideia-síntese **com fonte** em documento ou fala do campo) | **63,94%** votaram NÃO à proibição da venda (2005) · só **35%** dos homicídios são esclarecidos (2021) | "Ninguém é obrigado a esperar a polícia para defender a própria família." |
| Entenda | O que defendem: Estatuto (2003), decretos de 2023, controle mais rígido. Nas palavras de documentos oficiais | O que diz cada lei, sem adjetivo | Por que defendem: legítima defesa como direito natural, respeito ao referendo, cidadão de bem não é o problema |
| Prova | Decretos, falas, votações, citação literal | Séries oficiais de homicídios e armas registradas | Constituição, Código Penal (art. 25), referendo, estudos citados pela direita |
| Outro lado | Críticas da direita a essas medidas | Onde os estudos **divergem** (honestidade) | Críticas da esquerda a essas propostas |
| Pense nisso | **E você?** Qual face te convenceu mais? → "Sua Moeda" | | |

> Regra de ouro das duas faces: **se um petista ler a face vermelha, precisa reconhecer ali a própria posição.** Mostrar o adversário como ele é (e não uma caricatura) é o que torna a face azul convincente.

---

## 5. As fontes: o coração do site

### 5.1 Peças do sistema de fontes

| Peça | Onde aparece | O que mostra |
|---|---|---|
| **Selo de fonte** `[Folha ✓]` | Ao lado de cada afirmação | Tocar abre a **ficha da fonte** num painel de baixo, sem sair do post |
| **Ficha da fonte** | Painel de baixo / página `/fontes/{id}` | Veículo, título, autor, data, **trecho literal** citado, tipo, nível de confiabilidade, link original, **link arquivado**, "copiar referência" e posts que usam a fonte |
| **Recibo de fontes** | Fim de cada post | Lista numerada de todas as fontes do post, no estilo cupom fiscal, com o resumo: "9 fontes · 4 documentos oficiais · 5 veículos diferentes · verificado em 07/10/2026" |
| **Biblioteca de Fontes** | `/fontes` | Todas as fontes do site, com busca e filtros: eixo, tipo (decisão judicial, dado oficial, reportagem...), veículo, ano. Mostra estatísticas de transparência |
| **Selos de confiança** | Na ficha | `DOCUMENTO OFICIAL` · `DECISÃO JUDICIAL` · `DADO DO PRÓPRIO GOVERNO` · `NOTICIADO POR VEÍCULOS DE LINHAS DIFERENTES` |

> **Selo "Dado do próprio governo"**: quando o dado vem do MEC, do Inep, do IBGE ou do Portal da Transparência, isso é destacado. É a fonte mais difícil de contestar.

### 5.2 Fontes que não somem

- Todo link de fonte tem uma **versão arquivada** (Wayback Machine / archive.today), gerada por script no momento em que a fonte é cadastrada.
- Um robô semanal (GitHub Actions, gratuito) verifica links quebrados e abre um alerta.
- Paywall: a ficha mostra o trecho literal citado, e o leitor não precisa assinar o jornal para conferir o essencial.

### 5.3 Medir a "taxa de checagem"

Indicador exclusivo do site: **quantas pessoas abriram pelo menos uma fonte**. Sem script de rastreamento, os cliques em "ver original" passam por uma rota estática `/ir/{fonte}` que redireciona na hora e aparece como visualização no Cloudflare Web Analytics (que não usa cookies).

---

## 6. Arquitetura de informação

### 6.1 Os 11 eixos, cada um com a sua moeda

Os eixos se diferenciam por **ícone**, e não por cor, porque a cor tem um só significado no site: **quem está falando** (item 7.2).

| # | Eixo | Pergunta central | Ícone | Moeda (duas faces) |
|---|---|---|---|---|
| 1 | **Os Casos** | Do que Lula e pessoas diretamente ligadas a ele foram investigados, e como cada caso terminou? | 🕵 | Combate à corrupção: prisão em 2ª instância, foro privilegiado, delação |
| 2 | **Com Quem Andas** | O que os aliados (ministros, partidos da base, movimentos) defendem e como votam? | 👥 | Socialismo × livre iniciativa: o papel do Estado |
| 3 | **Escola em Ruínas** | O que aconteceu com o aprendizado, a disciplina e o respeito ao professor? | 🎓 | Educação: ordem, mérito, alfabetização, direito dos pais |
| 4 | **Direito de Defesa** | O povo votou contra a proibição da venda de armas. O que foi feito desde então? E a segurança pública? | 🛡 | Segurança: lei e ordem, legítima defesa, cumprimento de pena |
| 5 | **Família e Fé** | Qual o lugar da família e da fé nas propostas e decisões (aborto, drogas, gênero na escola)? | 👪 | Família e vida · Religião e liberdade religiosa |
| 6 | **Espaço da Mulher** | Esporte, presídios, vestiários: sexo biológico ou identidade de gênero? O que foi decidido e por quem? | ♀ | Sexo biológico × identidade de gênero em espaços femininos |
| 7 | **Iguais Perante a Lei** | Cotas raciais, bancas de heteroidentificação: como funcionam e o que dizem os dois lados? | ⚖ | Pessoa como pessoa × políticas por grupo |
| 8 | **Orgulho de Ser Brasileiro** | Símbolos, civismo, patrimônio público: o que se perdeu? | 🇧🇷 | Nação, símbolos e civismo |
| 9 | **O Brasil Lá Fora** | Com quais regimes o governo se alinha e o que disse sobre eles? Quanto o BNDES emprestou lá fora e quanto voltou? | 🌎 | Política externa: com quem se alinhar |
| 10 | **No Seu Bolso** | Impostos, preços, gastos do governo: o que mudou no dia a dia? | 💰 | Economia: livre mercado × Estado · Propriedade privada |
| 11 | **Saúde** | O SUS funciona? O que muda quando há gestão profissional, concorrência e escolha? | 🩺 | Saúde: gestão, parcerias, escolha, vida |

### 6.2 Entidades que atravessam os eixos

- **Casos**: cada investigação ou processo, com etapas e status.
- **Pessoas**: cargos, períodos, vínculo com Lula (documentado) e casos.
- **Fontes**: a biblioteca.
- **Linha do tempo**: eventos com data, eixo e fonte, gerados automaticamente a partir dos posts, casos e pessoas.
- **Glossário**: termos jurídicos e técnicos em linguagem simples (réu, denúncia, delação premiada, prescrição, anulação, foro, STF, TRF...).

---

## 7. Identidade visual e movimento

### 7.1 Conceito visual: "Documento Vivo"

A estética mistura **papel de documento** com **design de post de rede social**:

- **Fundo papel** (claro) ou **noite** (escuro), com textura sutil de grão.
- **Marca-texto amarelo** que "passa" sobre as frases-chave quando elas entram na tela.
- **Carimbos** para status jurídico (`ANULADO`, `PRESCRITO`, `CONDENADO EM 2ª INSTÂNCIA`, `ARQUIVADO`), que "batem" na tela com um pequeno tremor.
- **Recortes de jornal** com borda rasgada para as fichas de fonte.
- **Fios vermelhos** de quadro de investigação na Teia.
- **Tipografia cinética**: números e palavras grandes que se expandem, usando o eixo de largura da fonte variável.

Não usamos cards padrão, grades de blog nem barras de menu. Cada tela é uma **composição** pensada como peça de designer.

**Duas estéticas para as duas faces**, e o contraste entre elas já conta a história:

| | 🔴 Face vermelha (esquerda) | 🔵 Face azul (direita) |
|---|---|---|
| Referência | **Cartaz construtivista** (a estética da propaganda soviética dos anos 1920) | **Estética republicana clássica**: ordem, tradição, solidez |
| Composição | Diagonais, blocos chapados, tipografia condensada gritando | Eixos centrais, simetria, respiro, linhas finas douradas |
| Cores | Vermelho, preto e creme; símbolo em dourado | Azul profundo, marfim e ouro velho |
| Títulos | Condensada pesada (Oswald / Anton) | Serifada clássica (Fraunces) |
| Movimento | Entra "empurrando", em diagonal, com corte seco | Entra "assentando", de baixo para cima, com suavidade |

O **texto corrido** usa a mesma fonte legível nas duas faces (Atkinson Hyperlegible), para não prejudicar a leitura.

### 7.2 Cor = quem fala

No site, a cor indica **quem está falando**. Essa regra vale sem exceção e é ensinada no tutorial ("vermelho = o que a esquerda defende; azul = o que a direita defende; papel = fato").

| Camada semântica | Token | Valor | Uso |
|---|---|---|---|
| 🔴 **Esquerda** | `--esq` | `#CC0000` (o vermelho da bandeira soviética) | Fundo/acento de tudo que mostra posições, atos e pessoas do campo da esquerda |
| | `--esq-escuro` | `#7A0000` | Sombras, textos sobre creme |
| | `--esq-creme` | `#FFF1DC` | Texto sobre o vermelho, fundo de citações |
| | `--esq-ouro` | `#FFD700` | Símbolo ☭ e estrela |
| 🔵 **Direita** | `--dir` | `#0B2D6B` (azul profundo) | Fundo/acento dos valores da direita |
| | `--dir-medio` | `#1F4FD8` | Links e destaques na face azul |
| | `--dir-marfim` | `#F7F3EA` | Fundo claro da face azul |
| | `--dir-ouro` | `#C9A227` | Filetes, detalhes clássicos |
| ⚪ **Fato / dado** | `--papel` / `--tinta` | `#F3EFE6` / `#14171C` | Placar dos Fatos, dados oficiais, fichas de fonte |
| 🟡 **O site** | `--ouro` | `#FFC72C` | Marca-texto, Orbe, foco: a "voz" do site |
| Tema escuro | `--noite` / `--giz` | `#0B0E13` / `#F2F2EE` | Modo escuro dos elementos neutros |

> Contraste conferido: texto branco sobre `#CC0000` ≈ 5,9:1 e sobre `#0B2D6B` ≈ 13:1 (ambos passam no WCAG AA). O dourado `#FFD700` sobre o vermelho ≈ 4,2:1, adequado para símbolos e títulos grandes.

**O símbolo ☭ (foice e martelo)**

Tem um modo configurável em uma linha (`simboloComunista` no arquivo de configuração do site):

| Modo | Como aparece | Avaliação |
|---|---|---|
| **`ancorado`** (recomendado) | Como **carimbo** nos itens com vínculo comunista **documentado**, com legenda ao tocar. Exemplos: o PT é **federado ao PCdoB (Partido Comunista do Brasil)** desde 2022 (Federação Brasil da Esperança, que segue em 2026); a **presidente nacional do PCdoB, Luciana Santos, foi nomeada ministra** da Ciência e Tecnologia por Lula; o **Foro de São Paulo** nasceu de iniciativa do PT com o **Partido Comunista de Cuba** | **Incontestável**: o símbolo vira um fato com fonte. Ninguém pode chamar de mentira |
| `sempre` | Marca d'água discreta em toda a face vermelha + selo no cabeçalho, com o botão "Por que este símbolo?" que leva aos fatos acima | Mais impacto visual. O PT não se declara partido comunista, então críticos dirão que é rótulo indevido. O botão de explicação reduz, mas não elimina, esse risco |
| `desligado` | Só o vermelho | — |

**Status jurídico** vira **carimbo em tinta sobre papel** (neutro), para não se confundir com o vermelho da esquerda. Sempre há texto e ícone, nunca só cor, por causa do daltonismo:

| Status | Tinta do carimbo | Ícone |
|---|---|---|
| Citado (delação/reportagem) | cinza `#6B7280` | 💬 |
| Investigado / indiciado | âmbar `#B7791F` | 🔍 |
| Denunciado / réu | laranja queimado `#C2410C` | ⚖ |
| Condenado (indicar a instância) | vinho `#7F1D1D` | ⛓ |
| Absolvido | verde `#047857` | ✓ |
| Anulado | roxo `#6D28D9` | ⊘ |
| Prescrito / arquivado | ardósia `#475569` | ⌛ |

> Todos os pares de cor serão validados para contraste WCAG AA nos dois temas.

### 7.3 Tipografia (todas gratuitas, licença OFL, hospedadas no próprio site)

| Papel | Fonte | Por quê |
|---|---|---|
| Títulos neutros e números | **Archivo** (variável, eixo de largura) | Impacto de pôster; o eixo de largura permite animar palavras "esticando" |
| Títulos da face vermelha | **Oswald** ou **Anton** | Condensadas pesadas, ar de cartaz construtivista |
| Títulos da face azul | **Fraunces** (variável) | Serifada clássica: tradição, solidez, ordem |
| Texto (as duas faces) | **Atkinson Hyperlegible Next** | Criada para máxima legibilidade, ideal para baixa visão e baixa escolaridade |
| Fontes, datas, carimbos | **JetBrains Mono** ou **IBM Plex Mono** | Ar de documento, protocolo, processo |

Texto do corpo com no mínimo 18 px no celular e títulos de capa entre 48 e 96 px.

### 7.4 Princípios de movimento

1. **Movimento com significado**: anima para explicar (número subindo, etapa do processo acendendo, marca-texto destacando) e nunca para enfeitar.
2. **Rápido**: 200–450 ms nas transições; nada atrasa a leitura.
3. **Respeita o usuário**: com `prefers-reduced-motion` ou no Modo Economia, as animações viram transições simples.
4. **Nativo primeiro**: rolagem com *scroll-snap* do CSS, transições com a View Transitions API e animações por rolagem em CSS onde o navegador suporta. A GSAP entra no que o CSS não faz.

**Catálogo de micro-interações:** **lançamento da moeda** (a tela sobe, gira com a borda serrilhada à mostra e aterrissa com vibração curta); contagem viva; marca-texto; carimbo; "virar a página" ao abrir a ficha da fonte; vibração leve (Vibration API, Android) ao acertar o quiz; brilho no selo de fonte na primeira vez que aparece; transição de "zoom" do selo para a ficha.

### 7.5 Acessibilidade (WCAG 2.2 AA como piso)

- Alvos de toque de pelo menos 48×48 px; tudo navegável por teclado e leitor de tela.
- Ícone sempre com texto; nenhuma informação transmitida só por cor.
- Botão **Ouvir** em todo post (leitura em voz alta).
- Busca por voz.
- **Modo Economia de Dados**: detectado automaticamente pelo cabeçalho `Save-Data` / `prefers-reduced-data` ou ativado manualmente. Desliga vídeos e animações pesadas e baixa imagens menores.

---

## 8. Linguagem para quem tem pouca instrução (sem subestimar ninguém)

Regras de redação (detalhes no protocolo):

- **Uma ideia por tela.** Frases com até 15 palavras. Voz ativa ("O STF anulou", e não "Foi anulado pelo STF").
- **Palavras do dia a dia.** Sigla só com explicação: "STF (o tribunal mais alto do país)".
- **Número sempre com comparação**: "12,5%, quase 4 vezes a média dos outros países".
- **Termos jurídicos com glossário embutido**: "réu" sublinhado explica "pessoa que responde a um processo; ainda não foi julgada".
- **Falar com "você".**
- **Áudio** em todos os posts. Na fase 1, voz do próprio navegador (`speechSynthesis`, gratuita e offline). Na fase 3, narração humana gravada nos 20 posts principais.
- **Teste real**: antes de publicar, ler o post para alguém do público-alvo e perguntar "o que você entendeu?".

---

## 9. IA: "Pergunta Aí"

### 9.1 Por que em fases

Uma IA que responde sobre política em ano eleitoral pode errar, inventar ou ser usada para gerar frases fora de contexto. Isso destruiria a credibilidade do site e geraria risco jurídico. Por isso a IA entra em degraus:

| Fase | O que é | Custo | Risco |
|---|---|---|---|
| **A: Perguntas guiadas** (sem IA) | Botões com as perguntas mais comuns ("Lula foi absolvido?", "O que foi o Mensalão?") que levam a respostas prontas e revisadas por humanos + busca por texto e voz no conteúdo do site (Pagefind) | Zero | Zero |
| **B: IA ancorada no site (RAG)** | A pessoa pergunta com as próprias palavras. A IA responde **somente com base no conteúdo já publicado e verificado do site**, sempre com selos de fonte. Se não houver base, responde "ainda não verificamos isso" e sugere posts próximos | Gratuito dentro da cota diária | Baixo, com as travas abaixo |
| **C: "Checar boato"** | A pessoa cola uma mensagem recebida no WhatsApp; a IA separa o que **tem** respaldo nas fontes do site, o que **contradiz** as fontes e o que **não temos como verificar** | Mesma cota | Baixo, com as travas |

### 9.2 Como funciona (fase B), sem "backend" para manter

"Sem backend" continua valendo no espírito: não há servidor nem banco de dados para administrar. O único detalhe é que a chave da IA não pode ficar no navegador (seria roubada), então usamos **uma função serverless da própria Cloudflare** (Worker), gratuita e sem manutenção.

```
[Celular] ──pergunta + verificação anti-robô (Turnstile)──▶ [Worker /api/pergunta]
    ▲                                                        │ 1. valida Turnstile + limite por minuto
    │                                                        │ 2. busca os trechos mais relevantes do SITE
    │                                                        │    (índice vetorial gerado no deploy)
    │                                                        │ 3. Workers AI escreve a resposta SÓ com esses trechos
    │                                                        │ 4. confere: toda frase tem [fonte]? senão → "não sei"
    └────────────── resposta curta + selos de fonte ◀────────┘
```

- **Índice**: no deploy, um script divide posts e fichas de fonte em trechos, gera *embeddings* (modelo multilíngue do Workers AI) e grava no Vectorize (índice vetorial da Cloudflare).
- **Modelo**: um modelo aberto do catálogo Workers AI com bom português. Escolher por teste comparativo com 30 perguntas reais.
- **Cota gratuita**: o Workers AI dá 10.000 "neurons"/dia no plano gratuito, o que dá na ordem de **dezenas a poucas centenas de respostas por dia**, dependendo do modelo. Para estender:
  - as 50–100 perguntas mais comuns viram **respostas prontas estáticas** (custo zero);
  - respostas repetidas ficam em **cache**;
  - quando a cota acaba, o site volta automaticamente para a Fase A.

### 9.3 Travas obrigatórias (prompt de sistema e validação)

1. Responder **apenas** com base nos trechos recuperados; proibido usar "conhecimento próprio".
2. Toda frase factual termina com o identificador de fonte; frase sem fonte é removida antes de exibir.
3. Usar exatamente o vocabulário de status jurídico do protocolo; nunca chamar alguém de criminoso sem condenação definitiva.
4. **Nunca recomendar voto nem ranquear candidatos.** As regras do TSE para 2026 proíbem sistemas de IA de sugerir em quem votar.
5. Não simular a fala de nenhuma pessoa real.
6. Resposta em até 120 palavras, linguagem simples, com botões "explica mais simples" e "quero o detalhe".
7. **Rótulo visível**: "Resposta gerada por inteligência artificial a partir do conteúdo verificado deste site. Confira as fontes."
8. Registro anônimo das perguntas sem resposta (sem dados pessoais) para virar **sugestão de pauta**.

> Recomendação: lançar a fase B **depois de revisão jurídica**, e não durante as últimas 72 horas antes da votação.

---

## 10. Arquitetura técnica

### 10.1 Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Gerador do site | **Astro** (última versão estável), saída 100% estática | HTML pronto, quase zero JavaScript por padrão, ótimo em celular fraco; *Content Collections* com validação de esquema |
| Componentes interativos | **Svelte 5** como "ilhas" | Runtime minúsculo, transições nativas, ótimo para animação |
| Animação | **GSAP 3** (ScrollTrigger, Flip, SplitText, Observer, Draggable, hoje 100% gratuitos) + CSS moderno (*scroll-snap*, animações por rolagem, View Transitions) | O melhor do mercado, com o nativo do navegador cuidando do pesado |
| Ilustrações animadas | **Rive** (ou Lottie) | Arquivos leves, animações interativas com estados |
| Teia | **Sigma.js + graphology**, com o layout calculado no build | WebGL rápido; o celular não precisa calcular a posição dos nós |
| Gráficos | SVG gerado **no build** a partir dos dados e animado no cliente | Zero custo de JS para desenhar; nítido em qualquer tela |
| Busca | **Pagefind** | Busca estática, índice fatiado (baixa pouco), suporte a português |
| Imagens | Astro Assets (sharp): AVIF/WebP responsivo | Leve para planos de dados limitados |
| Imagens para compartilhar | **Satori + resvg** no build | Gera automaticamente as imagens do Kit Zap e de prévia (Open Graph) de cada post |
| App instalável / offline | **PWA** (@vite-pwa/astro) | "Adicionar à tela inicial", leitura offline dos salvos |
| Estilo | CSS moderno com *design tokens* (camadas, container queries, `:has`, `oklch`) | Visual autoral, sem cara de template |
| Qualidade | TypeScript, ESLint, Prettier, Playwright, axe (acessibilidade), Lighthouse CI | Evita regressões |
| Hospedagem | **Cloudflare** (Workers com Static Assets, ou Pages) | Gratuito, CDN global, proteção anti-DDoS inclusa |
| IA (fase B/C) | Cloudflare Worker + Workers AI + Vectorize + Turnstile | Tudo no plano gratuito |
| Métricas | Cloudflare Web Analytics | Gratuito, sem cookies, compatível com a LGPD |

> **Na implementação (protótipo de out/2026):** tudo o que estava previsto para Svelte e GSAP foi resolvido com TypeScript puro, CSS nativo e Web Animations, sem nenhuma biblioteca no navegador (cerca de 8 KB de JavaScript comprimido). Svelte e GSAP continuam como opção se algum formato futuro (Teia, por exemplo) exigir.

### 10.2 Estrutura do repositório (proposta)

```
lulanao/
├─ docs/                         planejamento, protocolo, pautas
├─ src/
│  ├─ content/
│  │  ├─ posts/                  *.mdx  (um post = um assunto com 5 camadas)
│  │  ├─ fontes/                 *.yaml (uma ficha por fonte)
│  │  ├─ pessoas/                *.yaml
│  │  ├─ casos/                  *.yaml (etapas do processo + status)
│  │  ├─ eixos/                  *.yaml
│  │  ├─ moedas/                 *.mdx  (um tema = face vermelha + fatos + face azul)
│  │  ├─ glossario/              *.yaml
│  │  └─ quiz/                   *.yaml
│  ├─ content.config.ts          esquemas (Zod): "sem fonte, não compila"
│  ├─ components/
│  │  ├─ feed/                   Feed2D, Tela, TrilhoProgresso
│  │  ├─ navegacao/              Orbe, Bussola, BuscaVoz
│  │  ├─ moeda/                  Moeda3D, LadoALado, PlacarDosFatos, SuaMoeda, SeloComunista
│  │  ├─ fontes/                 SeloFonte, FichaFonte, ReciboFontes
│  │  ├─ formatos/               RastreioProcesso, Teia, LinhaDoTempo, Placar,
│  │  │                          DisseFez, QuantoCusta, AntesAgora,
│  │  │                          VerdadeiroFalso, RaioXDocumento, MapaBrasil
│  │  └─ acessibilidade/         ModoOuvir, Glossario, ModoEconomia
│  ├─ layouts/
│  ├─ pages/                     rotas do item 3.4
│  ├─ styles/                    tokens.css, base.css, movimento.css
│  └─ lib/                       status-juridico.ts, numeros.ts, datas.ts
├─ scripts/
│  ├─ arquivar-fontes.ts         gera links arquivados
│  ├─ gerar-kit-zap.ts           imagens 1080×1350 e 1080×1920 por post
│  ├─ gerar-teia.ts              calcula o layout da teia
│  ├─ indexar-ia.ts              (fase B) embeddings → Vectorize
│  └─ checar-links.ts
├─ worker/                       (fase B) API /api/pergunta
├─ public/
└─ wrangler.jsonc                configuração Cloudflare
```

### 10.3 Modelo de conteúdo (resumo dos esquemas)

> **Atualização (outubro de 2026):** o esquema abaixo é a proposta original. O esquema em uso, com posts em slides, está em `src/content.config.ts` e resumido no `README.md`.

**Post** (`src/content/posts/*.mdx`)

```yaml
titulo: "O povo disse NÃO"
slug: referendo-2005
eixo: direito-de-defesa
gancho: "63,94% votaram NÃO à proibição da venda de armas."   # ≤ 90 caracteres
resumo10s: "Em 2005, a maioria votou contra proibir a venda de armas."
formatos: [placar, linha-do-tempo]
quemDecidiu: [povo-referendo, executivo]
pessoas: [lula]
casos: []
afirmacoes:                     # cada afirmação PRECISA de ao menos 1 fonte
  - texto: "63,94% dos votos válidos foram NÃO."
    tipo: dado                  # fato | dado | declaracao | contexto | opiniao-do-site
    fontes: [tse-referendo-2005-resultado]
contraponto:
  texto: "Defensores de mais restrições argumentam que..."
  fontes: [fonte-x]
perguntaReflexao: "Regras que dificultam o acesso respeitam o resultado do referendo?"
risco: baixo                    # baixo | medio | alto (alto exige revisão jurídica)
atualizadoEm: 2026-10-07
revisadoPor: ["editor", "juridico"]
```

**Fonte** (`src/content/fontes/*.yaml`)

```yaml
id: tse-referendo-2005-resultado
tipo: dado-oficial        # decisao-judicial | documento-oficial | dado-oficial | reportagem |
                          # entrevista-video | artigo-academico | checagem | declaracao-oficial
nivel: A                  # A (primária/oficial) | B (imprensa profissional) | C (complementar)
veiculo: "Tribunal Superior Eleitoral"
titulo: "Referendo 2005 — resultado"
data: 2005-10-23
url: "https://..."
urlArquivo: "https://web.archive.org/..."
trecho: "texto literal citado"
localizador: "p. 3" | "12:41"   # página ou minutagem
acessadoEm: 2026-10-07
```

**Moeda** (`src/content/moedas/*.mdx`): o comparativo das duas faces

```yaml
tema: armas-e-legitima-defesa
eixo: direito-de-defesa
pergunta: "O cidadão comum deve poder ter arma para se defender?"
faceVermelha:                    # SÓ fontes do próprio campo: programa, lei, voto, fala literal
  sintese: "Menos armas em circulação, mais controle do Estado."
  posicoes:
    - texto: "..."
      tipo: documento            # documento | lei | voto | declaracao
      fontes: [decreto-11615-2023]
  simbolo: false                 # true só com vínculo comunista documentado (fonte obrigatória)
placarDosFatos:                  # neutro; inclui dados que incomodam qualquer lado
  - texto: "63,94% votaram NÃO à proibição da venda de armas (2005)."
    fontes: [tse-referendo-2005-resultado]
faceAzul:
  sintese: "Defender a própria vida e a da família é um direito."
  valores: [legitima-defesa, respeito-ao-referendo, certeza-da-punicao]
  fundamentos: [constituicao-art-5, codigo-penal-art-25]   # leis, pensadores, evidências
  posicoes:
    - texto: "..."
      fontes: [...]
  limites: "Onde as evidências são discutidas: ..."         # honestidade obrigatória
```

Em **todos** os posts, cada afirmação também ganha o campo `face: vermelha | azul | neutra`, que define a cor em que ela aparece.

**Caso** (`src/content/casos/*.yaml`): nome, operação, período, acusação em linguagem simples, envolvidos (cada um com papel e **status individual**), `etapas[]` (data, tipo, órgão, fonte), `statusAtual`, `oQueSeSabe`, `oQueNaoSeSabe`, `oQueDizADefesa`.

**Pessoa** (`src/content/pessoas/*.yaml`): nome, cargos (com período e fonte), partido, **vínculo com Lula descrito como fato documentado** ("foi ministro da Casa Civil de 2003 a 2005"), casos.

**Validação no build**: o esquema Zod faz o build **falhar** se algum post tiver uma afirmação sem fonte, um status jurídico fora do vocabulário, um post de risco "alto" sem revisão jurídica, uma fonte sem link arquivado, uma posição da face vermelha sem fonte nível A do próprio campo, um ☭ sem fonte do vínculo comunista ou uma face azul sem o campo `limites`.

### 10.4 Orçamento de desempenho

| Métrica | Meta (celular de entrada, 4G lento) |
|---|---|
| JavaScript inicial | ≤ 90 KB comprimido |
| Peso da primeira tela | ≤ 500 KB |
| LCP | ≤ 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| Lighthouse (Performance, Acessibilidade, Boas práticas, SEO) | ≥ 95 |

Técnicas: ilhas carregadas só quando visíveis, fontes com subconjunto latino, imagens AVIF, prefetch do próximo post do feed e *service worker* para leituras repetidas.

### 10.5 Compartilhamento: o **Kit Zap**

Cada post gera automaticamente, no build:

- **Imagem de feed** (1080×1350) e **imagem de status/stories** (1080×1920) com a mensagem principal, a fonte impressa ("Fonte: TSE, 2005") e o endereço curto `lulanao.com.br/p/...`;
- **Texto pronto** para colar, com a fonte e o link;
- Botão **"Mandar no WhatsApp"** (Web Share API, com `wa.me` como alternativa);
- Prévia de link (Open Graph) desenhada, e não a genérica.

> Princípio: **a fonte viaja junto com a mensagem.** Quem recebe o print sem abrir o link continua vendo de onde veio o dado.

### 10.6 Privacidade e segurança

- **Sem cookies e sem coleta de dados pessoais**: salvos e preferências ficam só no aparelho. Página de privacidade simples.
- Cabeçalhos de segurança (CSP restritiva, HSTS, `X-Content-Type-Options`, `Referrer-Policy`) via arquivo `_headers`.
- Nenhum script de terceiros além da métrica da Cloudflare.
- **Autenticação em 2 fatores** em GitHub, Cloudflare e Registro.br; **DNSSEC** ativado; branch `main` protegida.
- Site estático é muito difícil de "hackear": não há banco nem login. A proteção anti-DDoS da Cloudflare (gratuita) cobre ataques de tráfego, que são comuns em sites políticos.

---

## 11. Publicação gratuita na Cloudflare (passo a passo)

1. **Conta Cloudflare** (plano Free) → *Add a site* → `lulanao.com.br`. A Cloudflare mostra **2 nameservers**.
2. **Registro.br** → seu domínio → *Alterar servidores DNS* → colar os 2 nameservers da Cloudflare. A propagação leva de minutos a 48 h.
3. **DNSSEC**: ativar na Cloudflare e copiar o registro DS para o Registro.br.
4. **Deploy**: *Workers & Pages* → *Create* → importar o repositório do GitHub (`thmsagc/lulanao`). Build: `npm run build`; saída: `dist`. A cada `git push` na `main`, o site é publicado sozinho; outros branches geram endereços de pré-visualização.
5. **Domínio**: adicionar `lulanao.com.br` e `www.lulanao.com.br`; regra de redirecionamento `www` → domínio principal.
6. **HTTPS**: SSL "Full (strict)" (automático), *Always Use HTTPS*, HSTS.
7. **E-mail grátis**: *Email Routing* → `contato@lulanao.com.br` e `correcoes@lulanao.com.br` encaminhados para o seu e-mail pessoal (para direito de resposta e correções).
8. **Métricas**: ativar *Web Analytics*.
9. **Proteção**: *Bot Fight Mode*, regras gerenciadas do WAF (gratuitas) e, na fase B, limite de requisições para `/api/pergunta` + Turnstile.

**Limites do plano gratuito** (conferidos em out/2026): arquivos estáticos com requisições ilimitadas; 100 mil execuções/dia de Workers (só a IA usaria); 500 builds/mês; 10 mil neurons/dia de Workers AI. Para este projeto, **custo zero**.

---

## 12. Contexto eleitoral e jurídico (resumo)

Hoje (07/10/2026) o país está **entre o 1º e o 2º turno**: a votação final é em **25/10/2026**, e Lula disputa com Flávio Bolsonaro. Um site com este conteúdo, publicado agora, é manifestação política em período eleitoral e está sujeito à Lei 9.504/97 e à Resolução TSE 23.610/2019, alterada para 2026 pela **Resolução TSE 23.755/2026**. Os pontos práticos (detalhes e checklist no protocolo):

- **Identificação do responsável**: o anonimato é vedado (Constituição, art. 5º, IV). As regras de 2026 tratam como anônimo o perfil sem contato do responsável. O site terá **expediente** com nome e contato.
- **Sem impulsionamento pago**: pessoa física não pode pagar para impulsionar propaganda eleitoral; só candidatos e partidos podem.
- **Sem disparo em massa** de mensagens.
- **IA**: conteúdo gerado ou alterado por IA precisa de **rótulo**; deepfakes são proibidos; nas **72 h antes e 24 h depois** da votação é proibido circular conteúdo novo feito com IA que altere imagem ou voz de candidatos; sistemas de IA **não podem sugerir em quem votar**.
- **Conteúdo sabidamente falso ou descontextualizado** pode ser removido por ordem da Justiça Eleitoral e gerar multa. O protocolo editorial existe exatamente para isso não acontecer.
- **Fora do período eleitoral** continuam valendo os crimes contra a honra (calúnia, difamação, injúria), o direito de resposta (Lei 13.188/2015) e a equiparação da homotransfobia ao crime de racismo pelo STF (ADO 26 / MI 4733, 2019). Daí a regra de **criticar políticas e atos, nunca a identidade das pessoas**.

> ⚠️ Este planejamento não substitui um advogado. **Recomendo fortemente revisão jurídica** dos dossiês do eixo "Os Casos" antes de publicar.

---

## 13. Cronograma

| Fase | Duração estimada | Entregas |
|---|---|---|
| **0: Fundação** | 2–3 dias | Projeto Astro, deploy na Cloudflare, DNS e e-mail, *design tokens*, esquemas de conteúdo com validação, páginas Sobre/Expediente/Privacidade |
| **1: MVP "Feed em Camadas"** | ~2 semanas | Feed 2D com gestos, Orbe e Bússola, Selo/Ficha/Recibo/Biblioteca de fontes, **Rastreio do Processo**, **Placar**, **Contagem Viva**, **Vire a Moeda** (com Placar dos Fatos e Selo ☭), Kit Zap, Modo Ouvir, busca com voz, PWA, métricas. **12 posts** em 3 eixos (Os Casos, Escola em Ruínas, Direito de Defesa) + **3 moedas** (Segurança, Educação, Economia) |
| **2: Profundidade** | semanas 3–6 | Os 8 eixos restantes (30–40 posts) e **as demais moedas** (Saúde, Família, Religião, Igualdade, Propriedade...), Lado a Lado, Sua Moeda, Linha do Tempo, Teia, Verdadeiro ou Falso, Disse × Fez, Quanto Custa, Antes × Agora, Raio-X dos Planos de Governo, Placar de votações da Câmara, glossário, layout "Mesa de Investigação" no desktop |
| **3: IA e voz** | semanas 6–10 | Pergunta Aí (fase B, após revisão jurídica), Checar Boato (fase C), narração humana dos 20 posts principais |
| **Contínuo** | sempre | Revisão mensal de status jurídico, verificação semanal de links, errata, novas pautas |

> **Se o objetivo for ter algo no ar antes de 25/10**: um "lançamento relâmpago" com a Fase 0 + o essencial da Fase 1 (feed, fontes, Kit Zap) e **6 a 8 posts muito bem checados** é viável. Qualidade acima de quantidade: um erro nessa reta final custaria mais do que dez posts acrescentariam.

---

## 14. Como medir se está funcionando

| Indicador | O que revela |
|---|---|
| **Taxa de checagem** (% de visitas que abrem ≥ 1 fonte) | Se o site está cumprindo a promessa de transparência |
| **Profundidade média** (camadas vistas por post) | Se o conteúdo prende e aprofunda |
| **Downloads do Kit Zap / compartilhamentos** | Alcance real no WhatsApp |
| **Retorno em 7 dias** | Se virou referência |
| **Correções por mês** (meta: poucas, todas públicas) | Qualidade editorial |
| **Core Web Vitals** | Se o site é rápido para quem tem celular simples |

---

## 15. Riscos e como reduzi-los

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Processo por difamação ou pedido de direito de resposta | Média | Protocolo editorial, vocabulário jurídico exato, "Outro lado" obrigatório, revisão jurídica nos posts de risco alto, canal de correções |
| Remoção pela Justiça Eleitoral | Média no período eleitoral | Cumprir o checklist eleitoral; nada sem fonte; nada de IA sem rótulo |
| Um erro factual viralizar contra o site | Média | "Sem fonte, não compila", dupla checagem, errata pública e rápida |
| Ser rotulado como "panfleto partidário" | Alta | Contrapontos reais, fontes de linhas editoriais diferentes, dados oficiais do próprio governo, boatos dos dois lados no quiz, face vermelha **nas palavras da própria esquerda**, Placar dos Fatos que inclui dados incômodos para a direita |
| Símbolo ☭ contestado como "rótulo falso" | Média (alta no modo `sempre`) | Modo `ancorado`: símbolo só onde há vínculo comunista documentado, com fonte ao tocar |
| Ataque de tráfego (DDoS) / tentativa de invasão | Média | Site estático + Cloudflare + 2FA + DNSSEC |
| Links de fontes quebrando ou atrás de paywall | Alta | Arquivamento automático + trecho literal na ficha |
| Uso de imagem sem licença | Média | Só imagens com licença (Agência Brasil, Agências Senado/Câmara, Wikimedia Commons, próprias), sempre com crédito |
| Cota de IA esgotar | Alta (se viralizar) | Respostas prontas, cache e queda automática para a Fase A |
| Conteúdo desatualizado (status de processos muda) | Alta | Data de verificação visível + revisão mensal agendada |

---

## 16. Decisões que preciso de você

1. **Prazo**: queremos lançar algo antes do 2º turno (25/10) ou construir com calma o projeto completo?
2. **Expediente**: quem aparece como responsável (nome ou pessoa jurídica) e qual e-mail de contato?
3. **Revisão jurídica**: há um advogado que possa revisar os dossiês do eixo "Os Casos"?
4. **Voz**: narração humana (a sua voz, por exemplo) nos posts principais, ou só a voz sintética do navegador?
5. **Imagens**: existe acervo próprio de fotos (escolas, universidades)? Caso contrário, usamos acervos públicos licenciados e ilustrações.
6. **IA**: aprova o uso de uma função serverless gratuita da Cloudflare para a fase B (necessária para proteger a chave da IA)?
7. **Marca**: o nome exibido será "Lula Não"? Gostou do lema "Fatos com fonte. Conclusão sua."?
8. **Símbolo ☭**: modo `ancorado` (recomendado) ou `sempre`? (item 7.2)
