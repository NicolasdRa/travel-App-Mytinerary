const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../models/userModel.js')
mongoose.model('User')

// Google Login Auth Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/redirect',
      },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function

      // Check if user is in DB
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          // already have a user
          console.log('From passport -- Current User is:', user)
          done(null, user)
        } else {
          //if not create user in DB
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            img: profile.photos[0].value,
          })
            .save()
            .then((user) => {
              console.log('From passport -- new user created:' + user)
              done(null, user)
            })
        }
      })
    }
  )
)
} else {
  console.log('Google OAuth not configured - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not provided')
}

module.exports = passport

// JWT Auth Strategy
// var JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = process.env.JWT_SECRET

// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload.sub }, function (err, user) {
//       if (err) {
//         return done(err, false)
//       }
//       if (user) {
//         return done(null, user)
//       } else {
//         return done(null, false)
//       }
//     })
//   })
// )
