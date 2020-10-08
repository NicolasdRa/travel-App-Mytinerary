const express = require('express')
const router = express.Router()
const {
  signup,
  login,
  logout,
  googleLogin,
  googleLoginRedirect,
  forgotPassword,
  resetPassword,
  updatePassword,
  signToken
} = require('../controllers/authController')
const passport = require('passport')

// ------------------------------------- //
// ROUTES

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/logoutall').post(logout)
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }))
router.route('/google/redirect').get(
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  googleLoginRedirect
)

router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword').patch(resetPassword)
router.route('/updatepassword').post(updatePassword)

// // HTTP POST /users/logoutall — Logout from all devices.
// router.post('/logoutall', auth, async (req, res) => {
//   // Log user out of all devices
//   try {
//     req.user.tokens.splice(0, req.user.tokens.length)
//     await req.user.save()
//     res.send('User successfully logged out from all devices')
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// // HTTP POST /users — Register users.
// router.post('/signup', async (req, res) => {
//   // Create a new user
//   try {
//     const user = new User(req.body)
//     await user.save()
//     const token = await user.generateAuthToken()
//     res.status(201).send({ user, token })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

module.exports = router
