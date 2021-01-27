const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const goalRoutes = require('./src/routes/goal')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/',(req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/api/goal', goalRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
