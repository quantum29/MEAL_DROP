const dPartnerDao = require('./dPartnerDAO')


function saveDPartner(dPartner, done) {
  dPartnerDao.saveDPartner(dPartner, done)
}

function getAllDPartners(dPartner, done) {
  dPartnerDao.getAllDPartners(dPartner, done)

  done(undefined, data)
}  


function getDPartnerByEmail(dPartner, email, done) {
  dPartnerDao.getDPartnerByEmail(dPartner, email, done)
}

function getDPartnerById(dPartner, dPartnerId, done) {
  dPartnerDao.getDPartnerById(dPartner, dPartnerId, done)
}

function updateDPartner(dPartner, updatedData, email, done) {
  dPartnerDao.updateDPartner(dPartner, updatedData, email, done)
}

function deleteDPartner(dPartner, email, done) {
  dPartnerDao.deleteDPartner(dPartner, email, done)
}

// function takePickUp(dPartner , pickUpId , done){
//   dPartnerDao.updateDPartner(dPartner,updatedData,id)
// }

// we will use this service in the pickUp service only


module.exports = {
  saveDPartner,
  getAllDPartners,
  getDPartnerByEmail,
  getDPartnerById,
  updateDPartner,
  deleteDPartner,
}
