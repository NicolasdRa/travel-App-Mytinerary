const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('./../utils/appError')
const Email = require('./../utils/email')
const crypto = require('crypto')
const passport = require('passport')

// AUTHENTICATION

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const generateTokenCookieAndSendResponse = (user, statusCode, req, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // set httpOnly to "true" for production
    httpOnly: false,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  }

  res.cookie('jwt', token, cookieOptions)
  // remove password from the output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  })
}

// SIGNUP handler
exports.signup = asyncErrorCatcher(async (req, res, next) => {
  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    img: req.body.img
  })

  // send welcome email to user email address
  const url = `${req.protocol}://${req.get('host')}/me`
  await new Email(newUser, url).sendWelcome()

  generateTokenCookieAndSendResponse(newUser, 201, req, res)
})

// LOGIN handler
exports.login = asyncErrorCatcher(async (req, res, next) => {
  const { email, password } = req.body

  // 1) check if email & password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  // 2) check if user & password are correct
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  // 3) send token and data to client
  generateTokenCookieAndSendResponse(user, 200, req, res)
})

// LOGOUT handler
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({ status: 'success' })
}

// GOOGLE LOGIN sign in and re-direct handler
exports.googleLoginRedirect = asyncErrorCatcher(async (req, res, next) => {
  const user = req.user
  const token = await signToken(user._id)

  if (!user || !token) {
    return next(
      new AppError(
        'Invalid credentials, please try again with a valid goolge account.',
        401
      )
    )
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // set httpOnly to "true" for production
    httpOnly: false,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  }

  res.cookie('jwt', token, cookieOptions).redirect(`//localhost:3000/`)
})

// PROTECT ROUTE handler
exports.protect = asyncErrorCatcher(async (req, res, next) => {
  // 1) Get token & check if it exists
  let token
  const authHeader = req.headers.authorization
  const cookie = req.cookies.jwt

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  } else if (cookie) {
    token = cookie
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  // 2) verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) check if user still exists
  const user = await User.findById(decoded.id)
  if (!user) {
    return next(new AppError('The user no longer exists.', 401))
  }

  // 4) check if user changed password after token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('Password recently changed! Please log in again.', 401)
    )
  }

  // grant access to protected route
  req.user = user
  // res.locals.user = user
  next()
})

// -------------------------------------- //
// AUTHORIZATION

exports.restrict = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'guide', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      )
    }
    next()
  }
}

// -------------------------------------- //
// PASSWORD RESET

exports.forgotPassword = asyncErrorCatcher(async (req, res, next) => {
  // 1) get user based on provided email
  const user = await User.findOne({ email: req.body.email })

  if (!user)
    next(new AppError('There is no user with the given email address.', 404))

  // 2) generate random token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  // 3) send it to user's email
  try {
    const resetURL = `${process.env.FRONTEND_URL}resetpassword/${resetToken}`

    await new Email(user, resetURL).sendPasswordReset()
    res.status(200).json({
      status: 'success',
      message: 'Reset token sent to email!',
      resetToken: resetURL
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(
      new AppError(
        'There was an error sending the email. Try again later!.',
        500
      )
    )
  }
})

exports.resetPassword = asyncErrorCatcher(async (req, res, next) => {
  // 1) get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.resetToken)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  // 2) set new password if valid token and user found
  if (!user) {
    return next(
      new AppError('Provided token is invalid or it has expired.', 400)
    )
  }
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  // 3) update changedPasswordAt property for the current user
  // done in user model as instance method

  // 4) Log in user, send JWT
  generateTokenCookieAndSendResponse(user, 200, req, res)
})

// password update without forgetting
exports.updatePassword = asyncErrorCatcher(async (req, res, next) => {
  // 1) get user from collection
  const { currentPassword, password, passwordConfirm } = req.body

  const user = await User.findById(req.user.id).select('+password')

  // 2) check if user & password are correct
  if (!user || !(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong', 401))
  }

  // 3) if, so update password
  user.password = password
  user.passwordConfirm = passwordConfirm
  await user.save()

  // 4) log user in, sent JWT
  generateTokenCookieAndSendResponse(user, 200, req, res)
})
