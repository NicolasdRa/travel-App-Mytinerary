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
const port = process.env.PORT || 8000

const db = process.env.DB_CONNECT
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection to Mongo DB established')
  })

// listens for requests
app.listen(port, () => {
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

// event listener to close process gracefully upon heroku sigterm signal
process.on('SIGTERM', () => {
  console.log('Sigterm received. Shutting down gracefully')
  server.close(() => {
    console.log('Process terminated!')
  })
})
