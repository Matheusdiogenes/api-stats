const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const routerGoal = require('./src/routes/teamGoal')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/goal', routerGoal)

app.listen(port, () => {
  console.log('Conectado...');
})
