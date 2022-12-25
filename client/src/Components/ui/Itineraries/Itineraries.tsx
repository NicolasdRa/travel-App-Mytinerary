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
import { ListingHeader } from '../Headers/ListingHeader'

import { randomNumberGenerator } from '../../utils/utils'
import { selectAllItineraries } from '../../Redux/itinerariesSlice'

import { StyledGrid, StyledLoader } from './styles'
import { Itinerary } from '../../../@types/types'

const Itineraries = () => {
  const itineraries = useSelector(selectAllItineraries)

  const [string, setString] = useState('')
  const [headerItinerary, setHeaderItinerary] = useState<Itinerary | null>(null)
  const [filteredItineraries, setFilteredItineraries] = useState<
    Itinerary[] | null
  >(null)

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
      // justify='center'
      alignItems="center"
    >
      <Grid item xs={12} container direction="column" justifyContent="center">
        {headerItinerary ? (
          <ListingHeader
            title={headerItinerary.title}
            cityName={headerItinerary.city.name}
            img={headerItinerary.img}
          />
        ) : null}
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
      <Grid item xs={12} lg={12}>
        <Typography variant="subtitle2" className="subtitle">
          {string === '' ? 'Most popular Itineraries' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={12}>
        <CardGallery
          data={filteredItineraries ? filteredItineraries : itineraries}
          type="itineraries"
        />
      </Grid>
    </StyledGrid>
  )
}

export default Itineraries
