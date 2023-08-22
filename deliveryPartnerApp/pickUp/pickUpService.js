const pickUpDAO = require('./pickUpDao')

function savePickUp(pickUp, done) {
  pickUpDAO.savePickUp(pickUp, done)
}

function getById(pickUp, pickUpId, done) {
  pickUpDAO.getById(pickUp, pickUpId, done)
}

function getAllByParams(pickUp, params, done) {
  pickUpDAO.getAllByParams(pickUp, params, done)
}

function updatePickUpById(pickUp,pickUpId,pickUpData,done){
    pickUpDAO.updatePickUpById(pickUp, pickUpId, pickUpData, done)
}

function deletePickUpById(pickUp, pickUpId , done) {
  pickUpDAO.deletePickUpById(pickUp, pickUpId, done)
}

module.exports = {
  savePickUp,
  getAllByParams,
  getById,
  updatePickUpById,
  deletePickUpById,
}
