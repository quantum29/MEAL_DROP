const express = require('express')

const router = express.Router()
const kitchenController = require('./kitchenController')

router.post('/:id/update',(req,res)=>{
    try {
      const { id } = req.params;
      const status = req.body.status;


      if(!id){
        res.status(400).send("wrong URL??");
      }

      kitchenController.updateStatusById(id,status, (err, result) => {
        if (err) {
          return res.status(400).send({ err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'uNEXPECTED ERROR WHILE UPDATING STATUS' })
    }
})

router.get("/restaurant/:RestId",(req,res)=>{
    try {
      const { restId } = req.params

      if (!restId) {
        res.status(400).send('wrong URL??')
      }

      kitchenController.getAllKitchenByRestId(restId, (err, result) => {
        if (err) {
          return res.status(400).send({ err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'uNEXPECTED ERROR WHILE fetching kitchen data' })
    }
})

router.delete("/:id/delete",(req,res)=>{
    try {
      const { id } = req.params;
        
      if(!id){
        res.status(400).send("wrong URL??");
      }

      kitchenController.deleteKitchenById(id, (err, result) => {
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


module.exports = router;