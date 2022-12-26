import { useState, useEffect } from 'react'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@mui/material'

import { CardGallery } from '../CardGallery/CardGallery'
import { ListingHeader } from '../Headers/ListingHeader'

import { selectAllCities, selectRandomCity } from '../../Redux/citiesSlice'
import { useAppSelector } from '../../Redux/hooks'
import { City } from '../../../@types/types'
import { StyledGrid, StyledLoader } from './styles'

export const Cities = () => {
  const cities = useAppSelector(selectAllCities)
  const headerCity = useAppSelector(selectRandomCity)

  const [string, setString] = useState('')
  const [filteredCities, setFilteredCities] = useState<City[] | null>(null)

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

  if (!cities) {
    return (
      <StyledLoader
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Typography>Loading cities...</Typography>
        <CircularProgress color="secondary" />
      </StyledLoader>
    )
  }

  return (
    <StyledGrid
      container
      direction="column"
      justifyContent="start"
      alignItems="start"
    >
      <Grid item xs={12} container direction="column" justifyContent="center">
        <ListingHeader img={headerCity?.img} />
        <Paper elevation={2} className="searchbarContainer">
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
      <Grid item xs={12}>
        <Typography variant="subtitle2" className="subtitle">
          {string === '' ? 'Most popular Cities' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <CardGallery
          data={filteredCities ? filteredCities : cities}
          type="cities"
        />
      </Grid>
    </StyledGrid>
  )
}
