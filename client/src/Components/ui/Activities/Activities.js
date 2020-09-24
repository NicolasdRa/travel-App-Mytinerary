import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper
} from '@material-ui/core'
import ActivityGallery from './ActivityGallery'
import ListingHeader from '../Headers/ListingHeader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: '3rem'
  },

  searchbarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.beigeLight,
    padding: '1rem 1rem',
    margin: '-.5rem 0 0 0'
  },

  searchBarTitle: {
    color: theme.palette.primary.main,
    fontSize: '.9rem',
    fontWeight: '500',
    textAlign: 'left',
    margin: '0 0 .5rem .5rem'
  },

  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '5px'
  },

  subtitle: {
    margin: '2rem auto .5rem 1.5rem',
    textAlign: 'start'
  },

  loader: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5rem 5rem'
  }
}))

const Activities = () => {
  const classes = useStyles()
  const activities = useSelector(state => state.activities.activities.data)
  console.log(activities)

  const [string, setString] = useState('')
  const [city, setCity] = useState(null)

  const handleChange = e => {
    // updates string in state
    setString(e.target.value.toLowerCase())
  }

  // filter function
  let filteredActivities = []
  if (activities !== null) {
    filteredActivities = [
      ...activities.filter(activity => {
        return activity.city.name.toLowerCase().startsWith(string)
      })
    ]

    function generateRandomInteger (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }

    const randomNumber = generateRandomInteger(0, activities.length - 1)
    let headerActivity = null
    activities === null
      ? (headerActivity = activities[randomNumber])
      : (headerActivity = filteredActivities[0])

    return (
      <Grid
        container
        direction='column'
        // justify='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid item xs={12} container direction='column' justify='center'>
          <ListingHeader data={headerActivity} className={classes.header} />
          <Paper
            elevation={2}
            variant='outlined'
            className={classes.searchbarContainer}
          >
            <Typography className={classes.searchBarTitle}>
              Want to have fun?
            </Typography>

            <TextField
              id='outlined-helperText'
              label='Search activities by City Name..'
              defaultValue=''
              variant='outlined'
              onChange={handleChange}
              color='primary'
              className={classes.searchBar}
            />
          </Paper>
        </Grid>
        <Grid container item xs={12}>
          <Typography variant='subtitle2' className={classes.subtitle}>
            Most popular Activities
          </Typography>
          <ActivityGallery
            string={string}
            activities={activities.sort((a, b) => b.likes - a.likes)}

            //    {filteredItineraries
            //   .map(filteredItineraries.activities)
            //   .sort((a, b) => (a.likes > b.likes ? -1 : 1))}
          />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid
        container
        className={classes.loader}
        direction='column'
        justify='center'
        alignjustify='center'
      >
        <Typography>Loading activities...</Typography>
        <CircularProgress color='secondary' />
      </Grid>
    )
  }
}

export default Activities
