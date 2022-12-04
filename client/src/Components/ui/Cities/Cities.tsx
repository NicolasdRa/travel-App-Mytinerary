import { useState, useEffect } from 'react'

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
import { useAppSelector } from '../../Redux/hooks'
import { City } from '../../../@types/types'
import { StyledGrid, StyledLoaderGrid } from './styles'

const Cities = () => {
  const cities = useAppSelector(selectAllCities)

  const [string, setString] = useState('')
  const [headerCity, setHeaderCity] = useState<City | null>(null)
  const [filteredCities, setFilteredCities] = useState<City[] | null>(null)

  useEffect(() => {
    // random cover image
    const randomNumber = randomNumberGenerator(0, cities.length - 1)

    filteredCities === null
      ? setHeaderCity(cities[randomNumber])
      : setHeaderCity(cities[0])
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

  const handleChange = (e: any) => {
    // updates string in state
    setString(e.target.value.toLowerCase())
  }

  // console.log('Cities Tab Rendered')

  if (!cities) {
    return (
      <StyledLoaderGrid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Typography>Loading cities...</Typography>
        <CircularProgress color="secondary" />
      </StyledLoaderGrid>
    )
  }

  return (
    <StyledGrid
      container
      direction="column"
      // justify='center'
      alignItems="center"
    >
      <Grid item xs={12} container direction="column" justifyContent="center">
        {headerCity && <ListingHeader data={headerCity} className="header" />}
        <Paper elevation={2} variant="outlined" className="searchbarContainer">
          <Typography className="searchBarTitle">
            Choose your destination
          </Typography>
          <TextField
            id="outlined-helperText"
            label="Search City.."
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            color="primary"
            className="searchBar"
          />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Typography variant="subtitle2" className="subtitle">
          {string === '' ? 'Most popular Cities' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={12}>
        <CardGallery
          data={filteredCities ? filteredCities : cities}
          type="cities"
        />
      </Grid>
    </StyledGrid>
  )
}

export default Cities
