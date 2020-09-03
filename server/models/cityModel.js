const mongoose = require('mongoose')

// schema
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
})

// Model
const City = mongoose.model('City', citySchema)
module.exports = City
