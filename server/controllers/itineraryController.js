const Itinerary = require('../models/itineraryModel')

// gets all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find()
    res.status(201).json({
      status: 'success',
      results: itineraries.length,
      data: {
        itineraries
      }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// get ONE itinerary by Id
exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)

    res.status(201).json({
      status: 'success',
      data: {
        itinerary
      }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// creates new itinerary
exports.postItinerary = async (req, res) => {
  const path = req.file.path
  const {
    city,
    title,
    img,
    duration,
    price,
    category,
    details,
    activities,
    user
  } = req.body

  try {
    const newItinerary = await Itinerary.create({
      city,
      title,
      img: path,
      duration,
      price,
      category,
      details,
      activities,
      user: req.user.id
    })
    res.status(201).json({
      status: 'success',
      data: {
        itinerary: newItinerary
      }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// updates itinerary
exports.updateItinerary = async (req, res) => {
  const {
    city,
    title,
    img,
    duration,
    price,
    category,
    details,
    activities,
    user
  } = req.body

  // Builds update Object
  const contactFields = {}
  if (city) contactFields.city = city
  if (title) contactFields.title = title
  if (img) contactFields.img = img
  if (duration) contactFields.duration = duration
  if (price) contactFields.price = price
  if (category) contactFields.category = category
  if (details) contactFields.details = details
  if (activities) contactFields.activities = activities

  try {
    let itinerary = await Itinerary.findById(req.params.id)

    if (!itinerary) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Itinerary nor found' })
    }

    // Authentication
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ status: 'fail', message: 'Not authorized' })
    }

    itinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    )

    res.status(200).json({
      status: 'success',
      data: { itinerary }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// deletes itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    let itinerary = await Itinerary.findById(req.params.id)
    if (!itinerary) {
      return res.status(404).json({ msg: 'itinerary nor found' })
    }

    // Authentication
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Itinerary.findByIdAndDelete(req.params.id, res.body)
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// gets ITINERARIES from a given city
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
