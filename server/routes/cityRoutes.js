const express = require('express')
const router = express.Router()
const {
  getAllCities,
  getCity,
  postCity,
  updateCity,
  deleteCity
} = require('../controllers/cityControllers')

// ------------------------------------- //
// ROUTES

router
  .route('/')
  .get(getAllCities)
  .post(postCity)

router
  .route('/:id')
  .get(getCity)
  .patch(updateCity)
  .delete(deleteCity)

module.exports = router
