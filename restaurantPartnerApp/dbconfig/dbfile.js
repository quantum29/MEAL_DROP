const express = require('express')
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/resaurantPartnerDb'
const app = express()

mongoose.connect(url,{useNewUrlParser : true})

const connection = mongoose.connection

connection.on('open',()=>{
    console.log('Connected...')
})

app.use(express.json())