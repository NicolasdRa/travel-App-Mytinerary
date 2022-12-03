const express = require('express')
const {
  getAllFavourites,
  getFavourite,
  addFavourite,
  updateFavourite,
  deleteFavourite,
} = require('../controllers/favouriteController')
const { restrict, protect } = require('../controllers/authController')

// ------------------------------------- //
// ROUTES
const router = express.Router({ mergeParams: true })

router.route('/').get(getAllFavourites).post(protect, addFavourite)

router
  .route('/:id')
  .get(getFavourite)
  .patch(restrict('admin'), updateFavourite)
  .delete(protect, deleteFavourite)

module.exports = router
