
require('../dbconfig/dbfile')

async function saveKitchen(kitchen,done){
    await kitchen.save((err,data)=>{
        if(err) return done(err)

        return done(undefined,data)
    })
}

async function getAllByParams(kitchen,params,done){
    await kitchen.find({...params},(err,data)=>{
        if(err) return done(err)

        done(undefined,data)
    })
}

async function getById(kitchen,kitchenId,done){
    await kitchen.findById(kitchenId,(err,data)=>{
        if (err) return done(err)

        done(undefined, data)
    })
}

async function updateKitchenById(kitchen,kitchenId,kitchenData, done) {
  await kitchen.findByIdAndUpdate(kitchenId,kitchenData,(err, data) => {
    if (err) return done(err)
    
    return done(undefined, data)
  })
}

async function deleteKitchenById(kitchen, kitchenId, done) {
  await kitchen.findByIdAndDelete(kitchenId, (err, data) => {
    if (err) return done(err)

    return done(undefined, data)
  })
}

module.exports = {
  saveKitchen,
  getAllByParams,
  getById,
  updateKitchenById,
  deleteKitchenById,
}