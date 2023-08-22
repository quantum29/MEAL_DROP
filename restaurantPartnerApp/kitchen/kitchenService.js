const kitchenDAO = require('./kitchenDao')

function saveKitchen(kitchen, done) {
  kitchenDAO.saveKitchen(kitchen, done)
}

function getById(kitchen, kitchenId, done) {
  kitchenDAO.getById(kitchen, kitchenId, done)
}

function getAllByParams(kitchen, params, done) {
  kitchenDAO.getAllByParams(kitchen, params, done)
}

function updateKitchenById(kitchen,kitchenId,kitchenData,done){
    kitchenDAO.updateKitchenById(kitchen, kitchenId, kitchenData, done)
}

function deleteKitchenById(kitchen, kitchenId , done) {
  kitchenDAO.deleteKitchenById(kitchen, kitchenId, done)
}

module.exports = {
  saveKitchen,
  getAllByParams,
  getById,
  updateKitchenById,
  deleteKitchenById,
}
