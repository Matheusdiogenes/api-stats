const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const cornerRoutes = require('./src/routes/corner.router')
const usefulRoutes = require('./src/routes/useful.router')

app.use(cors())
app.use(bodyParser.json())
app.use( bodyParser.urlencoded( { extended: true, } ) )

app.get('/', (req, res) => {
  const result = 'welcome to FOOTBALL BET API'
  res.status(200).json(result)  
})

app.use('/api', cornerRoutes) 
app.use('/api', usefulRoutes)

const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`App running: http://localhost:${port}/`)
})
