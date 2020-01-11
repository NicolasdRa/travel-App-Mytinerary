const express = require('express')
const router = express.Router()
const itineraryModel = require('../models/itineraryModel')

// /*gets all itineraries*/
router.get('/all', (req, res) => {
  itineraryModel
    .find({})
    .then(files => {
      res.send(files)
    })
    .catch(err => console.log(err))
})

// /*gets ITINERARIES from ONE city*/
router.get('/:city_name', (req, res) => {
  let cityRequested = req.params.city_name
  itineraryModel
    .find({ city: cityRequested })
    .then(itineraryArray => {
      res.send(itineraryArray)
    })
    .catch(err => console.log(err))
})

module.exports = router
