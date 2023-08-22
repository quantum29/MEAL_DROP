const express = require('express')
const config = require('../config.js')
const app = express()

const verifyAuth = require('../authentication/authMiddleware.js')
const productRouter = require('./productRouter.js')
const productService = require('./productService.js')
app.use(express.json())

// app.post('/mealDrop/allProducts', async (req, res) => {
//   try {
//     const newproduct = new product({ ...req.body })
//     productService.saveproduct(newproduct, (err, result) => {
//       if (err) {
//         return res
//           .status(400)
//           .send({ error: 'error while saving product', err })
//       }

//       return res.status(200).send(result)
//     })
//   } catch (err) {
//     console.log(err)
//     return res.status(500).send({ error: 'error while saving product', err })
//   }
// })

router.get('/mealDrop/product/:id', async (req, res) => {
  try {
    const productId = req.params.id
    productService.getProductById(product, productId, (err, result) => {
      if (err) {
        return res.status(400).send('error getting product', err)
      }

      return res.status(200).send(result)
    })
  } catch (err) {
    res.status(500).send({ error: err })
    console.log(err)
  }
})

app.get('/mealDrop/allProducts', async (req, res) => {
  try {
    
    productService.getAllProducts(product, (err, result) => {
      if (err) {
        return res
          .status(400)
          .send({ error: 'error while fetching product', err })
      }

      return res.status(200).send(result)
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ error: 'error while fetching product', err })
  }
})


app.use('/product', verifyAuth, productRouter)

// app.use((req, res, next) => {
//   //error middleware
//   res.status(400).send('Resource not found')
// })

app.listen(config.PORT, () => {
  console.log('listening....')
})
