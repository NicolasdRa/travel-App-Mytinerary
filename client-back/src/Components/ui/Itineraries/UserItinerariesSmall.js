import React from 'react'
import { useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import ItineraryCardSmall from '../Itineraries/ItineraryCardSmall'
import { selectCurrentUser } from '../../Redux/usersSlice'

import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles(() => ({
  text: {
    margin: '.5rem',
    textAlign: 'left',
  },

  gallery: {
    position: 'relative',
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    width: 'auto',
    overflowX: 'auto',
  },
}))

const UserItinerariesSmall = () => {
  const classes = useStyles()

  const { itineraries } = useSelector(selectCurrentUser)

  // FIXME: when user loads for the first time profile page loads user itinerarie, but when it from profile screen it updates profile image or cover image it doesnt loads itineraries: implemented quick fix below: itineraries && itineraries.length > 0

  if (itineraries && itineraries.length > 0) {
    return (
      <Box>
        <Typography variant="body2" className={classes.text}>
          My itineraries
        </Typography>
        <Box className={classes.gallery}>
          {itineraries.map((itinerary) => (
            <ItineraryCardSmall itinerary={itinerary} key={itinerary._id} />
          ))}
        </Box>
      </Box>
    )
  } else {
    return (
      <Typography variant="body1" className={classes.text}>
        No contributions found. Create your itineraries and help the community
        grow.
      </Typography>
    )
  }
}

export default UserItinerariesSmall
