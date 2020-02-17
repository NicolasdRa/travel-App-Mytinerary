const express = require('express')
const User = require('../models/userModel')
const auth = require('./middleware/auth')

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
  // View logged in user profile
  res.send(req.user)
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

// router.post(
//   '/signup',
//   [
//     // User Name exists
//     check('userName', 'Please include a valid User Name')
//       .not()
//       .isEmpty(),

//     // email must be an email
//     check('email', 'Please include a valid email').isEmail(),

//     // password must be at least 6 chars long
//     check(
//       'password',
//       'Your password must be at least 6 characters long'
//     ).isLength({ min: 6 })
//   ],

//   async (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ msg: errors.array() })
//     }

//     const { userName, email, img, password } = req.body

//     try {
//       let user = await userModel.findOne({
//         email: email
//       })

//       if (user) {
//         return res.status(400).json({
//           msg: [
//             { msg: 'This User already exists, please try another User Name' }
//           ]
//         })
//       }

//       let newUser = new userModel({
//         userName: userName,
//         email: email,
//         img: img,
//         password: password
//       })

//       const salt = await bcrypt.genSalt(10)
//       newUser.password = await bcrypt.hash(password, salt)

//       await newUser.save()

//       const payload = {
//         id: newUser.id
//       }

//       const options = { expiresIn: 3600 }

//       jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
//         if (err) {
//           res.json({
//             success: false,
//             token: 'There was an error'
//           })
//         } else {
//           res.json({
//             success: true,
//             token: token,
//             user: {
//               userName: newUser.userName,
//               email: newUser.email,
//               avatarPicture: newUser.img
//             }
//           })
//         }
//       })
//     } catch (err) {
//       res.status(500).json({
//         msg: [{ msg: 'Server error' }]
//       })
//     }
//   }
// )

// // @descr: Test route
// // @access: PUBLIC
// // @route: GET http://localhost:5000/api/users/:email

// router.get('/:email', (req, res) => {
//   let userRequested = req.params.email
//   userModel
//     .findOne({ email: userRequested })
//     .then(user => {
//       res.send('User found')
//     })
//     .catch(err => console.log(err))
// })

// @descr: SIGNS UP NEW USER in the DB
// @access: PUBLIC
// @route: POST http://localhost:5000/api/users/signup

// @descr: LOGS IN USER / LOCAL LOGIN
// @route: POST http://localhost:5000/api/users/login
// @access: Public

// router.post(
//   '/login',
//   [
//     // Validation
//     // email must be an email
//     check('email', 'Please include a valid email').isEmail(),

//     // password must be at least 6 chars long
//     check('password', 'Password is required')
//       .not()
//       .isEmpty()
//   ],

//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ msg: errors.array() })
//     }

//     const { email, password } = req.body

//     try {
//       let user = await userModel.findOne({
//         email: email
//       })

//       if (!user) {
//         return res.status(400).json({
//           msg: [
//             {
//               msg: 'Please enter a registered User Name or sign up'
//             }
//           ]
//         })
//       }

//       const isMatch = await bcrypt.compare(password, user.password)

//       if (!isMatch) {
//         return res.status(400).json({
//           msg: [{ msg: 'Please enter a valid password' }]
//         })
//       }

//       const payload = {
//         id: user.id
//       }

//       const options = { expiresIn: 3600 }

//       jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
//         if (err) {
//           res.json({
//             success: false,
//             token: 'There was an error'
//           })
//         } else {
//           res.json({
//             success: true,
//             token: token,
//             user: {
//               userName: user.userName,
//               email: user.email,
//               avatarPicture: user.img
//             }
//           })
//         }
//       })
//       // res.redirect('http://localhost:3000/')
//     } catch (err) {
//       res.status(500).json({
//         msg: [{ msg: 'Server error' }]
//       })
//     }
//   }
// )

// // @descr: LOGS OUT USER / LOCAL
// // @access: PPRIVATE
// // @route: GET http://localhost:5000/api/users/logout

// router.get('/logout', (req, res) => {
//   let userRequested = req.params._id
//   userModel
//     .findOne({ _id: userRequested })
//     .then(user => {
//       res.send('User logged out')
//     })
//     .catch(err => console.log(err))

//   // handle with passport...later
//   // res.redirect('http://localhost:3000')
//   res.send('log out success')
// })

// // @descr: AUTHENTICATES USER with GOOGLE account
// // @access: Public
// // @route: GET http://localhost:5000/api/users/google

// router.get(
//   '/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// )

// // @descr: CB route for GOOGLE to RE-DIRECT to
// // @access: Private authenticated by Google
// // @route: GET http://localhost:5000/api/users/google/redirect

// router.get(
//   '/google/redirect',
//   passport.authenticate('google', {
//     session: false,
//     failureRedirect: '/login'
//   }),
//   (req, res, next) => {
//     res.locals.user = req.user

//     const { id } = req.user
//     const payload = {
//       id: id
//     }

//     const options = { expiresIn: 360000 }

//     jwt.sign(payload, key.jwt.secretOrKey, options, (err, token) => {
//       if (err) {
//         res.json({ msg: 'There was an authentication error' })
//       } else {
//         res.redirect('http://localhost:3000/?code=' + token)
//         // res.json({
//         //   success: true,
//         //   token: token,
//         //   user: {
//         //     userName: userName,
//         //     email: email,
//         //     avatarPicture: img
//         //   }
//         // })
//       }

//       // res.redirect('http://localhost:3000/?code=' + token)

//       console.log('res.locals.user', res.locals.user)
//       console.log('token', token)
//     })
//   }
// )

// @descr: LOADS AUTHENTICATED USER / Gets User data
// @access: PRIVATE
// @route: GET http://localhost:5000/api/users

// router.get(
//   '/user',
//   passport.authenticate(
//     'jwt',
//     { session: false },
//     { successRedirect: '/', failureRedirect: '/login' }
//   ),
//   (req, res) => {
//     userModel
//       .findById({ _id: req.body.id })
//       .select('-password')
//       .then(user => {
//         res.json(user)
//       })
//       .catch(err => res.status(404).json({ msg: 'User does not exist!' }))
//   }
// )

module.exports = router
