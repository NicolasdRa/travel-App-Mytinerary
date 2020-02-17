const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../../models/userModel.js')
mongoose.model('user')
const key = require('../../keys')

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

// Google Login Auth Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function

      // Check if logging user is in our DB
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have a user
          // console.log('User is:', currentUser)
          done(null, currentUser)
        } else {
          //if not create user in DB
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            img: profile.photos[0].value
          })
            .save()
            .then(newUser => {
              // console.log('new user created:' + newUser)
              done(null, newUser)
            })
        }
      })
    }
  )
)

module.exports = passport
