const express = require('express')
const router = express.Router()

const authController = require('./authController')


router.post('/register', (req, res) => {
  try{
  const {name , email,password,address} = req.body;

  if (!(name && email && password && address)) {
    return res.status(400).send({ error: 'inputs are missing' })
  }

  const customerData = { name, email, password, address }

  authController.registerCustomer(customerData, (err, result) => {
    if (err) {
      return res.status(400).send({ error: err })
    } else {
      return res.status(200).send(result)
    }
  })

  }catch(err){
      return res.status(400).send({error:"uNEXPECTED ERROR WHILE REGISTERING USER"})
  }
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!(email && password)) {
    return res.status(400).send({ error: 'Required inputs are missing' })
  }

  authController.loginCustomer({ email, password }, (err, result) => {
    if (err) {
      return res.status(400).send({ error: 'INVALID CREDENTIALS', err })
    } else {
      res.status(200).send({ jwtToken: result })
    }
  })
})

module.exports = router
