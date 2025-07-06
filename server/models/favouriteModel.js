const mongoose = require('mongoose')

// Schema
const favouriteSchema = new mongoose.Schema(
  {
    // category: {
    //   type: String,
    //   required: [true, "A favourite must belong to a category"],
    //   enum: {
    //     values: ["cities", "itineraries", "activities", "comments"],
    //     message:
    //       "The category must be one of these options: cities, itineraries, activities, comments.",
    //   },
    // },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A favourite must have a user'],
    },

    city: {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
    },

    itinerary: {
      type: mongoose.Schema.ObjectId,
      ref: 'Itinerary',
    },

    activity: {
      type: mongoose.Schema.ObjectId,
      ref: 'Activity',
    },

    comment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },

    // originId: {
    //   type: String,
    //   required: true,
    // },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  // options object for virtual properties
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// Compound indexes to prevent duplicate favorites per user
favouriteSchema.index({ user: 1, city: 1 }, { 
  unique: true, 
  sparse: true,
  partialFilterExpression: { city: { $exists: true } }
})
favouriteSchema.index({ user: 1, itinerary: 1 }, { 
  unique: true, 
  sparse: true,
  partialFilterExpression: { itinerary: { $exists: true } }
})
favouriteSchema.index({ user: 1, activity: 1 }, { 
  unique: true, 
  sparse: true,
  partialFilterExpression: { activity: { $exists: true } }
})

// query middleware to populate referenced fields
favouriteSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'userName',
  })
    .populate({
      path: 'city',
      select: 'name',
    })
    .populate({
      path: 'itinerary',
      select: 'title',
    })
    .populate({
      path: 'activity',
      select: 'title',
    })
    .populate({
      path: 'comment',
      select: 'details',
    })

  next()
})

// Model
const Favourite = mongoose.model('Favourite', favouriteSchema)
module.exports = Favourite
