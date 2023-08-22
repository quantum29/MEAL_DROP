const express = require('express')

const router = express.Router()

const customerController = require('./customerController')
const customer = require('./customerModel')

// router.post('/', async (req, res) => {
//   try {
//     const newCustomer = new customer({ ...req.body })
//     customerController.saveCustomer(newCustomer, (err, result) => {
//       if (err) {
//         return res.status(400).send({ msg: 'error while saving customer', err })
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
    const customerId = req.params.id
    customerController.getCustomerById(customer, customerId, (err, result) => {
      if (err) {
        return res.status(400).send('error getting customer', err)
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
     const customerId = req.params.id
     const updatedData = {...req.body}

     customerController.updateCustomer(
       customer,
       updatedData,
       customerId,
       (err, result) => {
         if (err) {
           return res.status(400).send({error:'error updating customer',err})
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
    const customerId = req.params.id

    customerController.deleteCustomer(
      customer,
      customerId,
      (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'error deleting customer' }, err)
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
