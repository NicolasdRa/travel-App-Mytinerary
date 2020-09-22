const mongoose = require('mongoose')

// Booking Schema
const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'A booking must belong to a tour']
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A booking must belong to a user']
  },

  price: {
    type: Number,
    required: [true, 'A booking must have a price']
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  paid: {
    type: Boolean,
    default: true
  }
})

// query middleware to populate referenced fields
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  })
  next()
})

// Model
const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking
