const express = require('express')

const router = express.Router()

const restaurantController = require('./restaurantController')
const restaurant = require('./restaurantModel')

// router.post('/', async (req, res) => {
//   try {
//     const newrestaurant = new restaurant({ ...req.body })
//     restaurantController.saverestaurant(newrestaurant, (err, result) => {
//       if (err) {
//         return res.status(400).send({ msg: 'error while saving restaurant', err })
//       }

//       return res.status(200).send(result)
//     })
//   } catch (err) {
//     res.status(500).send(err)
//     console.log(err)
//   }
// })

router.get('/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id
    restaurantController.getRestaurantById(restaurant, restaurantId, (err, result) => {
      if (err) {
        return res.status(400).send('error getting restaurant', err)
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
     const restaurantId = req.params.id
     const updatedData = {...req.body}

     restaurantController.updateRestaurant(
       restaurant,
       updatedData,
       restaurantId,
       (err, result) => {
         if (err) {
           return res.status(400).send({error:'error updating restaurant',err})
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
    const restaurantId = req.params.id

    restaurantController.deleteRestaurant(
      restaurant,
      restaurantId,
      (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'error deleting restaurant' }, err)
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
