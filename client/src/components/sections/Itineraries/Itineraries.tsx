import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  selectAllItineraries,
  selectRandomItinerary,
} from '../../../redux/itinerariesSlice'

import { Itinerary } from '../../../@types/types'
import { useAppSelector } from '../../../redux/hooks'

import { ListingTab } from '../../ui/ListingTab/ListingTab'

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

  return (
    <ListingTab
      source="itineraries"
      data={filteredItineraries ? filteredItineraries : itineraries}
      img={headerItinerary?.img}
      headerTitle={headerItinerary?.title}
      headerSubtitle={headerItinerary?.city.name}
      searchBarTitle="Want to have fun?"
      searchBarLabel="Search Itineraries for City..."
      galleryTitle={
        string === '' ? 'Most popular Itineraries' : 'Search results'
      }
      handleChange={handleChange}
    />
  )
}
