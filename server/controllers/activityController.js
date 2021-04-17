const Activity = require('../models/activityModel')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('../utils/appError')

// const sharp = require('sharp')
const { uploadCoverImageCloudinary } = require('../middleware/cloudinary')
const formatBufferToBase64 = require('../utils/dataUri')

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllActivities = getAll(Activity)
exports.getActivity = getOne(Activity, { path: 'comments itinerary' })
exports.createActivity = createOne(Activity)
exports.deleteActivity = deleteOne(Activity)
exports.updateActivity = updateOne(Activity)

// CRUD controllers for custom routes -- still to refactor

// gets ACTIVITY by title
exports.getActivityByTitle = asyncErrorCatcher(async (req, res, next) => {
  let activity = await Activity.findOne({ title: req.params.title }).populate(
    'comments favourites'
  )

  if (!activity) {
    return next(new AppError('No document found with that title', 404))
  }

  // code below replaced by pre-middleware in model
  // const populateOptions = { path: "activities" };
  // if (populateOptions) itinerary = itinerary.populate(populateOptions);

  res.status(200).json({
    status: 'success',
    data: activity,
  })
})

// gets ITINERARIES by userId
exports.getActivitiesByUser = asyncErrorCatcher(async (req, res, next) => {
  const activities = await Activity.find({ author: req.params.user })

  if (!activities) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: activities.length,
    data: activities,
  })
})

// // gets ACTIVITY by id
// exports.getActivityById = asyncErrorCatcher(async (req, res, next) => {
//   let activity = await Activity.findById({ _id: req.params.id })

//   if (!itinerary) {
//     return next(new AppError('No document found with that title', 404))
//   }

//   // code below replaced by pre-middleware in model
//   // const populateOptions = { path: 'comments' }
//   // if (populateOptions) itinerary = itinerary.populate(populateOptions)

//   res.status(200).json({
//     status: 'success',
//     data: activity,
//   })
// })

// gets ITINERARIES for a given city
exports.getItineraryActivities = asyncErrorCatcher(async (req, res, next) => {
  const activities = await Activity.find({
    itinerary: req.params.itinerary_title,
  })
  // res.status(200).json({
  //   status: 'success',
  //   data: { activities },
  // })
  if (!activities) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: activities.length,
    data: activities,
  })
})

// gets ITINERARIES for a given city
exports.getCityActivities = asyncErrorCatcher(async (req, res, next) => {
  const activities = await Activity.find({ city: req.params.city_name })
  // res.status(200).json({
  //   status: 'success',
  //   data: { activities },
  // })
  if (!activities) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: activities.length,
    data: activities,
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
