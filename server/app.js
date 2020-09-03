const express = require('express')
const cityRouter = require('./routes/cityRoutes')
const itineraryRouter = require('./routes/itineraryRoutes')
const userRouter = require('./routes/userRoutes')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require('./routes/middleware/passport')
// const cookieSession = require('cookie-session')

// MIDDLEWARE
app.use(express.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString()
  next()
})

app.use(cookieParser())

// cookie-session
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: process.env.COOKIE_SESSION_KEY
//   })
// )

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
// app.use(passport.session())

app.use(cors())

// MOUNTING routers
app.use('/api/v1/cities', cityRouter)
app.use('/api/v1/itineraries', itineraryRouter)
// app.use('/api/v1/activities', activityRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
