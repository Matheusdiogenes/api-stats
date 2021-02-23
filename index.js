const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const info = require('./src/infoJson/info.json')
const competitionRoutes = require('./src/routes/byDomainRouter')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (req, res) => {
  const result = 'welcome to FOOTBALL BET API'
  res.status(200).json(result)
  
})



app.get('/api/league', (req, res) => {
  const result = info.competition.map(ele => `Country: ${ele.country} - Leagues: ${ele.leagues.map(e => ` (${e.nome} -> ID: ${e.leagueID})`)}`)
  res.status(200).json(result)
  
})

app.use('/api', competitionRoutes)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
