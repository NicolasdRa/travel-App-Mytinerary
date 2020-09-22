const mongoose = require('mongoose')

// Schema
const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An activity must have a name'],
    unique: true,
    maxlength: [
      40,
      'An activity title must be a maximum of 40 characters long'
    ],
    minlength: [
      10,
      'An activity title must be a minimum of 10 characters long'
    ],
    trim: true
  },

  slug: {
    type: String
  },

  duration: {
    type: Number,
    required: [true, 'An activity must have a duration']
  },

  coverImg: {
    type: String,
    required: [true, 'An activity must have a cover image']
  },

  ratingsAmount: {
    type: Number,
    default: 0
  },

  ratingAvg: {
    type: Number,
    default: 3,
    min: [1, 'Lowest rating must be 1'],
    max: [5, 'Top rating must be 5'],
    set: val => Math.round(val * 10) / 10 // rounds up value
  },

  pricing: {
    free: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      default: 0
    },
    discountPrice: {
      type: Number,
      validate: {
        // warning.. the "this" keyword here only points to current documnent on creation, not on update
        validator: function (value) {
          return value < this.price
        },
        message:
          'Discount price ({VALUE}) should be lower than the regular price'
      }
    }
  },

  summary: {
    type: String,
    trim: true,
    required: [true, 'An activity must have a short description'],
    maxlength: [
      50,
      'An activity summary must be a maximum of 40 characters long'
    ]
  },

  description: {
    type: String,
    trim: true,
    maxlength: [
      1000,
      'An activity description must be a maximum of 40 characters long'
    ]
  },

  city: [{ type: mongoose.Schema.ObjectId, ref: 'City' }],

  itinerary: [{ type: mongoose.Schema.ObjectId, ref: 'Itinerary' }],

  category: {
    type: String,
    required: [true, 'An activity must belong to a category'],
    enum: {
      values: [
        'Arts',
        'Culture',
        'Popular Attractions',
        'Pubs',
        'Bars',
        'Food & Restaurants',
        'Nightlife',
        'Sightseeing',
        'Spa & Wellness',
        'Sports',
        'Outdoor',
        'Nature & Wildlife',
        'Unique Experiences'
      ]
    }
  },

  likes: {
    type: Number
  },

  author: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],

  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Model
const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity
