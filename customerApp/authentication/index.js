const express = require('express')
const app = express()
const config = require('../config')
const authRouter = require('./authRouter')

app.use(express.json())

app.use('/auth', authRouter)

app.listen(5000, () => {
  console.log('listening....')
})
