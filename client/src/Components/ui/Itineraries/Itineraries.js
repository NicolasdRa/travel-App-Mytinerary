import React, { useState } from 'react'
import 'typeface-roboto'
import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import ItineraryGallery from './ItineraryGallery'
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

const Itineraries = () => {
  const classes = useStyles()

  const itineraries = useSelector(state => state.itineraries.itineraries.data)

  const [string, setString] = useState('')
  const [city, setCity] = useState(null)

  const handleChange = e => {
    // updates string in state
    setString(e.target.value.toLowerCase())
  }

  // filter function
  let filteredItineraries = []
  if (itineraries !== null) {
    filteredItineraries = [
      ...itineraries.filter(itinerary => {
        return itinerary.city.name.toLowerCase().startsWith(string)
      })
    ]

    function generateRandomInteger (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }

    const randomNumber = generateRandomInteger(0, itineraries.length - 1)

    let headerItinerary = null

    city === null
      ? (headerItinerary = itineraries[randomNumber])
      : (headerItinerary = filteredItineraries[0])

    return (
      <Grid
        container
        direction='column'
        // justify='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid item xs={12} container direction='column' justify='center'>
          <ListingHeader data={headerItinerary} className={classes.header} />
          <Paper
            elevation={2}
            variant='outlined'
            className={classes.searchbarContainer}
          >
            <Typography className={classes.searchBarTitle}>
              Choose your route
            </Typography>
            <TextField
              id='outlined-helperText'
              label='Search City..'
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
            Most popular Itineraries
          </Typography>
          <ItineraryGallery
            string={string}
            itineraries={filteredItineraries.sort((a, b) => a.likes - b.likes)}
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
        <Typography>Loading itineraries...</Typography>
        <CircularProgress color='secondary' />
      </Grid>
    )
  }
}

export default Itineraries
