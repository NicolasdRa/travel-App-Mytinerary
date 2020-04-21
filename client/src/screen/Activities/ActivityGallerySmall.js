import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'typeface-roboto'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ActivityCardSmall from './ActivityCardSmall'

const useStyles = makeStyles(() => ({
  activity_gallery: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    /* height: fit-content; */
    /* z-index: 5; */
    overflowX: 'auto'
  },

  info_display: { textAlign: 'center', margin: '1rem 0' },

  text_btn: { margin: '1rem auto 0 auto' }
}))

const ActivityGallerySmall = props => {
  const { itinerary } = props
  const { city, activities } = itinerary
  const classes = useStyles()

  console.log(itinerary)
  console.log(itinerary.activities.length)

  if (activities.length > 0) {
    // itineraries={filteredItineraries.sort((a, b) =>
    //   a.likes > b.likes ? -1 : 1
    // )}

    return (
      <React.Fragment>
        <Typography className={classes.info_display}>
          {itinerary.activities.length} activities found for "{itinerary.title}"
        </Typography>
        <div className={classes.activity_gallery}>
          {activities.map(activity => (
            <ActivityCardSmall activity={activity} key={activity._id} />
          ))}
        </div>
        <Button
          size='small'
          color='secondary'
          component={Link}
          to={'/itineraries/' + city}
          className={classes.text_btn}
        >
          VIEW MORE
        </Button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Typography className={classes.info_display}>
          No activities found for "{itinerary.title}"
        </Typography>
        <Button
          size='small'
          color='secondary'
          component={Link}
          to={'/itineraries/' + city}
          className={classes.text_btn}
        >
          VIEW MORE
        </Button>
      </React.Fragment>
    )
  }
}

export default ActivityGallerySmall
