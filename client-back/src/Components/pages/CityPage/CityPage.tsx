import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PuffLoader from 'react-spinners/PuffLoader'

import { fetchCityByName, selectCurrentCity } from '../../Redux/citiesSlice'
import { selectCurrentUser } from '../../Redux/usersSlice'

// import { getCitiesGeoDB } from '../../Redux/citiesSlice'

import { CardGallery } from '../../ui/CardGallery/CardGallery'
import ImageHeader from '../../ui/Headers/ImageHeader'
import Favourite from '../../ui/Favourite/Favourite'
import CreateIitineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'

import { Typography } from '@mui/material'
import { StyledContainer } from './styles'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'

const CityPage = () => {
  const dispatch = useAppDispatch()

  const { city_name } = useParams<{ city_name?: string | undefined }>()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector(selectCurrentUser)

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchCityByName(city_name))
  }, [])

  const city = useAppSelector(selectCurrentCity)

  if (!city) {
    // TODO: create custom loader with custom message passed as props for all screens
    return (
      <div className="loader">
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    )
  }

  // variables for ui
  const { _id: cityId, name, img, country, itineraries } = city

  return (
    <StyledContainer>
      <ImageHeader img={img} className="header" />
      <div className="container">
        <div className="city_title">
          <Typography variant="overline">{country}</Typography>
          <Typography variant="h5">{name}</Typography>
        </div>
        <div className="likes">
          <Favourite
            readOnly={!user && true}
            sourceType="city"
            sourceId={cityId}
            userId={user && user._id}
          />
        </div>
      </div>
      <div className="gallery">
        {itineraries.length > 0 && (
          <Typography className="subtitle">
            Available itineraries for {name}
          </Typography>
        )}

        <CardGallery data={itineraries} type="itineraries" />
      </div>
      {isAuthenticated ? <CreateIitineraryForm /> : null}
    </StyledContainer>
  )
}

export default CityPage
