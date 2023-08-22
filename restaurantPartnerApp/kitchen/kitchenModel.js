const mongoose = require('mongoose')
const kitchenSchema = mongoose.Schema({
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
  cost: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
})


const kitchen = mongoose.model('kitchen', kitchenSchema)

module.exports = kitchen
