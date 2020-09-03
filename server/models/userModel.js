const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
    unique: false
  },

  firstName: {
    type: String,
    required: false,
    unique: false
  },

  lastName: {
    type: String,
    required: false,
    unique: false
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' })
      }
    }
  },

  img: {
    type: String,
    required: false
  },

  details: {
    type: String,
    required: false,
    unique: false
  },

  password: {
    type: String,
    required: false,
    minlength: 6
  },

  googleId: {
    type: String,
    required: false
  },

  date: {
    type: Date,
    default: Date.now
  },

  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],

  favourites: [
    {
      itineraries: {
        type: Array,
        required: false
      },
      activities: {
        type: Array,
        required: false
      }
    }
  ]
})

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const options = { expiresIn: 120 }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, options)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

// Model
const User = mongoose.model('user', userSchema)
module.exports = User
