// requires express module
const express = require('express')

// dotenv environment variables
const dotenv = require('dotenv')
dotenv.config()

// requires middleware modules
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// sets up express app
const app = express()

// parses json object
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//brings in passport authenticacion file
const passport = require('./routes/middleware/passport')

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

// allows loading resources from other urls... find out more
app.use(cors())

// initializes (imports) routes
app.use('/api/cities', require('./routes/cityRoutes'))
app.use('/api/itineraries', require('./routes/itineraryRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
// app.use('/profile', require('./routes/profileRoutes'))

// sets up which port to listen to for requests
const port = process.env.PORT || 5000

//connects to DB (mongoDb Atlas) & listens for requests
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`)
      console.log('Connection to Mongo DB established')
    })
  )

  .catch(err => console.log(err))
