const jwt = require('jsonwebtoken')
const config = require("../config")

const verifyToken = (req,res,next) => {
    //getting authorization header
    const token = req.headers.authorization
    console.log(token)

    if(!token){
        return res.status(400).send({error:"A token is required for authentication"})
    }

//Synchronously verify the token using the secret or the public key

    try{
        const decoded = jwt.verify(token,config.AUTH_SECRET);

        req.claims = decoded //custome key made to access decoded data from req
    }catch(err){
        return res.status(400).send({error:"INVALID TOKEN"})
    }

    return next()

}

module.exports = verifyToken;