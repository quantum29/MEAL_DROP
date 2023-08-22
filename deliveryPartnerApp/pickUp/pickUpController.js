const pickUpService = require('./pickUpService')
const pickUp = require('./pickUpModel')
const dPartnerService = require('../dPartner/dPartnerController')
const dPartner = require('../dPartner/dPartnerModel')
const Producer = require('./producer')
const producer = new Producer()



// all status:-
  // READY FOR PICKUP
  // OUT FOR DELIVERY
  // DELIVERED
  // all controllers :- 


function getAllPickUps(done){
  pickUpService.getAllByParams(pickUp,{claimed:false},done);
}

function getPickUpByDPartner(dPartnerId,done){
  pickUpService.getAllByParams(pickup,{dPartnerId},done);
}

function claimPickUp(pickUpId , dPartnerId , done){
  pickUpService.updatePickUpById(pickUp, pickUpId, {claimed:true,dPartnerId}, (err,result)=>{
      if(err){
        done(err);
      }else{
          dPartnerService.getDPartnerById(dPartner, dPartnerId, (err1,result)=>{
            if(err1) return done(err1)
            const {email} = result
            const updatedData = {occupied:true , pickUpId}
            dPartnerService.updatedPartner(dPartner, updatedData, email, (err2 , result)=>{
              if(err2) return done(err2)
              return done(undefined,{msg:'pickUp Claimed',result});
            })
          })
      }
  });
}

function updateStatusById(pickUpId, dPartnerId, Status, done) {
  pickUpService.updatePickUpById(pickUp,pickUpId,{ Status },(err, result) => {
      if (err) {
        console.log(err)
        done({ error: 'cannot update order ', err })
      } else {
        const { orderId } = result
        const msg = { orderId, Status }
        producer.publishMessage('STATUS', msg)

        if (Status == 'DELIVERED') {
          pickUpService.deletePickUpById(pickUp, pickUpId , done);
          dPartnerService.getDPartnerById(dPartner, dPartnerId, (err1,result)=>{
            if(err1) return done(err1)
            const {email} = result
            const updatedData = {occupied:false}
            dPartnerService.updatedPartner(dPartner, updatedData, email, (err2 , result)=>{
              if(err2) return done(err2)
              return done(undefined,{msg:'pickUp delivered',result});
            })
          })

        done(undefined, { msg: ' pickUp status updated ', result })
      }
    }
  })
}

function getAllPickUpByRestId(restaurantId, done) {
  pickUpService.getAllByParams(pickUp, { restaurantId }, (err, result) => {
    if (err) {
      console.log(err)
      done({ error: 'cannot get the pickUp details', err })
    } else {
      return done(undefined, result)
    }
  })
}



// this one is not used
function deletePickUpById(pickUpId, done) {
  pickUpService.deletePickUpById(pickUp, pickUpId, (err, result) => {
    if (err) {
      console.log(err)
      done({ error: 'cannot update order', err })
    } else {
      return done(undefined, { msg: 'item removed from pickUp' })
    }
  })
}

module.exports = {
  getAllPickUps,
  getPickUpByDPartner,
  claimPickUp,

  updateStatusById,
  getAllPickUpByRestId,
  deletePickUpById,
}
