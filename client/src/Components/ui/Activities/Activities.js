import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selectAllActivities } from '../../Redux/activitiesSlice'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@material-ui/core'

import ActivityGallery from './ActivityGallery'
import ListingHeader from '../Headers/ListingHeader'

import { randomNumberGenerator } from '../../utils/utils'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: '3rem',
  },

  searchbarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.beigeLight,
    padding: '1rem 1rem',
    margin: '-.5rem 0 0 0',
  },

  searchBarTitle: {
    color: theme.palette.primary.main,
    fontSize: '.9rem',
    fontWeight: '500',
    textAlign: 'left',
    margin: '0 0 .5rem .5rem',
  },

  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '5px',
  },

  subtitle: {
    margin: '2rem auto .5rem 1.5rem',
    textAlign: 'start',
  },

  loader: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5rem 5rem',
  },
}))

const Activities = () => {
  const classes = useStyles()

  const activities = useSelector(selectAllActivities)

  const [string, setString] = useState('')
  const [headerActivity, setHeaderActivity] = useState(null)
  const [filteredActivities, setFilteredActivities] = useState(null)

  useEffect(() => {
    // random cover image
    const randomNumber = randomNumberGenerator(0, activities.length - 1)

    filteredActivities === null
      ? setHeaderActivity(activities[randomNumber])
      : setHeaderActivity(filteredActivities[0])
  }, [activities, filteredActivities])

  useEffect(() => {
    // itinerary filter
    if (string !== '') {
      const filtered = activities.filter((activity) =>
        activity.city.toLowerCase().startsWith(string),
      )
      setFilteredActivities(filtered)
    }
    // clean up: when string is empty
    return () => {
      setFilteredActivities(null)
    }
  }, [activities, string])

  // updates string in state
  const handleChange = (e) => {
    setString(e.target.value.toLowerCase())
  }

  console.log('Activities Tab Rendered')

  if (!activities) {
    return (
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignjustify="center">
        <Typography>Loading activities...</Typography>
        <CircularProgress color="secondary" />
      </Grid>
    )
  }

  return (
    <Grid
      container
      direction="column"
      // justify='center'
      alignItems="center"
      className={classes.container}>
      <Grid item xs={12} container direction="column" justify="center">
        {headerActivity ? (
          <ListingHeader data={headerActivity} className={classes.header} />
        ) : null}
        <Paper
          elevation={2}
          variant="outlined"
          className={classes.searchbarContainer}>
          <Typography className={classes.searchBarTitle}>
            Want to have fun?
          </Typography>

          <TextField
            id="outlined-helperText"
            label="Search activities by City Name.."
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            color="primary"
            className={classes.searchBar}
          />
        </Paper>
      </Grid>
      <Grid container item xs={12}>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {string === '' ? 'Most popular Activities' : 'Search results'}
        </Typography>
        <ActivityGallery string={string} activities={activities} />
      </Grid>
    </Grid>
  )
}

export default Activities
