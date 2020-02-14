const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
    unique: false
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  img: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: false
  },

  googleId: {
    type: String,
    required: false
  },

  date: {
    type: Date,
    default: Date.now
  }
})

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('user', userSchema)
