const express = require('express')
const router = express.Router()
const auth = require('./middleware/auth')
const multer = require('multer')
const {
  getAllItineraries,
  postItinerary,
  getItinerary,
  updateItinerary,
  deleteItinerary,
  getCityItineraries
} = require('../controllers/itineraryController')

// ------------------------------------- //
// Middleware

// Sets up Multer Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    )
  }
})

const uploadFileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('please only upload .png or .jpg files'), false)
  }
}

// Initialize upload (Multer)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: uploadFileFilter
})

// Param middleware
// router.param('id', checkID)

// ------------------------------------- //
// Routes
router
  .route('/')
  .get(getAllItineraries)
  .post([auth, upload.single('img')], postItinerary)

router
  .route('/:id')
  .get(getItinerary)
  .put(auth, updateItinerary)
  .delete(auth, deleteItinerary)

router.route('/:city_name').get(getCityItineraries)

module.exports = router
