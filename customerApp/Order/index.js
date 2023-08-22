const express = require('express')
const config = require('../config')
const app = express()

const verifyAuth = require('../authentication/authMiddleware')
const orderRouter = require('./orderRouter')


require('./consumer.js')

app.use(express.json())

app.use('/order', verifyAuth, orderRouter)

// app.use((req, res, next) => {
//   res.status(400).send('Resource not found')
// })


//**********************************************************************************
app.listen(5002, () => {       // change to individual ports for each service
  console.log('listening....')
})
