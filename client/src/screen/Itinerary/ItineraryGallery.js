import React from 'react'
import 'typeface-roboto'
import ItineraryCard from './ItineraryCard'
// import { connect } from 'react-redux'
// import { fetchItineraries } from '../../store/actions/itineraryActions'

const ItineraryGallery = props => {
  const { itineraries } = props

  return itineraries.map(itinerary => (
    <ItineraryCard itinerary={itinerary} key={itinerary._id} />
  ))
}

export default ItineraryGallery
