const mongoose = require('mongoose')

// schema
const tokenBlacklistSchema = new mongoose.Schema({
  tokens: [
    {
      token: {
        type: String,
        unique: true,
        required: true
      },

      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },

      issuedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

// Model
const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema)
module.exports = TokenBlacklist
