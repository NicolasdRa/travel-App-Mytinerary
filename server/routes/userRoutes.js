const express = require('express')
const router = express.Router({ mergeParams: true })
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadProfileImage,
  uploadProfileCoverImage,
} = require('../controllers/userController')

const upload = require('../middleware/multer')
const { protect, restrict } = require('../controllers/authController')
const favouriteRouter = require('../routes/favouriteRoutes')

// Nested routers
router.use('/:userId/favourites', favouriteRouter)

// protects ruotes below this point
router.use(protect)

router.route('/me').get(getMe, getUser)
router.route('/updateMe').patch(
  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 },
  ]),
  uploadProfileImage,
  uploadProfileCoverImage,
  updateMe
)

router.delete('/deleteMe', deleteMe)

// admin routes
router.route('/').get(getAllUsers).post(restrict('admin'), createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(restrict('admin'), updateUser)
  .delete(restrict('admin'), deleteUser)

module.exports = router
