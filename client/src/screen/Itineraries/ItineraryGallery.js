import React from 'react'
import 'typeface-roboto'
import { makeStyles } from '@material-ui/core/styles'
import ItineraryCard from './ItineraryCard'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  itinerary_gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '.5rem .5rem 4rem .5rem'
  }
}))

const ItineraryGallery = props => {
  const { itineraries, string } = props
  const classes = useStyles()

  if (itineraries.length > 0) {
    return (
      <div className={classes.itinerary_gallery}>
        {itineraries.map(itinerary => (
          <ItineraryCard itinerary={itinerary} key={itinerary._id} />
        ))}
      </div>
    )
  } else {
    return (
      <Typography style={{ margin: '1rem 0 .5rem 1rem', textAlign: 'center' }}>
        No itineraries found for {string}
      </Typography>
    )
  }
}

export default ItineraryGallery
