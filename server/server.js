const mongoose = require('mongoose')
const dotenv = require('dotenv')

// uncaught exceptions handling
process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception!!! Shutting down...')
  console.log(error.name, error.message)
  process.exit(1)
})

dotenv.config({ path: './.env' })

const app = require('./app')
const port = process.env.PORT || 5000

const db = process.env.DB_CONNECT || 'mongodb://localhost:27017/mytinerary'
mongoose
  .connect(db)
  .then(() => {
    console.log('Connection to Mongo DB established')
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB:', err.message)
    console.log('Server will continue without database connection')
  })

// listens for requests
const server = app.listen(port, () => {
  console.log(`App set up and server is running on port: ${port}`)
})

console.log(app.get('env'))

// unhandled rejections error handler
process.on('unhandledRejection', (error) => {
  console.log('Unhandled rejection!!! Shutting down...')
  console.log(error, error.name, error.message)
  server.close(() => {
    process.exit(1)
  })
})

// event listener to close process gracefully upon sigterm signal
process.on('SIGTERM', () => {
  console.log('Sigterm received. Shutting down gracefully')
  server.close(() => {
    console.log('Process terminated!')
  })
})
