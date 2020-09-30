const AppError = require('./../utils/appError')

const handleCastErrorDB = error => {
  const message = `Invalid ${error.path}: ${error.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = error => {
  const value = Object.values(error.keyValue)[0]
  const message = `Duplicate field Value: ${value}. Please use another value.`
  return new AppError(message, 400)
}

const handleValidationErrorDB = error => {
  const errors = Object.values(error.errors).map(el => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJwtError = () =>
  new AppError('Invalid token. Please log in, again', 401)

const handleJwtExpiredError = () =>
  new AppError('Your token has expired, please log in again', 401)

const sendDevError = (error, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.statusCode).json({
      status: error.status,
      name: error.name,
      message: error.message,
      error: error,
      stack: error.stack
    })
  }
  // B) RENDERED WEBSITE
  console.error('Unexpected ERROR', error)
  return res.status(error.statusCode).render('error', {
    title: 'Something went wrong!',
    message: error.message
  })
}

const sendProdError = (error, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // a) Operational, trusted error: send message to client
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      })
    }

    // b) programming or unknown origin error: details not leaked
    // 1. Log error
    console.error('Unexpected ERROR', error)

    // 2. Send gral message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong >( ..'
    })
  }
  // B) RENDERED WEBSITE
  // a) Operational, trusted error: send message to client
  if (error.isOperational) {
    return res.status(error.statusCode).render('error', {
      title: 'Something went wrong! >( ',
      message: error.message
    })
  }
  // b) programming or unknown origin error: dont leak details
  // 1. Log error
  console.error('Unexpected ERROR', error)

  // 2. Send gral message
  return res.status(error.statusCode).render('error', {
    title: 'Something went wrong! >( ',
    message: 'Please try again later.'
  })
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendDevError(error, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error }
    let errName = error.name
    err.message = error.message

    if (errName === 'CastError') err = handleCastErrorDB(err)
    if (err.code === 11000) err = handleDuplicateFieldsDB(err)
    if (errName === 'ValidationError') err = handleValidationErrorDB(err)
    if (errName === 'JsonWebTokenError') err = handleJwtError(err)
    if (errName === 'TokenExpiredError') err = handleJwtExpiredError(err)

    sendProdError(err, req, res)
  }
}
