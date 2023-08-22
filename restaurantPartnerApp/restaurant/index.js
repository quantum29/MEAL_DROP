const express = require('express')
const config = require('../config.js')
const app = express()

const verifyAuth = require('../authentication/authMiddleware.js')
const restaurantRouter = require('./restaurantRouter.js')

app.use(express.json())

const restaurant = require('./restaurantModel')
const restaurantService = require('./restaurantService')


app.get('/mealDrop/allRestaurants', async (req, res) => {
  restaurantService.getAllRestaurants(restaurant, (err, data) => {
    if (err) {
      return res.status(400).send('error retrieving all restaurants')
    }

    if (data.length === 0) {
      return res.send(200).send('no restaurant has been registered with us yet')
    }

    const result = data.map((rest) => {
      const { name, email, address, contactNumber } = rest
      return { name, email, address, contactNumber }
    })

    return res.status(200).send(result)
  })
})

const productService = require('../product/productService.js')
const product = require('../product/productModel.js')

app.get('/mealDrop/restaurant/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id
    restaurantController.getRestaurantById(
      restaurant,
      restaurantId,
      (err, result) => {
        if (err) {
          return res.status(400).send('error getting restaurant', err)
        }

        const product = productService.getProductByRestaurant(product,restaurantId,(err, data) => {
        if (err) {
          return res.status(400).send('error getting restaurant', err)
        }
        return res.status(200).send({result,data})
        })
      })
  } catch (err) {
    res.status(500).send({ error: err })
    console.log(err)
  }
})


app.use('/restaurant', verifyAuth, restaurantRouter)

// app.use((req, res, next) => {
//   //error middleware
//   res.status(400).send('Resource not found')
// })

app.listen(config.PORT, () => {
  console.log('listening....')
})
