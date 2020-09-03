const City = require('../models/cityModel')

// get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find()
    res.status(201).json({
      status: 'success',
      results: cities.length,
      data: {
        cities
      }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// get one city (choose best alternative: by name or by id)
exports.getCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id)
    // const city = await City.findOne({ name: req.params.name })
    res.status(201).json({
      status: 'success',
      data: {
        city
      }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

// adds a new city in the DB
exports.postCity = async (req, res) => {
  try {
    const newCity = await City.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        city: newCity
      }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.status(200).json({
      status: 'success',
      data: { city }
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}

exports.deleteCity = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id, res.body)

    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error })
  }
}
