const express = require('express')
const router = express.Router()
const auth = require('./middleware/auth')
const multer = require('multer')
const itineraryModel = require('../models/itineraryModel')

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

// /*gets all itineraries*/
router.get('/all', (req, res) => {
  itineraryModel
    .find({})
    .then(itineraryArray => {
      res.send(itineraryArray)
    })
    .catch(err => console.log(err))
})

// /*gets ITINERARIES from ONE city*/
router.get('/:city_name', (req, res) => {
  let cityRequested = req.params.city_name
  itineraryModel
    .find({ city: cityRequested })
    .then(itineraryArray => {
      res.send(itineraryArray)
    })
    .catch(err => console.log(err))
})

// adds a new itinerary to the DB
router.post('/add', [auth, upload.single('img')], async (req, res) => {
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
    const itinerary = await itineraryModel.create({
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
    res.json(itinerary)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }
})

// updates an itinerary in the DB
router.put('/edit/:id', auth, async (req, res) => {
  // const path = req.file.path
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
    let itinerary = await itineraryModel.findById(req.params.id)
    console.log(itinerary)

    if (!itinerary) {
      return res.status(404).json({ msg: 'itinerary nor found' })
    }

    // Authentication
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
    itinerary = await itineraryModel.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    )
    res.json(itinerary)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }
})

// deletes an itinerary from the DB
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    let itinerary = await itineraryModel.findById(req.params.id)
    console.log(itinerary)

    if (!itinerary) {
      return res.status(404).json({ msg: 'itinerary nor found' })
    }

    // Authentication
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
    await itineraryModel.findByIdAndRemove(req.params.id)
    res.json({ msg: 'Itinerary successfully removed' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
