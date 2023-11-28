const express = require('express')

const router = express.Router()
const pickUpController = require('./pickUpController')

router.get('/availablePickups',(req,res)=>{
    try {
      // const { pickUpId } = req.params;
      // const dPartnerId = req.body.dPartnerId;

      // if(!pickUpId){
      //   res.status(400).send("wrong URL??");
      // }

      pickUpController.getAllPickUps((err, result) => { ///////////////
        if (err) {
          return res.status(400).send({ err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'uNEXPECTED ERROR WHILE GETTING ALL AVAILABLE PICKUPS' })
    }
})

router.get('/yourPickUp', (req, res) => {
  try {
    // const { pickUpId } = req.params;
    const dPartnerId = req.body.dPartnerId;

    if(!dPartnerId){
      res.status(400).send("missing Inputs");
    }

    pickUpController.getPickUpByDPartner(dPartnerId,(err, result) => { ///////////
      if (err) {
        return res.status(400).send({ err })
      } else {
        // if(!result) res.status(200).send("No Active PickUps")
        return res.status(200).send(result)
      }
    })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'uNEXPECTED ERROR WHILE GETTING YOUR CURRENT PICKUP' })
  }
})


router.put("/:id/claim",(req,res)=>{
    try {
      const {id} = req.params
      const {dPartnerId} = req.body

      if (!id) {
        res.status(400).send('wrong URL??')
      }
      const pickUpId = id;
      pickUpController.claimPickUp(pickUpId , dPartnerId , (err, result) => { ////////////
        if (err) {
          return res.status(400).send({ err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'uNEXPECTED ERROR WHILE CLAIMING PICKUP BY THE DPARTNER' })
    }
})

router.put("/:id/update",(req,res)=>{
    try {
      const { id } = req.params;
      const {dPartnerId} = req.body;  

      if(!id){
        res.status(400).send("wrong URL??");
      }
      const pickUpId = id
      pickUpController.updateStatusById(pickUpId , dPartnerId ,Status, (err, result) => {
        if (err) {
          return res.status(400).send({ err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'uNEXPECTED ERROR WHILE DELETING KITCHEN' })
    }
})


router.delete("/:id/delete",(req,res)=>{
  try {
      const { id } = req.params;
      const {dPartnerId} = req.body;  

      if(!id){
        res.status(400).send("wrong URL??");
      }
      const pickUpId = id
      pickUpController.deletePickUpById(pickUpId , dPartnerId , (err, result) => {
        if (err) {
          return res.status(400).send({ err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'uNEXPECTED ERROR WHILE DELETING PICKUP' })
    }
})


module.exports = router;