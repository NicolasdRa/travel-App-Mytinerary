const mongoose = require('mongoose')
const itinerarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
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
    required: true
  },
  category: {
    type: String,
    required: false
  },

  details: {
    type: String,
    required: false
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

// Hint: each itinerary should have a title, a profile picture(URL), a duration, a price and category. Try to think about the most suitable data type for each of these parameters.

//name of module is the singular version (itinerary) of the database name (itinerary)
module.exports = mongoose.model('itinerary', itinerarySchema)
