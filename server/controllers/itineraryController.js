const Itinerary = require('../models/itineraryModel')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('../utils/appError')
const multer = require('multer')
const sharp = require('sharp')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllItineraries = getAll(Itinerary)
exports.getItinerary = getOne(Itinerary, { path: 'activities' })
exports.createItinerary = createOne(Itinerary)
exports.deleteItinerary = deleteOne(Itinerary)
exports.updateItinerary = updateOne(Itinerary)

// CRUD controllers for custom routes -- still to refactor

// gets ITINERARIES for a given city
exports.getCityItineraries = async (req, res) => {
  try {
    let cityRequested = req.params.city_name
    const itineraries = await Itinerary.find({ city: cityRequested })
    res.status(200).json({
      status: 'success',
      data: { itineraries },
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// multer middleware set up - upload images
const multerStorage = multer.memoryStorage()

// test for file type
const multerFilter = (req, file, cb) => {
  file.mimetype.startsWith('image')
    ? cb(null, true)
    : cb(
        new AppError('Not an image! Please upload image type file only', 400),
        false,
      )
}

const upload = multer({
  storage: multerStorage,
  limits: { fieldSize: 25 * 1024 * 1024 },
  fileFilter: multerFilter,
})

exports.uploadCoverImg = upload.single('coverImg')

exports.resizeCoverImg = asyncErrorCatcher(async (req, res, next) => {
  if (!req.file) return next()

  req.file.filename = `cover-itinerary${req.body.title}-${Date.now()}.jpeg`

  await sharp(req.file.buffer)
    .resize(1300, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/${req.file.filename}`)

  next()
})
