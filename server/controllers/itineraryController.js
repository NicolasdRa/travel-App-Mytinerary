const Itinerary = require('../models/itineraryModel')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('../utils/appError')

// const sharp = require('sharp')
const uploadCoverImageCloudinary = require('../middleware/cloudinary')
const formatBufferToBase64 = require('../utils/dataUri')

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllItineraries = getAll(Itinerary)
exports.getItinerary = getOne(Itinerary, { path: 'activities comments' })
exports.createItinerary = createOne(Itinerary)
exports.deleteItinerary = deleteOne(Itinerary)
exports.updateItinerary = updateOne(Itinerary)

// CRUD controllers for custom routes -- still to refactor

// gets ITINERARIES for a given city
exports.getCityItineraries = asyncErrorCatcher(async (req, res, next) => {
  const itineraries = await Itinerary.find({ city: req.params.city_name })
  res.status(200).json({
    status: 'success',
    data: { itineraries },
  })
  if (!itineraries) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: itineraries.length,
    data: itineraries,
  })
})

// gets ITINERARIES by userId
exports.getItinerariesByUser = asyncErrorCatcher(async (req, res, next) => {
  const itineraries = await Itinerary.find({ author: req.params.user })
  console.log(req.params)

  if (!itineraries) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: itineraries.length,
    data: itineraries,
  })
})

// gets ITINERARY by title
exports.getItineraryByTitle = asyncErrorCatcher(async (req, res, next) => {
  let itinerary = await Itinerary.findOne({ title: req.params.title }).populate(
    'comments'
  )

  if (!itinerary) {
    return next(new AppError('No document found with that title', 404))
  }

  // code below replaced by pre-middleware in model
  // const populateOptions = { path: "activities" };
  // if (populateOptions) itinerary = itinerary.populate(populateOptions);

  res.status(200).json({
    status: 'success',
    data: itinerary,
  })
})

// gets ITINERARY by id
exports.getItineraryById = asyncErrorCatcher(async (req, res, next) => {
  let itinerary = await Itinerary.findById({ _id: req.params.id })

  if (!itinerary) {
    return next(new AppError('No document found with that title', 404))
  }

  // code below replaced by pre-middleware in model
  // const populateOptions = { path: 'comments' }
  // if (populateOptions) itinerary = itinerary.populate(populateOptions)

  res.status(200).json({
    status: 'success',
    data: itinerary,
  })
})

// upload to cloudinary
exports.uploadCoverImage = asyncErrorCatcher(async (req, res, next) => {
  if (!req.file) return next()

  const base64 = formatBufferToBase64(req.file)
  const result = await uploadCoverImageCloudinary(base64.content)

  req.body.img = result.secure_url
  req.body.cloudinary_id = result.public_id

  next()
})

// unnecessay after implementing upload to cloudinary
// // img resize middleware
// exports.resizeCoverImg = asyncErrorCatcher(async (req, res, next) => {
//   if (!req.file) return next()

//   req.file.filename = `itineraryCover-${req.body.title}-${Date.now()}.jpeg`

//   await sharp(req.file.buffer)
//     .resize(1300, 800)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     // .toFile(`public/${req.file.filename}`)
//     .toBuffer((err, data, info) => {
//       return data
//     })

//   next()
// })
