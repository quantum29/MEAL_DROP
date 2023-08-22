const mongoose = require('mongoose')
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
  },
  contactNumber: {
    type: Number,
  },
})

const restaurant = mongoose.model('restaurant', restaurantSchema)

module.exports = restaurant
