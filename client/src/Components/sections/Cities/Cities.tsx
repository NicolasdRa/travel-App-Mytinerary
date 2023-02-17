import { useState, useEffect } from 'react'

import { Grid, TextField, Typography, Paper } from '@mui/material'

import { CardGallery } from '../CardGallery/CardGallery'
import { ListingHeader } from '../Headers/ListingHeader'

import { selectAllCities, selectRandomCity } from '../../../redux/citiesSlice'
import { useAppSelector } from '../../../redux/hooks'
import { City } from '../../../@types/types'
import { StyledContainer } from './styles'
import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'

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
    return <CustomLoader loading={true} message="loading cities..." />
  }

  return (
    <StyledContainer>
      <ListingHeader
        img={headerCity?.img}
        title={headerCity.name}
        subtitle={headerCity.country}
        handleChange={handleChange}
      />
      <Typography variant="subtitle2" className="page-subtitle">
        {string === '' ? 'Most popular Cities' : 'Search results'}
      </Typography>
      <div className="gallery-container">
        <CardGallery
          items={filteredCities ? filteredCities : cities}
          source="cities"
        />
      </div>
    </StyledContainer>
  )
}
