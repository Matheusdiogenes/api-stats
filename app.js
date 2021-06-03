'use strict'
import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    hello: 'woorld'
  })
})

app.listen(3000, () => console.log(`http://localhost:3000`))

