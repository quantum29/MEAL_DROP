const express = require('express')
const app = express()

const authRouter = require('./authRouter')

app.use(express.json())

app.use('/auth', authRouter)

app.listen(5001, () => {
  console.log('listening....')
})
