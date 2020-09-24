const mongoose = require('mongoose')

// schema
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A city must have a name'],
    unique: true
  },
  country: {
    type: String,
    required: [true, 'A city must belong to a country']
  },
  description: {
    type: String
  },
  inhabitants: {
    type: Number
  },
  img: {
    type: String,
    required: true
  },
  location: {
    type: { type: String, default: 'Point', enum: ['Point'] },
    coordinates: [Number]
  },
  guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
})

// Model
const City = mongoose.model('City', citySchema)
module.exports = City
