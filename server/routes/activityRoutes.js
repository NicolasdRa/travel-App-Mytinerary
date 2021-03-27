const express = require('express')
const {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityByTitle,
} = require('../controllers/activityController')

const router = express.Router({ mergeParams: true })

// ------------------------------------- //
// ROUTES

router.route('/').get(getAllActivities).post(createActivity)

router
  .route('/:id')
  .get(getActivity)
  .patch(updateActivity)
  .delete(deleteActivity)

router.route('/title/:title').get(getActivityByTitle)

module.exports = router
