const mongoose = require('mongoose')

//connects to DB (mongoDb Atlas)
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
