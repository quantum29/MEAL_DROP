const express = require('express')
const config = require('../config.js')
const app = express()

const verifyAuth = require('../authentication/authMiddleware.js')
const dPartnerRouter = require('.dPartnerRouter.js')

app.use(express.json())

const dPartner = require('./dPartnerModel')
const dPartnerService = require('./dPartnerService')

// UNPROTECTED ROUTES :- open routes
app.get('/mealDrop/alldPartners', async (req, res) => {  
  dPartnerService.getAlldPartners(dPartner, (err, data) => {
    if (err) {
      return res.status(400).send('error retrieving all dPartners')
    }

    if (data.length === 0) {
      return res.send(200).send('no dPartner has been registered with us yet')
    }

      const result = data.map((dpart) => {
      const { name,occupied , phoneNumber } = dpart
      return { name, occupied,  phoneNumber }
    })

    return res.status(200).send(result)
  })

  // use try catch block here (update in restaurant app as well)
})

const productService = require('../product/productService.js')
const product = require('../product/productModel.js')

app.get('/mealDrop/dPartner/:id', async (req, res) => {
  try {
    const dPartnerId = req.params.id
    dPartnerController.getdPartnerById(
      dPartner,
      dPartnerId,
      (err, result) => {
        if (err) {
          return res.status(400).send('error getting dPartner', err)
        }

        const product = productService.getProductBydPartner(product,dPartnerId,(err, data) => {
        if (err) {
          return res.status(400).send('error getting dPartner', err)
        }
        return res.status(200).send({result,data})
        })
      })
  } catch (err) {
    res.status(500).send({ error: err })
    console.log(err)
  }
})


app.use('/dPartner', verifyAuth, dPartnerRouter)

// app.use((req, res, next) => {
//   //error middleware
//   res.status(400).send('Resource not found')
// })

app.listen(config.PORT, () => {
  console.log('listening....')
})
