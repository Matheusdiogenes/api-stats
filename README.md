# API STATS

API de estísticas de futebol. Para exemplificar o uso, ultizaremos a Juventus e o AC Milan.

## Campeonato(s) disponíveis

- Italia - Serie A

**Nota:**  Se o nome do time conter espaços, colocaremos o `-` no lugar do espaço.

## Routes

### Times disponíveis

> GET footballbet-api.herokuapp.com/api/info/teams

### Fulltime

> GET footballbet-api.herokuapp.com/api/fulltime

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando jogos como mandante e visitante.

> GET footballbet-api.herokuapp.com/api/fulltime/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante e visitante.

Exemplo: footballbet-api.herokuapp.com/api/fulltime/Juventus/10

> GET footballbet-api.herokuapp.com/api/fulltime/home

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os  como mandante.

> GET footballbet-api.herokuapp.com/api/fulltime/home/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante.

Exemplo: footballbet-api.herokuapp.com/api/fulltime/home/Juventus/8

> GET footballbet-api.herokuapp.com/api/fulltime/away

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os  jogos como visitante.

> GET footballbet-api.herokuapp.com/api/fulltime/away/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como visitante.

Exemplo: footballbet-api.herokuapp.com/api/fulltime/away/Juventus/5

### Halftime

> GET footballbet-api.herokuapp.com/api/halftime

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os jogos como mandante e visitante no Primeiro Tempo.

> GET footballbet-api.herokuapp.com/api/halftime/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante e visitante no Primeiro Tempo.

Exemplo: footballbet-api.herokuapp.com/api/halftime/Juventus/7

> GET footballbet-api.herokuapp.com/api/halftime/home

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os jogos como mandante no Primeiro Tempo.

> GET footballbet-api.herokuapp.com/api/halftime/home/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como mandante no Primeiro Tempo.

footballbet-api.herokuapp.com/api/halftime/home/Juventus/4

> GET footballbet-api.herokuapp.com/api/halftime/away

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os jogos como visitante no Primeiro Tempo.

> GET footballbet-api.herokuapp.com/api/halftime/away/:team/:latest

Resposta: Número de Jogos, Vitorias, Empates, Derrotas, Média de gols feitos, sofridos e por jogo. Considerando os últimos X jogos como visitante no Primeiro Tempo.

Exemplo: footballbet-api.herokuapp.com/api/halftime/away/ac-milan/9

### Over & Under

> GET footballbet-api.herokuapp.com/api/overunder/ft

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols

> GET footballbet-api.herokuapp.com/api/overunder/ft/:team/:latest

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols. Considerando o time Y nos últimos Z jogos.

Exemplo: footballbet-api.herokuapp.com/api/overunder/ft/ac-milan/10

> GET footballbet-api.herokuapp.com/api/overunder/ht

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols. Considerando somente o Primeiro Tempo.

> GET footballbet-api.herokuapp.com/api/overunder/ht/:team/:latest

Resposta: Quantidade de jogos acima de X gols e abaixo de X gols. Considerando somente o Primeiro Tempo do time Y nos últimos Z jogos.

Exemplo: footballbet-api.herokuapp.com/api/overunder/ht/ac-milan/10

### Both Teams To Score - btts

> GET footballbet-api.herokuapp.com/api/btts

Resposta: Quantidade de jogos que Ambas Equipes Marcaram.

> GET footballbet-api.herokuapp.com/api/btts/:team/:latest

Resposta: Quantidade de jogos que Ambas Equipes Marcaram do Time X nos últimos Y jogos.

Exemplo: footballbet-api.herokuapp.com/api/btts/ac-milan/5

### Extras

> GET footballbet-api.herokuapp.com/api/info/:team/:latest

Resposta: Visão geral sobre o Time X.

Exemplo: footballbet-api.herokuapp.com/api/info/ac-milan/7

> GET footballbet-api.herokuapp.com/api/info/:teamHome/:teamAway/:latest

Resposta: Comparando duas Equipes.

Exemplo: footballbet-api.herokuapp.com/api/info/Juventus/ac-milan/7

**Nota:** Repositório em constante melhora.
