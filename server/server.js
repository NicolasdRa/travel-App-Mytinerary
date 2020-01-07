// requires express module
const express = require("express");

// requires middleware modules
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// sets up express app
const app = express();

// parses json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

// allows loading resources from other urls... find out more
app.use(cors());

// initializes (imports) routes
app.use('/cities', require('./routes/cityRoutes'));
app.use('/itineraries', require('./routes/itineraryRoutes'));

// requires keys to DB
const db = require('./keys').mongoURI;

// sets up which port to listen to for requests
const port = process.env.PORT || 5000;

//connects to DB (mongoDb Atlas) & listens for requests
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

.then(() => app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log('Connection to Mongo DB established')
}))

.catch(err => console.log(err));
