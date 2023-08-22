const dPartnerService = require("./dPartnerService")

// function savedPartner(dPartner, done) {
//   dPartnerService.savedPartner(dPartner, done)
// }

// function getdPartnerByEmail(dPartner, dPartnerEmail, done) {
//   dPartnerService.getdPartnerByEmail(dPartner, dPartnerEmail, done)
// }

function getdPartnerById(dPartner, dPartnerId, done) {
  dPartnerService.getdPartnerById(dPartner, dPartnerId, done)
}


function updatedPartner(dPartner, updatedData, dPartnerId, done) {
  dPartnerService.getdPartnerById(dPartner, dPartnerId, (err, data) => {
    if (err) {
      return done(err)
      // return res.status(400).send('error getting dPartner', err) done(err)
    }
    if (!data) return done('no dPartner with given email id')
    else dPartnerService.updatedPartner(dPartner, updatedData, data.email, done)
  })
}


function deletedPartner(dPartner, dPartnerId, done) {
  let dPartnerData = undefined
  dPartnerService.getdPartnerById(dPartner, dPartnerId, (err, data) => {
    if (err) {
      return res.status(400).send('error getting dPartner', err)
    }
    dPartnerData = data
  })

  if (!dPartnerData) return done('no dPartner with given email id')
  dPartnerService.deletedPartner(dPartner, dPartnerData.email, done)
}


module.exports = {
  // savedPartner,
  // getdPartnerByEmail,
  getdPartnerById,
  updatedPartner,
  deletedPartner,
}

