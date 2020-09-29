const express = require('express')
const router = express.Router()
const {
  getAllCities,
  getCity,
  createCity,
  updateCity,
  deleteCity
} = require('../controllers/cityController')
const { restrict } = require('../controllers/authController')

// ------------------------------------- //
// ROUTES

router
  .route('/')
  .get(getAllCities)
  .post(createCity)

router
  .route('/:id')
  .get(getCity)
  .patch(restrict('admin'), updateCity)
  .delete(restrict('admin'), deleteCity)

module.exports = router
