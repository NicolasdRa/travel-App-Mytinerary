import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@material-ui/core'

import { CardGallery } from '../CardGallery/CardGallery'
import ListingHeader from '../Headers/ListingHeader'

import { randomNumberGenerator } from '../../utils/utils'
import { selectAllItineraries } from '../../Redux/itinerariesSlice'

import { useStyles } from './styles'

const Itineraries = () => {
  const classes = useStyles()

  const itineraries = useSelector(selectAllItineraries)

  const [string, setString] = useState('')
  const [headerItinerary, setHeaderItinerary] = useState(null)
  const [filteredItineraries, setFilteredItineraries] = useState(null)

  useEffect(() => {
    // random cover image
    const randomNumber = randomNumberGenerator(0, itineraries.length - 1)

    filteredItineraries === null
      ? setHeaderItinerary(itineraries[randomNumber])
      : setHeaderItinerary(filteredItineraries[0])
  }, [itineraries, filteredItineraries])

  useEffect(() => {
    // itinerary filter
    if (string !== '') {
      const filtered = itineraries.filter((itinerary) =>
        itinerary.city.toLowerCase().startsWith(string)
      )
      setFilteredItineraries(filtered)
    }
    // clean up: when string is empty
    return () => {
      setFilteredItineraries(null)
    }
  }, [itineraries, string])

  const handleChange = (e) => {
    // updates string in state
    setString(e.target.value.toLowerCase())
  }

  if (!itineraries) {
    return (
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignjustify="center"
      >
        <Typography>Loading itineraries...</Typography>
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
      className={classes.container}
    >
      <Grid item xs={12} container direction="column" justify="center">
        {headerItinerary ? (
          <ListingHeader data={headerItinerary} className={classes.header} />
        ) : null}
        <Paper
          elevation={2}
          variant="outlined"
          className={classes.searchbarContainer}
        >
          <Typography className={classes.searchBarTitle}>
            Choose your route
          </Typography>
          <TextField
            id="outlined-helperText"
            label="Search Itineraries for City.."
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            color="primary"
            className={classes.searchBar}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {string === '' ? 'Most popular Itineraries' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={12}>
        <CardGallery
          className={classes.gallery}
          data={filteredItineraries ? filteredItineraries : itineraries}
          type="itineraries"
        />
      </Grid>
    </Grid>
  )
}

export default Itineraries
