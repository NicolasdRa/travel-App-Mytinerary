const express = require('express')
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto
} = require('../controllers/userController')
const { protect } = require('../controllers/authController')

// const passport = require('passport')

const router = express.Router()

// protects ruotes below this point
router.use(protect)

router
  .route('/me')
  .get(getMe, getUser)
  .patch(updateMe)
  .delete(deleteMe)

// admin routes
// router.use(restrictTo('admin'))
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router

// // HTTP POST /users/favourites/itinerary Post favourites ITINERARY.

// router.get('/favourites/all', (req, res) => {
//   let _id = req.body.id
//     .find({user: _id})
//     .then(itineraryArray => {
//       res.send(itineraryArray)
//     })
//     .catch(err => console.log(err))
// })

// // HTTP POST /users/favourites/itinerary — Post favourite ITINERARY.

// // /*gets ITINERARIES from ONE city*/
// router.get('/:city_name', (req, res) => {
//   let cityRequested = req.params.city_name
//   itineraryModel
//     .find({ city: cityRequested })
//     .then(itineraryArray => {
//       res.send(itineraryArray)
//     })
//     .catch(err => console.log(err))
// })
