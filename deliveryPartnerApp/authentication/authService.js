const jwt = require('jsonwebtoken')
const config = require('../config')


function verifyDPartner({email,password},dPartnerData){
    if(email === dPartnerData.email && password === dPartnerData.password) return true;
    else return false;
}


function createJWT(dPartnerData){
    const payload = {
      role: 'dPartner',
      email: dPartnerData.email,
      name: dPartnerData.name
    }

    const token = jwt.sign(payload,config.AUTH_SECRET , {
        expiresIn : 6000,
    })

    return token
}

module.exports = {
    verifyDPartner,
    createJWT
}

