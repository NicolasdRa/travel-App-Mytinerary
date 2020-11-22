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
  uploadUserImg,
  resizeUserImg,
  uploadCoverImg,
  resizeCoverImg,
  updateCoverImg,
} = require('../controllers/userController')
const { protect, restrict } = require('../controllers/authController')

const router = express.Router()

// protects ruotes below this point
router.use(protect)

router.route('/me').get(getMe, getUser)
router.patch('/updateMe', uploadUserImg, resizeUserImg, updateMe)
router.patch('/updateCover', uploadCoverImg, resizeCoverImg, updateCoverImg)

router.delete('/deleteMe', deleteMe)

// admin routes
router.route('/').get(getAllUsers).post(restrict('admin'), createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(restrict('admin'), updateUser)
  .delete(restrict('admin'), deleteUser)

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
