const express = require('express')
const app = express()
const port = 3000

const routerTeamGoal = require('./src/routes/teamGoal')

app.use(express.json())

app.use('/goal', routerTeamGoal)

app.listen(port, () => {
  console.log('Conectado...');
})
