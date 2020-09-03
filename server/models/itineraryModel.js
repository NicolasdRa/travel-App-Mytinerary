const mongoose = require('mongoose')

// Schema
const itinerarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  img: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: false
  },

  details: {
    type: String,
    required: false,
    trim: true
  },

  activities: [
    {
      city: String,
      category: String,
      title: String,
      img: String,
      details: String,
      price: String,
      duration: Number,
      hashtags: String,
      likes: Array
    }
  ],
  likes: {
    type: Array,
    required: false
  },
  user: {
    type: String,
    required: true
  }
})

// Model
const Itinerary = mongoose.model('Itinerary', itinerarySchema)
module.exports = Itinerary
