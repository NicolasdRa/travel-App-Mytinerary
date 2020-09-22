const mongoose = require('mongoose')

// schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'A comment must have a text'],
    maxlength: [600, 'A tour name must have a maximum of 40 characters']
  },
  city: [{ type: mongoose.Schema.ObjectId, ref: 'City' }],
  itinerary: [{ type: mongoose.Schema.ObjectId, ref: 'Itinerary' }],
  activity: [{ type: mongoose.Schema.ObjectId, ref: 'Activity' }],
  author: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
})

// Model
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
