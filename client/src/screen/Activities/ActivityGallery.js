import React from 'react'
import 'typeface-roboto'
import ActivityCard from './ActivityCard'
import './ActivityGallery.css'

const CityGallery = props => {
  const { activities } = props
  console.log(activities)
  return (
    <div className='activity_gallery'>
      {activities.map(activity => (
        <ActivityCard activity={activity} key={activity._id} />
      ))}
    </div>
  )
}

export default CityGallery
