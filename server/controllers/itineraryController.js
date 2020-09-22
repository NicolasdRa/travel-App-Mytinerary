const Itinerary = require('../models/itineraryModel')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
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
      data: { itineraries }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}
