const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../models/userModel.js')
mongoose.model('User')
const key = require('../keys')

// JWT Auth Strategy
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })
)

// serialize user for google strategy
// passport.serializeUser(function (user, done) {
//   done(null, user._id)
// })

// passport.deserializeUser(function (id, done) {
//   User.findById(id, (err, user) => {
//     if (err) done(err)
//     else done(null, user)
//   })
// })

// Google Login Auth Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/users/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function

      // Check if logging user is in our DB
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          // already have a user
          console.log('Current User is:', user)
          done(null, user)
        } else {
          //if not create user in DB
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            img: profile.photos[0].value
          })
            .save()
            .then(user => {
              console.log('new user created:' + user)
              done(null, user)
            })
        }
      })
    }
  )
)

module.exports = passport
