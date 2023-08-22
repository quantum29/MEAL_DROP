const express =require('express')
const config = require('../config')
const app = express()

const verifyAuth = require('../authentication/authMiddleware')
const custRouter = require('./customerRouter')


app.use(express.json())

app.use('/customer',verifyAuth,custRouter)

app.use((req, res, next) => {
  //error middleware
  res.status(400).send('Resource not found')
})



app.listen(5001,()=>{
    console.log('listening....')
}) 