// requires express module
const express = require('express')

// dotenv environment variables
const dotenv = require('dotenv')
dotenv.config()

// requires middleware modules
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const cookieSession = require('cookie-session')

// sets up express app
const app = express()

// parses json object
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
// parses json object
app.use(cookieParser())

// brings in cookie-session
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: process.env.COOKIE_SESSION_KEY
//   })
// )

//brings in passport authenticacion file
const passport = require('./routes/middleware/passport')

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
// app.use(passport.session())

// allows loading resources from other urls... find out more
app.use(cors())

// initializes (imports) routes
app.use('/api/cities', require('./routes/cityRoutes'))
app.use('/api/itineraries', require('./routes/itineraryRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// sets up which port to listen to for requests
const port = process.env.PORT

// requires DB
require('./db')
console.log('Connection to Mongo DB established')

// listens for requests
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
