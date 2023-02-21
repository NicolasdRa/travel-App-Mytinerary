import { useState, useEffect } from 'react'

import { selectAllCities, selectRandomCity } from '../../../redux/citiesSlice'
import { useAppSelector } from '../../../redux/hooks'
import { City } from '../../../@types/types'

import { ListingTab } from '../../ui/ListingTab/ListingTab'

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

  if (!cities) return <div>Loading...</div>

  return (
    <ListingTab
      source="cities"
      data={filteredCities ? filteredCities : cities}
      img={headerCity.img}
      headerTitle={headerCity.name}
      headerSubtitle={headerCity.country}
      searchBarTitle="Want to go somewhere?"
      searchBarLabel="Search for a city"
      galleryTitle={string === '' ? 'Most popular Cities' : 'Search results'}
      handleChange={handleChange}
    />
  )
}
