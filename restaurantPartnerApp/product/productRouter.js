const express = require('express')

const router = express.Router()

const productController = require('./productController')
const product = require('./productModel')

router.post('/', async (req, res) => {
  try {
    const newproduct = new product({ ...req.body })
    productController.saveproduct(newproduct, (err, result) => {
      if (err) {
        return res.status(400).send({ error: 'error while saving product', err })
      }

      return res.status(200).send(result)
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ error: 'error while saving product', err })
  }
})

router.get('/', async (req, res) => {  // fetches all product created by the restaurant
  try {
   const {restaurantId} = req.body; 
    productController.getProductByRestaurant(product,restaurantId, (err, result) => {
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

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id
    productController.getProductById(product, productId, (err, result) => {
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


router.put('/:id/update', async (req, res) => {
  try {
     const productId = req.params.id
     const updatedData = {...req.body}

     productController.updateProduct(
       product,
       updatedData,
       productId,
       (err, result) => {
         if (err) {
           return res.status(400).send({error:'error updating product',err})
         }

         return res.status(200).send(result)
       }
     )


  } catch (err) {
    res.status(500).send({error:err})
    console.log(err)
  }
})


router.delete('/:id/delete',(req,res)=>{
  try {
    const productId = req.params.id

    productController.deleteProduct(
      product,
      productId,
      (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'error deleting product' }, err)
        }

        return res.status(200).send(result)
      }
    )
  } catch (err) {
    res.status(500).send({ error: err })
    console.log(err)
  }
})

module.exports = router
