import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllCities } from '../../Redux/citiesSlice'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@material-ui/core'

import CityGallery from './CityGallery'
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
        city.name.toLowerCase().startsWith(string),
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
        alignjustify="center">
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
      className={classes.container}>
      <Grid item xs={12} container direction="column" justify="center">
        {headerCity ? (
          <ListingHeader data={headerCity} className={classes.header} />
        ) : null}
        <Paper
          elevation={2}
          variant="outlined"
          className={classes.searchbarContainer}>
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
      <Grid container item xs={12}>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {string === '' ? 'Most popular Cities' : 'Search results'}
        </Typography>
        <CityGallery
          className={classes.gallery}
          cities={filteredCities ? filteredCities : cities}
        />
      </Grid>
    </Grid>
  )
}

export default Cities
