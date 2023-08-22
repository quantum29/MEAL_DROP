const express = require('express')
const router = express.Router()

const authController = require('./authController')


router.post('/register', (req, res) => {
  try{

  // const occupied = false;
  const {name , email,password,phoneNumber } = req.body;
  const occupied = false

  if (!(name && email && password && phoneNumber)) {
    return res.status(400).send({ error: 'inputs are missing' })
  }

  const dPartnerData = { name, email, password, phoneNumber ,occupied ,deliveryDone: 0 }

  authController.registerDPartner(dPartnerData, (err, result) => {
    if (err) {
      return res.status(400).send({ error: err })
    } else {
      return res.status(200).send(result)
    }
  })

  }catch(err){
      return res.status(400).send({error:"uNEXPECTED ERROR WHILE REGISTERING dPartner"})
  }
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!(email && password)) {
    return res.status(400).send({ error: 'Required inputs are missing' })
  }

  authController.loginDPartner({ email, password }, (err, result) => {
    if (err) {
      return res.status(400).send({ error: 'INVALID CREDENTIALS', err })
    } else {
      res.status(200).send({ jwtToken: result })
    }
  })
})

module.exports = router
