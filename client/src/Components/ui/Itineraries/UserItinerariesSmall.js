import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'typeface-roboto'
import { Box, Typography } from '@material-ui/core'
import ActivityCardSmall from '../Activities/ActivityCardSmall'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  text: {
    margin: '.5rem',
    textAlign: 'left'
  },

  gallery: {
    position: 'relative',
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    width: 'auto',
    /* height: fit-content; */
    /* z-index: 5; */
    overflowX: 'auto'
  }
}))

const UserItinerariesSmall = () => {
  const classes = useStyles()
  const user = useSelector(state => state.auth.user)
  const itineraries = useSelector(state => state.itineraries.itineraries)

  // const { _id } = user
  // const filteredItineraries = itineraries.filter(
  //   itineraries => itineraries.user._id === user._id
  // )

  if (itineraries != null) {
    return (
      <Box>
        <Typography variant='body2' className={classes.text}>
          My contributions
        </Typography>
        <Box className={classes.gallery}>
          {/* {filteredItineraries.map(itinerary => ( */}
          {itineraries.map(itinerary => (
            <ActivityCardSmall activity={itinerary} key={itinerary._id} />
          ))}
        </Box>
      </Box>
    )
  } else {
    return (
      <Typography variant='body1' className={classes.text}>
        No contributions found. Create your itineraries and help the community
        grow.
      </Typography>
    )
  }
}

export default UserItinerariesSmall