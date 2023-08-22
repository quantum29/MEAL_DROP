const dPartnerService = require('../dPartner/dPartnerService')
const authService = require('./authService')
const dPartner = require('../dPartner/dPartnerModel')

function registerDPartner(dPartnerData, done) {
  dPartnerService.getDPartnerByEmail(
    dPartner,
    dPartnerData.email,
    (err, dPartnerFound) => {
      if (err) {
        return done(err)
      } else {
        if (dPartnerFound.length != 0) {
          console.log(dPartnerFound)
          return done('dPartner found with similar email')
        } else {
          return dPartnerService.saveDPartner(
            new dPartner({ ...dPartnerData }),
            done
          )
        }
      }
    }
  )
}

function loginDPartner({ email, password }, done) {
  dPartnerService.getDPartnerByEmail(dPartner, email, (err, dPartnerFound) => {
    if (err) {
      return done(err)
    } else {
      if (dPartnerFound.length == 0)
        return done({ error: 'no dPartner with given email found' })
      const userVerified = authService.verifyDPartner(
        { email, password },
        dPartnerFound[0]
      )

      const _id = dPartnerFound[0]._id

      if (userVerified) {
        const jwtToken = authService.createJWT(dPartnerFound[0])
        return done(undefined, { jwtToken, id: _id })
      } else {
        return done({ error: 'Incorrect Credentials' })
      }
    }
  })
}

module.exports = {
  registerDPartner,
  loginDPartner,
}
