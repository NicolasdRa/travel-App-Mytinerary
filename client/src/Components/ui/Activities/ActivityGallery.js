import React from 'react'
import 'typeface-roboto'
import { makeStyles } from '@material-ui/core/styles'

import ActivityCard from './ActivityCard'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  activity_gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '3rem'
  }
}))

const ActivityGallery = props => {
  const classes = useStyles()
  const { activities, string } = props

  if (activities.length > 0) {
    return (
      <div className={classes.activity_gallery}>
        {activities.map(activity => (
          <ActivityCard activity={activity} key={activity._id} />
        ))}
      </div>
    )
  } else {
    return (
      <Typography style={{ margin: '1rem 0 .5rem 1rem', textAlign: 'center' }}>
        No activities found for {string}
      </Typography>
    )
  }
}

export default ActivityGallery
