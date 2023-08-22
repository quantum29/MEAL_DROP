const express = require('express')
const router = express.Router()

const authController = require('./authController')


router.post('/register', (req, res) => {
  try{
  const {name , email,password,address} = req.body;

  if (!(name && email && password && address)) {
    return res.status(400).send({ error: 'inputs are missing' })
  }

  const restaurantData = { name, email, password, address, credit:0 }

  authController.registerRestaurant(restaurantData, (err, result) => {
    if (err) {
      return res.status(400).send({ error: err })
    } else {
      return res.status(200).send(result)
    }
  })

  }catch(err){
      return res.status(400).send({error:"uNEXPECTED ERROR WHILE REGISTERING Restaurant"})
  }
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!(email && password)) {
    return res.status(400).send({ error: 'Required inputs are missing' })
  }

  authController.loginRestaurant({ email, password }, (err, result) => {
    if (err) {
      return res.status(400).send({ error: 'INVALID CREDENTIALS', err })
    } else {
      res.status(200).send({ jwtToken: result })
    }
  })
})

module.exports = router
