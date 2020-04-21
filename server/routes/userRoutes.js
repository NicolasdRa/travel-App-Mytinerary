const express = require('express')
const User = require('../models/userModel')
const auth = require('./middleware/auth')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const router = express.Router()

// HTTP POST /users — Register users.
router.post('/signup', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

// HTTP POST /users/login — Allow users to login.
router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res
        .status(401)
        .send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

// HTTP GET / users/profile — Get user profile.
router.get('/profile', auth, async (req, res) => {
  // get logged in user profile info
  const token = req.header('Authorization').replace('Bearer ', '')
  const decoded = jwtDecode(token)
  const id = decoded._id

  try {
    const user = await User.findOne({ _id: id })

    if (user) {
      return res.send(user)
    }
    if (!user) {
      return res
        .status(401)
        .send({ error: 'No user found! Check authentication credentials' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

// HTTP POST /users/logout — Logout the user
router.post('/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token
    })
    await req.user.save()
    res.send('User logged out successfully')
  } catch (error) {
    res.status(500).send(error)
  }
})

// HTTP POST /users/logoutall — Logout from all devices.
router.post('/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send('User successfully logged out from all devices')
  } catch (error) {
    res.status(500).send(error)
  }
})

// HTTP GET /users/google — Google Signup/Login.
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// HTTP GET /users/google/redirect — Google Redirect CB.
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  async (req, res, next) => {
    const user = req.user
    try {
      const token = await user.generateAuthToken()
      // res.redirect('http://localhost:3000/?code=' + token)
      res.cookie('jwt', token).redirect(`//localhost:3000/`)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

module.exports = router
