const express = require('express')
const router = express.Router()
const {
  getAllCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
  getCityByName,
} = require('../controllers/cityController')
const { restrict } = require('../controllers/authController')

// ------------------------------------- //
// ROUTES

router.route('/').get(getAllCities).post(createCity)

router
  .route('/:name')
  .get(getCity)
  .patch(restrict('admin'), updateCity)
  .delete(restrict('admin'), deleteCity)

router.route('/name/:city_name').get(getCityByName)

module.exports = router
