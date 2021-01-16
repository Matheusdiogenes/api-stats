const express = require('express')
const app = express()
const port = 3000

const routerTimeGols = require('./src/routes/timeGols')

app.use(express.json())

app.use('/gols', routerTimeGols)

app.listen(port, () => {
  console.log('Conectado...');
})
