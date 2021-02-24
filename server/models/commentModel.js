const mongoose = require('mongoose')

// schema
const commentSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'A comment must have a rating'],
    },

    summary: {
      type: String,
      required: [true, 'A comment must have a summary'],
      maxlength: [60, 'A tour name must have a maximum of 60 characters'],
    },

    description: {
      type: String,
      required: [true, 'A comment must have a description'],
      maxlength: [600, 'A tour name must have a maximum of 600 characters'],
    },

    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A comment must belong to an author'],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    itinerary: {
      type: mongoose.Schema.ObjectId,
      ref: 'Itinerary',
      required: [true, 'A comment must belong to an itinerary'],
    },
  },
  // options object for virtual properties
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// FIXME: select doesnt choose the specified fields in itinerary -- due to is having an array as field?

// query middleware to populate referenced fields
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'userName img _id',
  })
  this.populate({
    path: 'itinerary',
    select: '_id title',
  })
  next()
})

// Model
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
