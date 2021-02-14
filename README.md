# API STATS

## Routes

### Fulltime

> GET /api/fulltime

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando jogos como mandante e visitante.

> GET /api/fulltime/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante e visitante.

Exemplo: /api/fulltime/juventus/10

> GET /api/fulltime/home

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os  como mandante.

> GET /api/fulltime/home/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante.

> GET /api/fulltime/away

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os  jogos como visitante.

> GET api/fulltime/away/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como visitante.

### Halftime

> GET api/halftime

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os jogos como mandante e visitante no Primeiro Tempo.

> GET api/halftime/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante e visitante no Primeiro Tempo.

> GET api/halftime/home

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os jogos como mandante no Primeiro Tempo.

> GET api/halftime/home/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante no Primeiro Tempo.

> GET api/halftime/away

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os jogos como visitante no Primeiro Tempo.

> GET api/halftime/away/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como visitante no Primeiro Tempo.

### Over & Under

> GET api/overunder/ft

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols

> GET api/overunder/ft/:team/:latest

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols. Considerando o time Y nos últimos Z jogos.

> GET api/overunder/ht

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols. Considerando somente o Primeiro Tempo.

> GET api/overunder/ht/:team/:latest

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols. Considerando somente o Primeiro Tempo do time Y nos últimos Z jogos.

### Both Teams To Score - btts

> GET api/btts

Resposta: Quantidade de jogos que Ambas Equipes Marcaram.

> GET api/btts/:team/:latest

Resposta: Quantidade de jogos que Ambas Equipes Marcaram do Time X nos últimos Y jogos.

### Extras

> GET api/info/:team/:latest

Resposta: Visão geral sobre o Time X.

> GET /info/:teamHome/:teamAway/:latest

Resposta: Comparando duas Equipes.

**Nota:** Repositório em constante melhora.
