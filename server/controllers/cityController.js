const City = require('../models/cityModel')
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
exports.getAllCities = getAll(City)
exports.getCity = getOne(City)
exports.createCity = createOne(City)
exports.deleteCity = deleteOne(City)
exports.updateCity = updateOne(City)

// CRUD controllers for special routes -- still to be implemented

// gets ITINERARY by title
exports.getCityByName = asyncErrorCatcher(async (req, res, next) => {
  let city = await City.findOne({ name: req.params.city_name }).populate(
    'comments'
  )

  if (!city) {
    return next(new AppError('No document found with that name', 404))
  }

  // code below replaced by pre-middleware in model
  // const populateOptions = { path: "activities" };
  // if (populateOptions) itinerary = itinerary.populate(populateOptions);

  res.status(200).json({
    status: 'success',
    data: city,
  })
})
