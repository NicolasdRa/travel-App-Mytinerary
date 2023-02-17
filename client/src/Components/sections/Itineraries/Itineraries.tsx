import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Typography } from '@mui/material'

import { CardGallery } from '../CardGallery/CardGallery'

import {
  selectAllItineraries,
  selectRandomItinerary,
} from '../../../redux/itinerariesSlice'

import { StyledContainer } from './styles'
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
    <StyledContainer>
      <ListingHeader
        title={headerItinerary?.title}
        subtitle={headerItinerary?.city.name}
        img={headerItinerary?.img}
        handleChange={handleChange}
      />

      <Typography variant="subtitle2" className="page-subtitle">
        {string === '' ? 'Most popular Itineraries' : 'Search results'}
      </Typography>

      <div className="gallery-container">
        <CardGallery
          items={filteredItineraries ? filteredItineraries : itineraries}
          source="itineraries"
        />
      </div>
    </StyledContainer>
  )
}
