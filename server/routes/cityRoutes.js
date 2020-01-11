const express = require('express')
const router = express.Router()
const cityModel = require('../models/cityModel')

// /*gets all cities*/
router.get('/all', (req, res) => {
  cityModel
    .find({})
    .then(files => {
      res.send(files)
    })
    .catch(err => console.log(err))
})

// // /*gets ONE city by name*/
// router.get('/:name',
// 	(req, res) => {
//   		let cityRequested = req.params.name;
//   		cityModel.findOne({ name: cityRequested })
// 			.then(city => {
// 				res.send(city)
// 			})
// 			.catch(err => console.log(err));
// });

// adds a new city in the DB
router.post('/', (req, res) => {
  if (
    req.body.name !=
    cityModel.find({
      name: req.body.name
    })
  ) {
    cityModel
      .create({
        name: req.body.name,
        country: req.body.country,
        img: req.body.img
      })
      .then(city => {
        res.send(city)
      })

      .catch(function (err) {
        if (
          req.body.name !=
          cityModel.find({
            name: req.body.name
          })
        ) {
          res.status(422).send('This city is already on our list')
          console.log(err)
        } else {
          res.status(500).send('Server error')
          console.log(err)
        }
      })
  }
})

module.exports = router
