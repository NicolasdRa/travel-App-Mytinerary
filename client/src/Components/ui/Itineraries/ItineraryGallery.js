import React from 'react'
import ItineraryCard from './ItineraryCard'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  gallery: {
    postion: 'relative',
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    width: 'auto',
    overflowX: 'auto'
  }
}))

const ItineraryGallery = props => {
  const { itineraries, string } = props
  const classes = useStyles()

  if (itineraries.length > 0) {
    return (
      <div className={classes.gallery}>
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
