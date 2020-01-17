import React from 'react'
import 'typeface-roboto'
import CityCard from '../CityCard/CityCard'
import './CityGallery.css'

const CityGallery = props => {
  const { cities } = props

  return (
    <div className='gallery'>
      {cities.map(city => (
        <CityCard city={city} key={city._id} />
      ))}
    </div>
  )
}

export default CityGallery
