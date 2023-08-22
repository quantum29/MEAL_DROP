const kitchenService = require('./kitchenService')
const kitchen = require('./kitchenModel')

const Producer = require('./producer')
const producer = new Producer()


// all status:-
// RECIEVED
// REJECTED
// READY


function updateStatusById(kitchenId, status, done) {
  kitchenService.updateKitchenById(kitchen,kitchenId,{ status },(err, result ) => {
      if (err) {
        console.log(err);
        done({error : "cannot update order " , err});
      } else {
        const {orderId} = result
        const msg = { orderId, status }
        producer.publishMessage("STATUS" , msg)
        

        if(status == "READY"){
          kitchenService.getById(kitchen, kitchenId , (err0,data) =>{
            if(err0){
              console.log(err0)
              done({error : "cannot publish it to the pickup queue" ,err});
            }else{    
              producer.publishMessage('PICKUP' , data);
            }
          })
        }

        done(undefined,{msg:" kitchen status updated " , result})
    }
    }
  )
}

function getAllKitchenByRestId(restaurantId, done) {
  kitchenService.getAllByParams(restaurant, { restaurantId }, (err, result) => {
    if (err) {
      console.log(err)
      done({ error: 'cannot update order', err })
    } else {
      return done(undefined, result);
    }
  })
}

function deleteOrderById(kitchenId, done) {
      kitchenService.deleteKitchenById(kitchen,kitchenId,(err,result)=>{
        if (err) {
          console.log(err)
          done({ error: 'cannot update order', err })
        } else {
          return done(undefined , { msg : "item removed from Kitchen" });
        }
      })
}

module.exports = {
  updateStatusById,
  getAllKitchenByRestId,
  deleteOrderById
}
