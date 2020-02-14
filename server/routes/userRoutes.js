const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../keys')

// @route: GET http://localhost:5000/api/users
// @access: Public
// @descr: Test route
router.get('/:email', (req, res) => {
  let userRequested = req.params.email
  userModel
    .findOne({ email: userRequested })
    .then(user => {
      res.send(user)
    })
    .catch(err => console.log(err))
})

// @route: POST http://localhost:5000/api/users
// @access: Public
// @descr: Registers new user in DB
router.post(
  '/',
  [
    // User Name exists
    check('userName', 'Please include a valid User Name')
      .not()
      .isEmpty(),

    // email must be an email
    check('email', 'Please include a valid email').isEmail(),

    // password must be at least 6 chars long
    check(
      'password',
      'Your password must be at least 6 characters long'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() })
    }

    const { userName, email, img, password } = req.body

    try {
      let user = await userModel.findOne({
        email: email
      })

      if (user) {
        return res.status(400).json({
          msg: [
            { msg: 'This User already exists, please try another User Name' }
          ]
        })
      }

      let newUser = new userModel({
        userName: userName,
        email: email,
        img: img,
        password: password
      })

      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password, salt)

      await newUser.save()

      const payload = {
        id: newUser.id
      }

      const options = { expiresIn: 360000 }

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
              userName: newUser.userName,
              email: newUser.email,
              avatarPicture: newUser.img
            }
          })
        }
      })
    } catch (err) {
      res.status(500).json({
        msg: [{ msg: 'Server error' }]
      })
    }
  }
)

module.exports = router
