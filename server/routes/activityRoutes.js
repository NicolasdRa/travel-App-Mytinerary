const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityByTitle,
  getActivitiesByUser,
  getItineraryActivities,
  getCityActivities,
  uploadCoverImage,
} = require('../controllers/activityController')

const upload = require('../middleware/multer')
const { protect } = require('../controllers/authController')
const favouriteRouter = require('../routes/favouriteRoutes')
const commentRouter = require('../routes/commentRoutes')

// ------------------------------------- //

// Nested routes
router.use('/:activityId/favourites', favouriteRouter)
router.use('/:activityId/comments', commentRouter)

// Routes
router
  .route('/')
  .get(getAllActivities)
  .post(protect, upload.single('img'), uploadCoverImage, createActivity)

router
  .route('/:id')
  .get(getActivity)
  .patch(protect, updateActivity)
  .delete(protect, deleteActivity)

router.route('/itinerary/:itinerary_name').get(getItineraryActivities)
router.route('/city/:city_name').get(getCityActivities)
router.route('/title/:title').get(getActivityByTitle)
router.route('/user/:userId').get(getActivitiesByUser)

module.exports = router
