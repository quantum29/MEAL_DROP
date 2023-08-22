const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

  name: {
    type: String,
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
  description: {
    type: String,
  },
})

const product = mongoose.model('product', productSchema)

module.exports = product
