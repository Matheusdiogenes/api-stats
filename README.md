:warning: Em Manutenção

# FOOTBALL-BET API

API de estísticas de futebol dos melhores campeonatos do mundo.

**Nota:**  Se o nome do time conter espaços, colocaremos o `-` no lugar do espaço.

 Exemplo: AC Milan = AC-Milan

## Routes

> footballbet-api.herokuapp.com/api/league

Todas as ligas disponíveis da API.

> footballbet-api.herokuapp.com/api/general/goal/:leagueID

Parâmetros:
`leagueID`: Nome do campeonato

> footballbet-api.herokuapp.com/api/general/goal/:leagueID/:team/:matche

Parâmetros:
`leagueID`: Nome do campeonato
`team`: Nome da equipe
`matche`: Considerar o(s) ultimo(s) X jogo(s)

> footballbet-api.herokuapp.com/api/general/corner/:leagueID

Parâmetros:
`leagueID`: Nome do campeonato

> footballbet-api.herokuapp.com/api/general/corner/:leagueID/:team/:matche

Parâmetros:
`leagueID`: Nome do campeonato
`team`: Nome da equipe
`matche`: Considerar o(s) ultimo(s) X jogo(s)

> footballbet-api.herokuapp.com/api/bydomain/info/:leagueID/:domain

Parâmetros:
`leagueID`: Nome do campeonato
`domain`: **home/away**

> footballbet-api.herokuapp.com/api/bydomain/defense/:leagueID/:domain

Parâmetros:
`leagueID`: Nome do campeonato
`domain`: **home/away**

> footballbet-api.herokuapp.com/api/bydomain/attack/:leagueID/:domain

Parâmetros:
`leagueID`: Nome do campeonato
`domain`: **home/away**

> footballbet-api.herokuapp.com/api/bydomain/corner/:leagueID/:domain

Parâmetros:
`leagueID`: Nome do campeonato
`domain`: **home/away**

> footballbet-api.herokuapp.com/api/bydomain/corner/:leagueID/:domain/:team/:matche

Parâmetros:
`leagueID`: Nome do campeonato
`domain`: **home/away**
`team`: Nome da equipe
`matche`: Considerar o(s) ultimo(s) X jogo(s) em **home/away**
