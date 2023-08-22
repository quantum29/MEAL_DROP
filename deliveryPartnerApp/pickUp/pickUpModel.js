const mongoose = require('mongoose')
const pickUpSchema = mongoose.Schema({
  orderId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  consumerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  restaurantId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  claimed: {
    type : Boolean,
    required:true,
  },
  dPartnerId: {
    type : mongoose.SchemaTypes.orderId,
    required : true,
  },
  cost: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  }
})


const pickUp = mongoose.model('pickUp', pickUpSchema)

module.exports = pickUp
