const mongoose = require('mongoose')
const dPartnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  occupied: {
    type : Boolean,
    required: true,
  },
  pickUpId: {   // when pickups claimed occupied would be true can this would be the pickup
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
  },
  deliveryDone: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    requried: true,
  },
})

const dPartner = mongoose.model('dPartner', dPartnerSchema)

module.exports = dPartner
