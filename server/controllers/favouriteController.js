const Favourite = require('../models/favouriteModel')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('../utils/appError')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllFavourites = getAll(Favourite, {
  path: 'user, city, itinerary, activity, comments',
})
exports.getFavourite = getOne(Favourite, { path: 'favourites' })
exports.addFavourite = createOne(Favourite)
exports.deleteFavourite = deleteOne(Favourite)
exports.updateFavourite = updateOne(Favourite)

// gets FAVOURITES  by userId
exports.getfavouritesByUser = asyncErrorCatcher(async (req, res, next) => {
  const userFavourites = await Favourite.find({ author: req.params.user })

  if (!userFavourites) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: userFavourites.length,
    data: userFavourites,
  })
})

// gets FAVOURITES  by cityId
exports.getfavouritesByCity = asyncErrorCatcher(async (req, res, next) => {
  const cityFavourites = await Favourite.find({ city: req.params.city })

  if (!cityFavourites) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: cityFavourites.length,
    data: cityFavourites,
  })
})

// gets FAVOURITES  by itineraryId
exports.getfavouritesByItinerary = asyncErrorCatcher(async (req, res, next) => {
  const itineraryFavourites = await Favourite.find({
    itinerary: req.params.itinerary,
  })

  if (!itineraryFavourites) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: itineraryFavourites.length,
    data: itineraryFavourites,
  })
})

// gets FAVOURITES  by activityId
exports.getfavouritesByActivity = asyncErrorCatcher(async (req, res, next) => {
  const activityFavourites = await Favourite.find({
    activity: req.params.activity,
  })

  if (!activityFavourites) {
    return next(new AppError('No documents found', 404))
  }
  res.status(200).json({
    status: 'success',
    results: activityFavourites.length,
    data: activityFavourites,
  })
})
