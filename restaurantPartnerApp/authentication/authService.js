const jwt = require('jsonwebtoken')
const config = require('../config')


function verifyRestaurant({email,password},restaurantData){
    if(email === restaurantData.email && password === restaurantData.password) return true;
    else return false;
}


function createJWT(restaurantData){
    const payload = {
      role: 'RESTAURANT',
      email: restaurantData.email,
      name: restaurantData.name
    }

    const token = jwt.sign(payload,config.AUTH_SECRET , {
        expiresIn : 6000,
    })

    return token
}

module.exports = {
    verifyRestaurant,
    createJWT
}

