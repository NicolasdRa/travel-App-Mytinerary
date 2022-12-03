const mongoose = require('mongoose')

// Schema
const itinerarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An itinerary must have a title'],
      unique: true,
      maxlength: [
        40,
        'An itinerary title must be a maximum of 40 characters long',
      ],
      minlength: [
        10,
        'An itinerary title must be a minimum of 10 characters long',
      ],
      trim: true,
    },

    slug: {
      type: String,
    },

    duration: {
      // type: Number,
      type: String,
      required: [true, 'An itinerary must have a duration'],
    },

    img: {
      type: String,
      required: [true, 'An itinerary must have a cover image'],
    },

    cloudinary_id: {
      type: String,
    },

    ratingsAmount: {
      type: Number,
      default: 0,
    },

    ratingAvg: {
      type: Number,
      default: 3,
      min: [1, 'Lowest rating must be 1'],
      max: [5, 'Top rating must be 5'],
      set: (val) => Math.round(val * 10) / 10, // rounds up value
    },

    details: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        'An itinerary description must be a maximum of 1000 characters long',
      ],
    },

    price: {
      type: String,
      required: [true, 'An itinerary must have a price'],
      enum: {
        values: ['€', '€€', '€€€'],
      },
    },

    category: {
      type: String,
      required: [true, 'An itinerary must belong to a category'],
      enum: {
        values: [
          'Arts & Culture',
          'Popular Attractions',
          'Pubs & Bars',
          'Food & Nightlife',
          'Tours & Sightseeing',
          'Spa & Wellness',
          'Sports & Outdoors',
          'Nature & Wildlife',
          'Unique Experiences',
        ],
        message:
          'Category must be one of these options: Arts & Culture, Popular Attractions, Pubs & Bars, Food & Nightlife, Tours & Sightseeing, Spa & Wellness, Sports & Outdoors, Nature & Wildlife or Unique Experiences',
      },
    },

    cityName: {
      type: String,
      // required: [true, 'An itinerary must belong to a city'],
    },

    city: {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
      required: [true, 'An itinerary must belong to a city'],
    },

    activities: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Activity',
        // required: [true, 'An itinerary must have an activity']
      },
    ],

    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An itinerary must have an author'],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  // options object for virtual properties
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual populate (to populate comments & favourites which in turn hold the reference to itineraries)
itinerarySchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'itinerary',
})

itinerarySchema.virtual('favourites', {
  ref: 'Favourite',
  localField: '_id',
  foreignField: 'itinerary',
})

// query middleware to populate referenced fields
itinerarySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'city',
    select: '-__v',
  })

  this.populate({
    path: 'author',
    select: 'userName img _id',
  })
  this.populate({
    path: 'activities',
    select: '-__v',
  })
  next()
})

// Model
const Itinerary = mongoose.model('Itinerary', itinerarySchema)
module.exports = Itinerary
