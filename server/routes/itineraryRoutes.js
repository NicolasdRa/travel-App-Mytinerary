const express = require('express')
const router = express.Router()

const {
  getAllItineraries,
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItineraryByTitle,
  getItineraryById,
  getCityItineraries,
  uploadCoverImage,
  getItinerariesByUser,
} = require('../controllers/itineraryController')

const upload = require('../middleware/multer')
const { protect } = require('../controllers/authController')
const activityRouter = require('./activityRoutes')
const favouriteRouter = require('./favouriteRoutes')
const commentRouter = require('./commentRoutes')

// ------------------------------------- //

// Nested routes
router.use('/:itineraryId/activities', activityRouter)
router.use('/:itineraryId/favourites', favouriteRouter)
router.use('/:itineraryId/comments', commentRouter)

// Routes
router
  .route('/')
  .get(getAllItineraries)
  .post(protect, upload.single('img'), uploadCoverImage, createItinerary)

router
  .route('/:id')
  .get(getItinerary)
  .patch(protect, updateItinerary)
  .delete(protect, deleteItinerary)

router.route('/city/:city_name').get(getCityItineraries)
router.route('/title/:title').get(getItineraryByTitle)
router.route('/user/:userId').get(getItinerariesByUser)

module.exports = router
