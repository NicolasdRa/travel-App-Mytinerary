const mongoose = require('mongoose')
const itinerarySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        unique: true
    },   
    title: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hashtags: {
        type: String,
        required: false
    },
})

// Hint: each itinerary should have a title, a profile picture(URL), a rating, a duration, a price and some hashtags. Try to think about the most suitable data type for each of these parameters.

//name of module is the singular version (itinerary) of the database name (itinerary)
module.exports = mongoose.model('itinerary', itinerarySchema)