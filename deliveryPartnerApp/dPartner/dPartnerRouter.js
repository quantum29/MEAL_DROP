const express = require('express')

const router = express.Router()

const dPartnerController = require('./dPartnerController')
const dPartner = require('./dPartnerModel')

// router.post('/', async (req, res) => {
//   try {
//     const newdPartner = new dPartner({ ...req.body })
//     dPartnerController.savedPartner(newdPartner, (err, result) => {
//       if (err) {
//         return res.status(400).send({ msg: 'error while saving dPartner', err })
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
    const dPartnerId = req.params.id

    dPartnerController.getDPartnerById(dPartner, dPartnerId, (err, result) => {
      if (err) {
        return res.status(400).send('error getting dPartner', err)
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
     const dPartnerId = req.params.id

     const name  = req.body.name;
     const email = req.body.email;
     const phoneNumber = req.body.phoneNumber;
    
     let updatedData ;
     if (!name) updatedData = {...updatedData , name};
     if (!email) updatedData = { ...updatedData, email }
     if (!phoneNumber) updatedData = { ...updatedData, phoneNumber }


    //  const updatedData = {...req.body} 

     dPartnerController.updateDPartner(
       dPartner,
       updatedData,
       dPartnerId,
       (err, result) => {
         if (err) {
           return res.status(400).send({error:'error updating dPartner',err})
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
    const dPartnerId = req.params.id

    dPartnerController.deletedPartner(
      dPartner,
      dPartnerId,
      (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'error deleting dPartner' }, err)
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
