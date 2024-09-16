import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
// import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import cityRouter from './routes/cityRoutes'
import itineraryRouter from './routes/itineraryRoutes'
import activityRouter from './routes/activityRoutes'
import userRouter from './routes/userRoutes'
import favouriteRouter from './routes/favouriteRoutes'
import authRouter from './routes/authRoutes'
import commentRouter from './routes/commentRoutes'

import passport from './middleware/passport'
import AppError from './utils/appError'
import globalErrorHandler from './controllers/errorController'

// Start express app
const app = express()

// enables proxy when deployed to heroku
app.enable('trust proxy')

// view engine set up (for sending html emails auth process)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Global MIDDLEWARES

// Implement CORS - Cross Origin Resource Sharing
const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL,
]
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

// Cors - simple requests (get, post) - Access-Control-Allow-Origin *
app.use(cors(corsOptions))

// Cors - complex requests (update, patch, delete) - Access-Control-Allow-Origin *
app.options('*', cors(corsOptions))

// serves static files (uploaded imgs)
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))

// Set security HTTP headers
app.use(helmet())

// ENABLE FOR PRODUCTION AND SET APPROPRIATE LIMIT
// Limit requests from same API - against Brute force attack
// const limiter = rateLimit({
//   max: 500,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from the IP, please try again in an hour!',
// })
// app.use('/api', limiter)

// Body parsers
app.use(express.json({ limit: '500kb' }))
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser())

// Data sanitization against NoSQL query injection
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
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString()
  next()
})

// Passport
app.use(passport.initialize())

// MOUNTING routers
app.use('/api/v1/cities', cityRouter)
app.use('/api/v1/itineraries', itineraryRouter)
app.use('/api/v1/activities', activityRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/favourites', favouriteRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/comments', commentRouter)

// handler for unhandled routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// global error handler
app.use(globalErrorHandler)

export default app
