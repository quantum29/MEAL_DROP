
require('../dbconfig/dbfile')

async function savePickUp(pickUp,done){
    await pickUp.save((err,data)=>{
        if(err) return done(err)

        return done(undefined,data)
    })
}

async function getAllByParams(pickUp,params,done){
    await pickUp.find({...params},(err,data)=>{
        if(err) return done(err)

        done(undefined,data)
    })
}

async function getById(pickUp,pickUpId,done){
    await pickUp.findById(pickUpId,(err,data)=>{
        if (err) return done(err)

        done(undefined, data)
    })
}

async function updatePickUpById(pickUp,pickUpId,pickUpData, done) {
  await pickUp.findByIdAndUpdate(pickUpId,pickUpData,(err, data) => {
    if (err) return done(err)
    
    return done(undefined, data)
  })
}

async function deletePickUpById(pickUp, pickUpId, done) {
  await pickUp.findByIdAndDelete(pickUpId, (err, data) => {
    if (err) return done(err)

    return done(undefined, data)
  })
}

module.exports = {
  savePickUp,
  getAllByParams,
  getById,
  updatePickUpById,
  deletePickUpById,
}