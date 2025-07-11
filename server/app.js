const express = require('express')
const path = require('path')

const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const compression = require('compression')

const cityRouter = require('./routes/cityRoutes')
const itineraryRouter = require('./routes/itineraryRoutes')
const activityRouter = require('./routes/activityRoutes')
const userRouter = require('./routes/userRoutes')
const favouriteRouter = require('./routes/favouriteRoutes')
const authRouter = require('./routes/authRoutes')
const commentRouter = require('./routes/commentRoutes')

const passport = require('./middleware/passport')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

// Start express app
const app = express()

// enables proxy when deployed to heroku
app.enable('trust proxy')

// view engine set up (for sending html emails auth process)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Global MIDDLEWARES

// Implement CORS - Cross Origin Resource Sharing
var whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL,
]
var corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // Allow cookies to be sent with requests
}

// Cors - use whitelist for origin validation
app.use(cors(corsOptions))

// Cors - complex requests (update, patch, delete) - use whitelist
app.options('*', cors(corsOptions))

// serves statics files (uploaded imgs)
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))

// Set security HTTP headers
app.use(helmet())

// Rate limiting - enabled in production
if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per windowMs
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: {
      error: 'Too many requests from this IP, please try again in 15 minutes!'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
  app.use('/api', limiter)
}

// Body parsers
app.use(express.json({ limit: '500kb' }))
app.use(
  express.urlencoded({
    extended: true,
  })
)

// cookie parser
app.use(cookieParser())

// Data sanitization against NoSQL query injection (it removes $ from query attacks and makes them unusable)
app.use(mongoSanitize())

// Data sanitization against XSS attacks
app.use(xss())

// prevent parameter pollution in queries
app.use(
  hpp({
    whitelist: [
      'duration',
      'pricing',
      'ratingAvg',
      'ratingsAmount',
      'location',
      'difficulty',
      'guides',
      'city',
      'hashtags',
    ],
  })
)

// compress all text sent in the app
app.use(compression())

// Test middleware
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString()
  // console.log('cookies', req.cookies)
  next()
})

// Passport
app.use(passport.initialize())
app.use(passport.session())

// MOUNTING routers
app.use('/api/v1/cities', cityRouter)
app.use('/api/v1/itineraries', itineraryRouter)
app.use('/api/v1/activities', activityRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/favourites', favouriteRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/comments', commentRouter)

// handler for unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404))
})

// global error handler
app.use(globalErrorHandler)

module.exports = app
