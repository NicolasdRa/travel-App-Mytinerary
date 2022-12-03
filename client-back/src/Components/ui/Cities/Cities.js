import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@mui/material'

import { CardGallery } from '../CardGallery/CardGallery'
import ListingHeader from '../Headers/ListingHeader'

import { randomNumberGenerator } from '../../utils/utils'
import { selectAllCities } from '../../Redux/citiesSlice'

import { useStyles } from './styles'

const Cities = () => {
  const classes = useStyles()

  const cities = useSelector(selectAllCities)

  const [string, setString] = useState('')
  const [headerCity, setHeaderCity] = useState(null)
  const [filteredCities, setFilteredCities] = useState(null)

  useEffect(() => {
    // random cover image
    const randomNumber = randomNumberGenerator(0, cities.length - 1)

    filteredCities === null
      ? setHeaderCity(cities[randomNumber])
      : setHeaderCity(filteredCities[0])
  }, [cities, filteredCities])

  useEffect(() => {
    // city filter
    if (string !== '') {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().startsWith(string)
      )
      setFilteredCities(filtered)
    }
    // clean up: when string is empty
    return () => {
      setFilteredCities(null)
    }
  }, [cities, string])

  const handleChange = (e) => {
    // updates string in state
    setString(e.target.value.toLowerCase())
  }

  // console.log('Cities Tab Rendered')

  if (!cities) {
    return (
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignjustify="center"
      >
        <Typography>Loading cities...</Typography>
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
        {headerCity && (
          <ListingHeader data={headerCity} className={classes.header} />
        )}
        <Paper
          elevation={2}
          variant="outlined"
          className={classes.searchbarContainer}
        >
          <Typography className={classes.searchBarTitle}>
            Choose your destination
          </Typography>
          <TextField
            id="outlined-helperText"
            label="Search City.."
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
          {string === '' ? 'Most popular Cities' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={12}>
        <CardGallery
          className={classes.gallery}
          data={filteredCities ? filteredCities : cities}
          type="cities"
        />
      </Grid>
    </Grid>
  )
}

export default Cities
