const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const info = require('./src/infoJson/info.json')
const byDomainRoutes = require('./src/routes/byDomainRouter')
const generalRoutes = require('./src/routes/generalRouter')

app.use(cors())
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

app.use('/api/bydomain', byDomainRoutes)
app.use('/api/general', generalRoutes)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
