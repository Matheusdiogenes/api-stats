# CORNERS API

API de estísticas de Corners dos melhores campeonatos do mundo.

## Como utilizar a API

Para usar a API, utilize:

> footballbet-api.herokuapp.com/api/{ENDPOINT}

## Endpoint

| endpoint  | return  |
|---|---|
|league  | Campeonatos disponiveis  |
|team/{leagueID} |  Todas as equipes de um campeonato   |
|matche/{leagueID}/{team} | Obtem os jogos de uma equipe. Não considerando o mando de campo    |
|matche/{leagueID}/{team}/{domain}/{matche} | Obtem os últimos jogos de uma equipe. Considerando o mando de campo |
|corner/{leagueID} | Média de corneilizers de todas as equipes de um campeonato    |
|corner/halftime/{leagueID} |  Média de corners no Primeiro Tempo de todas as equipes de um campeonato    |
|corner/halftime/{leagueID}/{domain} | Média de corners no Primeiro Tempo de todas as equipes de um campeonato. Considerando o mando de campo  |
|corner/{leagueID}/{team}/{matche} | Média de corners de uma equipe de um campeonato. Considerando os últimos X jogos|
|corner/{leagueID}/{domain} | Média de corners de todas as equipes de um campeonato. Considerando o mando de campo |
|corner/{leagueID}/{domain}/{team}/{matche}| Média de corners de todas as equipes de um campeonato. Considerando o mando de campo e os últimos X jogos |

## Parameters

### GET

| parameter  | value  |  description | data type |
|---|---|---|---|
|leagueID| required | ID do campeonato. exemplo: ita-sa | string |
|team| required | Nome da equipe. exemplo: ac-milan | string |
|domain| required | Mando de campo. exemplo: home OU away | string |
|matche| required | Número de jogos, começando do mais recente. | integer |
