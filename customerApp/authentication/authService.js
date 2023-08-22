const jwt = require('jsonwebtoken')
const config = require('../config')


function verifyCustomer({email,password},customerData){
    if(email === customerData.email && password === customerData.password) return true;
    else return false;
}


function createJWT(customerData){
    const payload = {
      role: 'CUSTOMER',
      email: customerData.email,
      name: customerData.name
    }

    const token = jwt.sign(payload,config.AUTH_SECRET , {
        expiresIn : 6000,
    })

    return token
}

module.exports = {
    verifyCustomer,
    createJWT
}

