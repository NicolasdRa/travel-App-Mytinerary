const mongoose = require('mongoose')

// Schema
const activitySchema = new mongoose.Schema(
  {
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
    img: {
      type: String,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'An activity must have a short description'],
      maxlength: [
        100,
        'An activity summary must be a maximum of 100 characters long',
      ],
    },
    details: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        'An itinerary description must be a maximum of 40 characters long',
      ],
    },
    pricing: {
      free: {
        type: Boolean,
        default: true,
      },
      price: {
        type: Number,
        default: 0,
      },
      discountPrice: {
        type: Number,
        validate: {
          // warning.. the "this" keyword here only points to current documnent on creation, not on update
          validator: function (value) {
            return value < this.price
          },
          message:
            'Discount price ({VALUE}) should be lower than the regular price',
        },
      },
    },

    duration: { type: Number },
    hashtags: { type: String },
    likes: { type: Number },

    itinerary: {
      type: mongoose.Schema.ObjectId,
      ref: 'Itinerary',
      required: [true, 'An activity must belong to an itinerary'],
    },

    city: {
      // type: mongoose.Schema.ObjectId,
      type: String,
      // ref: 'City',
      required: [true, 'An activity must belong to a city'],
    },

    // author: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: [true, 'An activity must have an author']
    // },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  // options object for virtual properties
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

// query middleware to populate referenced fields
// activitySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'city',
//     select: 'name'
//   })
//   // .populate({
//   //   path: 'user',
//   //   select: 'name photo'
//   // })
//   next()
// })

// Model
const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity
