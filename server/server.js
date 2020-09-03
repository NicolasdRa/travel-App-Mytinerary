const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const app = require('./app')
const port = process.env.PORT || 8000

const db = process.env.DB_CONNECT
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection to Mongo DB established')
  })

// listens for requests
app.listen(port, () => {
  console.log(`App set up and server is running on port: ${port}`)
})
