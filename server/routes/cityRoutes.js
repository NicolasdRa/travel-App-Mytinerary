const express = require('express')
const router = express.Router()
const {
  getAllCities,
  getCity,
  createCity,
  updateCity,
  deleteCity
} = require('../controllers/cityController')

// ------------------------------------- //
// ROUTES

router
  .route('/')
  .get(getAllCities)
  .post(createCity)

router
  .route('/:id')
  .get(getCity)
  .patch(updateCity)
  .delete(deleteCity)

module.exports = router
