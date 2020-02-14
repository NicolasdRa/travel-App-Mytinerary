const passport = require('passport')
const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../keys')

// @route: GET http://localhost:5000/api/auth
// @access: Private
// @descr: Loads authenticated User / Gets Users data
router.get(
  '/user',
  passport.authenticate(
    'jwt',
    { session: false },
    { successRedirect: '/', failureRedirect: '/login' }
  ),
  (req, res) => {
    userModel
      .findById({ _id: req.body.id })
      .select('-password')
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(404).json({ msg: 'User does not exist!' }))
  }
)

// @route: POST http://localhost:5000/api/auth/login
// @access: Public
// @descr: Authenticates user

// router.post(
//   '/login',
//   passport.authenticate('jwt', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// )

router.post(
  '/login',
  [
    // Validation
    // email must be an email
    check('email', 'Please include a valid email').isEmail(),

    // password must be at least 6 chars long
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await userModel.findOne({
        email: email
      })

      if (!user) {
        return res.status(400).json({
          msg: [
            {
              msg: 'Please enter a registered User Name or sign up'
            }
          ]
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          msg: [{ msg: 'Please enter a valid password' }]
        })
      }

      const payload = {
        id: user.id
      }

      const options = { expiresIn: 3600 }

      jwt.sign(payload, key.jwt.secretOrKey, options, (err, token) => {
        if (err) {
          res.json({
            success: false,
            token: 'There was an error'
          })
        } else {
          res.json({
            success: true,
            token: token,
            user: {
              userName: user.userName,
              email: user.email,
              avatarPicture: user.img
            }
          })
        }
      })
      // res.redirect('http://localhost:3000/')
    } catch (err) {
      res.status(500).json({
        msg: [{ msg: 'Server error' }]
      })
    }
  }
)

// @route: GET http://localhost:5000/api/auth/logout
// @access: Private
// @descr: Logs out
router.get('/logout', (req, res) => {
  // handle with passport...later
  res.redirect('http://localhost:3000')
  // .json('log out success')
})

// @route: GET http://localhost:5000/api/auth/google
// @access: Public
// @descr: Authenticates user with Google account
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// @route: GET http://localhost:5000/api/auth/google/redirect
// @access: Private authenticated by Google
// @descr: callback route for google to re-direct to
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  (req, res, next) => {
    res.locals.user = req.user

    const { id } = req.user
    const payload = {
      id: id
    }

    const options = { expiresIn: 360000 }

    jwt.sign(payload, key.jwt.secretOrKey, options, (err, token) => {
      if (err) {
        res.json({ msg: 'There was an authentication error' })
      } else {
        res.redirect('http://localhost:3000/?code=' + token)
        // res.json({
        //   success: true,
        //   token: token,
        //   user: {
        //     userName: userName,
        //     email: email,
        //     avatarPicture: img
        //   }
        // })
      }

      // res.redirect('http://localhost:3000/?code=' + token)

      console.log('res.locals.user', res.locals.user)
      console.log('token', token)
    })
  }
)

module.exports = router
