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
const activityRouter = require('../routes/activityRoutes')
const favouriteRouter = require('../routes/favouriteRoutes')
const commentRouter = require('../routes/commentRoutes')

// ------------------------------------- //

// Nested routes
router.use('/:cityId/favourites', favouriteRouter)
router.use('/:cityId/comments', commentRouter)
router.use('/:cityId/activities', activityRouter)

// Routes
router.route('/').get(getAllCities).post(createCity)

router
  .route('/:name')
  .get(getCity)
  .patch(restrict('admin'), updateCity)
  .delete(restrict('admin'), deleteCity)

router.route('/name/:city_name').get(getCityByName)

module.exports = router
