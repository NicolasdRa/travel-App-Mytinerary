import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Grid, TextField, Typography, Paper } from '@mui/material'

import { CardGallery } from '../../ui/CardGallery/CardGallery'

import {
  selectAllItineraries,
  selectRandomItinerary,
} from '../../../redux/itinerariesSlice'

import { StyledGrid } from './styles'
import { Itinerary } from '../../../@types/types'
import { useAppSelector } from '../../../redux/hooks'
import { ListingHeader } from '../Headers/ListingHeader'
import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'

export const Itineraries = () => {
  const itineraries = useSelector(selectAllItineraries)
  const headerItinerary = useAppSelector(selectRandomItinerary)

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
    return <CustomLoader loading={true} message="loading Itineraries..." />
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
          items={filteredItineraries ? filteredItineraries : itineraries}
          source="itineraries"
        />
      </Grid>
    </StyledGrid>
  )
}
