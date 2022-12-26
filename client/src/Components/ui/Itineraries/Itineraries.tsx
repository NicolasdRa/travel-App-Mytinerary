import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@mui/material'

import { CardGallery } from '../CardGallery/CardGallery'

import {
  selectAllItineraries,
  selectRandomItinerary,
} from '../../Redux/itinerariesSlice'

import { StyledGrid, StyledLoader } from './styles'
import { Itinerary } from '../../../@types/types'
import { useAppSelector } from '../../Redux/hooks'
import { ListingHeader } from '../Headers/ListingHeader'

export const Itineraries = () => {
  const itineraries = useSelector(selectAllItineraries)
  const headerItinerary = useAppSelector(selectRandomItinerary)

  console.log(headerItinerary)

  const [string, setString] = useState('')

  const [filteredItineraries, setFilteredItineraries] = useState<
    Itinerary[] | null
  >(null)

  useEffect(() => {
    // itinerary filter
    if (string !== '') {
      const filtered = itineraries.filter((itinerary) =>
        itinerary.city.name.toLowerCase().startsWith(string)
      )
      setFilteredItineraries(filtered)
    }
    // clean up: when string is empty
    return () => {
      setFilteredItineraries(null)
    }
  }, [itineraries, string])

  const handleChange = (e: any) => {
    // updates string in state
    setString(e.target.value.toLowerCase())
  }

  if (!itineraries) {
    return (
      <StyledLoader
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Typography>Loading itineraries...</Typography>
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
        <ListingHeader
          title={headerItinerary?.title}
          cityName={headerItinerary?.city.name}
          img={headerItinerary?.img}
        />
        <Paper elevation={2} className="searchbarContainer">
          <Typography className="searchBarTitle">Choose your route</Typography>
          <TextField
            id="outlined-helperText"
            label="Search Itineraries for City.."
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
          {string === '' ? 'Most popular Itineraries' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CardGallery
          data={filteredItineraries ? filteredItineraries : itineraries}
          type="itineraries"
        />
      </Grid>
    </StyledGrid>
  )
}
