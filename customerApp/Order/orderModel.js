const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    
    productId:{
        type: mongoose.SchemaTypes.ObjectId,
        required : true,
    },

    customerId:{
        type: mongoose.SchemaTypes.ObjectId,
        required : true,
    },

    cost :{
        type: Number,
        required: true
    },

    address :{
        type: String,
        required: true,
    },
    status:{
        type:String,
        required:true ,
    }
})

const order = mongoose.model('order', orderSchema)

module.exports = order