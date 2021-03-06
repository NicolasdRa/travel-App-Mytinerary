import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PuffLoader from 'react-spinners/PuffLoader'

import { fetchCityByName, selectCurrentCity } from '../../Redux/citiesSlice'
import { selectCurrentUser } from '../../Redux/usersSlice'

// import { getCitiesGeoDB } from '../../Redux/citiesSlice'

import { CardGallery } from '../../ui/CardGallery/CardGallery'
import ImageHeader from '../../ui/Headers/ImageHeader'
import Favourite from '../../ui/Favourite/Favourite'
import CreateIitineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'

import { Box, Typography } from '@material-ui/core'

import { useStyles } from './styles'

const CityPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { city_name } = useParams()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector(selectCurrentUser)

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchCityByName(city_name))
  }, [])

  const city = useSelector(selectCurrentCity)

  if (!city) {
    // TODO: create custom loader with custom message passed as props for all screens
    return (
      <div className={classes.loader}>
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    )
  }

  // variables for ui
  const { _id: cityId, name, img, country, itineraries } = city

  return (
    <Box className={classes.content}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.container}>
        <Box className={classes.city_title}>
          <Typography variant="overline">{country}</Typography>
          <Typography variant="h5">{name}</Typography>
        </Box>
        <Box className={classes.likes}>
          <Favourite
            readOnly={!user && true}
            sourceType="city"
            sourceId={cityId}
            userId={user && user._id}
            className={classes.favourites}
          />
        </Box>
      </Box>
      <Box className={classes.gallery}>
        {itineraries.length > 0 && (
          <Typography className={classes.subtitle}>
            Available itineraries for {name}
          </Typography>
        )}

        <CardGallery data={itineraries} type="itineraries" />
      </Box>
      {isAuthenticated ? <CreateIitineraryForm /> : null}
    </Box>
  )
}

export default CityPage
