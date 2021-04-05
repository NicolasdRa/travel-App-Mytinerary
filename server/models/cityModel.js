const mongoose = require('mongoose')

// schema
const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A city must have a name'],
      unique: true,
    },
    country: {
      type: String,
      required: [true, 'A city must belong to a country'],
    },
    description: {
      type: String,
    },
    inhabitants: {
      type: Number,
    },
    img: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: 'Point', enum: ['Point'] },
      coordinates: [Number],
    },

    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },

  // options object for virtual properties
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual populate (to populate comments which in turn hold the reference to itineraries)
citySchema.virtual('favourites', {
  ref: 'Favourite',
  localField: '_id',
  foreignField: 'city',
})

citySchema.virtual('itineraries', {
  ref: 'Itinerary',
  localField: '_id',
  foreignField: 'city',
})

// Model
const City = mongoose.model('City', citySchema)
module.exports = City
