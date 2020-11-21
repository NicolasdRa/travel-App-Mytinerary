const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    // required: [true, 'Please, include user name!'],
    unique: true,
    trim: true,
  },

  firstName: {
    type: String,
    default: '',
  },

  lastName: {
    type: String,
    default: '',
  },

  email: {
    type: String,
    required: true,
    unique: [
      true,
      'there is already an account registered under that email address, please provide another email!',
    ],
    lowercase: true,
    validate: [
      validator.isEmail,
      'Invalid Email, please provide a valid email address',
    ],
  },

  img: {
    type: String,
    default: 'defaultProfileCover.jpg',
  },

  coverImg: {
    type: String,
    default: '',
  },

  password: {
    type: String,
    // required: [true, 'Please provide a valid password'],
    minlength: 6,
    select: false,
  },

  passwordConfirm: {
    type: String,
    // required: [true, 'Please provide a valid password'],
    minlength: 6,
    validate: {
      // works only on create and save
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords do not match',
    },
    select: false,
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'admin'],
    default: 'user',
  },

  details: {
    type: String,
    trim: true,
    default: '',
  },

  googleId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },

  passwordChangedAt: {
    type: Date,
    select: false,
  },

  passwordResetToken: {
    type: String,
    select: false,
  },

  passwordResetExpires: {
    type: Date,
    select: false,
  },

  favourites: [
    {
      itineraries: [{ type: mongoose.Schema.ObjectId, ref: 'Itinerary' }],
      activities: [{ type: mongoose.Schema.ObjectId, ref: 'Activity' }],
    },
  ],

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
})

// password hash pre-middleware
userSchema.pre('save', async function (next) {
  // Hash password before saving user
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  // delete password confirm before saving
  // user.passwordConfirm = undefined
  next()
})

// password update pre-middleware
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  // - 1000 hack to make sure delays at timestamp creation dont make token invalid
  this.passwordChangedAt = Date.now() - 1000
  next()
})

// query middleware - filter inactive users
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } })
  next()
})

// instance method - bycript compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

// instance method - check if password changed after authentication
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    )
    return JWTTimeStamp < changedTimeStamp
  }
  // if password has not changed
  return false
}

// instance method - generate token for password reset
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  console.log({ resetToken }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

// static method - find users
userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError('Invalid login credentials.', 401)
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new AppError('Invalid login credentials.', 401)
  }
  return user
}

// Model
const User = mongoose.model('User', userSchema)
module.exports = User
