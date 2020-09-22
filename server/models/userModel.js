const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please, include user name!'],
    unique: true,
    trim: true
  },

  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      'Invalid Email, please provide a valid email address'
    ]
  },

  img: {
    type: String,
    default: 'default.jpg'
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'admin'],
    default: 'user'
  },

  details: {
    type: String,
    trim: true
  },

  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minlength: 6,
    select: false
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a valid password'],
    validate: {
      // works only on create an save
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords do not match'
    }
  },

  googleId: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  passwordChangedAt: {
    type: Date
  },

  passwordResetToken: {
    type: String
  },

  passwordResetExpires: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true,
    select: false
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
      itineraries: [{ type: mongoose.Schema.ObjectId, ref: 'Itinerary' }],
      activities: [{ type: mongoose.Schema.ObjectId, ref: 'Activity' }]
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
