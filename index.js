const express = require('express')
const app = express()

const goalRoutes = require('./src/routes/goal')

app.use(express.json())

app.use('/api/goal', goalRoutes)


const port = process.env.POST || 3000
app.listen(port, () => {
  console.log('Conectado...');
})
