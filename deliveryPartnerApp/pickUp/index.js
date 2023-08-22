const express = require('express')
const config = require('../config.js')
const app = express()

const verifyAuth = require('../authentication/authMiddleware.js')
const pickUpRouter = require('./pickUpRouter.js')

app.use(express.json())
app.use('/pickUp', verifyAuth, pickUpRouter)

app.listen(config.PORT, () => {  // allot a different port number for this since its a seperate service
  console.log('listening....')
})

