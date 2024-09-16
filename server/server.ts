import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Server } from 'http'
import app from './app'

// this is a test comment

// uncaught exceptions handling
process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception!!! Shutting down...')
  console.log(error.name, error.message)
  process.exit(1)
})

dotenv.config({ path: './.env' })

const port = process.env.PORT || 5000

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT as string)
  .then(() => console.log('Connection to MongoDB established'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

// Start server
const server: Server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})

// Error handling
const handleError = (error: Error, origin: string) => {
  console.error(`${origin}! Shutting down...`)
  console.error(error.name, error.message)
  if (server.listening) {
    server.close(() => process.exit(1))
  } else {
    process.exit(1)
  }
}

process.on('uncaughtException', error => handleError(error, 'Uncaught Exception'))
process.on('unhandledRejection', (reason: Error) => handleError(reason, 'Unhandled Rejection'))

// event listener to close process gracefully upon heroku sigterm signal
process.on('SIGTERM', () => {
  console.log('Sigterm received. Shutting down gracefully')
  server.close(() => {
    console.log('Process terminated!')
    process.exit(0)
  })
})

console.log(app.get('env'))

// unhandled rejections error handler
process.on('unhandledRejection', (error: Error) => {
  console.log('Unhandled rejection!!! Shutting down...')
  console.log(error, error.name, error.message)
  if (app.listen) {
    app.listen().close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})
