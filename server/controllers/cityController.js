const City = require('../models/cityModel')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllCities = getAll(City)
exports.getCity = getOne(City)
exports.createCity = createOne(City)
exports.deleteCity = deleteOne(City)
exports.updateCity = updateOne(City)

// CRUD controllers for custom routes -- still to implement
