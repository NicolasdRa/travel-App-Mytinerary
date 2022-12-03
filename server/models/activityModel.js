const mongoose = require('mongoose')

// Schema
const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An activity must have a title'],
      unique: true,
      maxlength: [
        40,
        'An activity title must be a maximum of 40 characters long',
      ],
      minlength: [
        10,
        'An activity title must be a minimum of 10 characters long',
      ],
      trim: true,
    },

    slug: {
      type: String,
    },

    duration: {
      type: Number,
      required: [true, 'An activity must have a duration'],
    },

    img: {
      type: String,
      required: [true, 'An activity must have a cover image'],
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
        'An activity description must be a maximum of 40 characters long',
      ],
    },

    price: {
      type: String,
      required: [true, 'An activity must have a price'],
      enum: {
        values: ['€', '€€', '€€€'],
      },
    },

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
          'Unique Experiences',
        ],
        message:
          'Category must be one of these options: Arts, Culture, Popular Attractions, Pubs, Bars, Food & Restaurants, Nightlife, Sightseeing, Spa & Wellness, Sports, Outdoor, Nature & Wildlife or Unique Experiences',
      },
    },

    cityName: {
      type: String,
      // required: [true, 'An activity must belong to a city'],
    },

    city: {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
      required: [true, 'An activity must belong to a city'],
    },

    itinerary: {
      type: mongoose.Schema.ObjectId,
      ref: 'Itinerary',
      required: [true, 'An activity must belong to an itinerary'],
    },

    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An activity must have an author'],
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
activitySchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'activity',
})

activitySchema.virtual('favourites', {
  ref: 'Favourite',
  localField: '_id',
  foreignField: 'activity',
})

// query middleware to populate referenced fields
activitySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'city',
    select: 'name',
  }).populate({
    path: 'author',
    select: 'userName img _id',
  })
  this.populate({
    path: 'itinerary',
    select: '-__v',
  })
  next()
})

// Model
const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity
