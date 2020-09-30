const express = require('express')
const path = require('path')
const app = express()
const cityRouter = require('./routes/cityRoutes')
const itineraryRouter = require('./routes/itineraryRoutes')
const activityRouter = require('./routes/activityRoutes')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require('./middleware/passport')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
// const cookieSession = require('cookie-session')

// MIDDLEWARE

// body parsers
app.use(express.json({ limit: '5000kb' }))
app.use(
  express.urlencoded({
    extended: true
  })
)

// view engine set up
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'utils/emailTemplates'))

// cookie parser
app.use(cookieParser())

// cookie-session
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: process.env.COOKIE_SESSION_KEY
//   })
// )

// Test middleware
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString()
  console.log('cookies', req.cookies)
  next()
})

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
// app.use(passport.session())

app.use(cors())

// MOUNTING routers
app.use('/api/v1/cities', cityRouter)
app.use('/api/v1/itineraries', itineraryRouter)
app.use('/api/v1/activities', activityRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

// handler for unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404))
})

// global error handler
app.use(globalErrorHandler)

module.exports = app
