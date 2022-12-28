import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Typography, useMediaQuery } from '@mui/material'

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { Header } from '../../sections/Header/Header'
import { ImageHeader } from '../../sections/Headers/ImageHeader'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { CardGallery } from '../../ui/CardGallery/CardGallery'
import { FavouriteComponent } from '../../ui/FavouriteComponent/FavouriteComponent'
import { CreateItineraryForm } from '../../forms/CreateItineraryForm/CreateItineraryForm'

import { fetchCityByName, selectCurrentCity } from '../../../redux/citiesSlice'
import { selectCurrentUser } from '../../../redux/usersSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

// import { getCitiesGeoDB } from '../../Redux/citiesSlice'

import { theme } from '../../../theme/Theme'
import { StyledContainer } from './styles'

export const CityPage: React.FC = () => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  // takes params to use in dispatch for single city to display
  const { city_name } = useParams<{ city_name?: string | undefined }>()

  const currentUser = useAppSelector(selectCurrentUser)
  const city = useAppSelector(selectCurrentCity)

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchCityByName(city_name))
  }, [])

  if (!city) {
    return <CustomLoader loading={true} message="City Page" />
  }

  // variables for ui
  const { _id: cityId, name, img, country, itineraries, favourites } = city

  return (
    <StyledContainer>
      <Header />
      <ImageHeader img={img} />
      <div className="container">
        <div className="city_title">
          <Typography variant="overline">{country}</Typography>
          <Typography variant="h5">{name}</Typography>
        </div>
        <div className="likes">
          <FavouriteComponent
            readOnly={!currentUser && true}
            sourceType="city"
            sourceId={cityId}
            //TODO: fix userId
            userId={currentUser ? currentUser._id : ''}
            amount={favourites.length}
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
      {currentUser && <CreateItineraryForm currentUser={currentUser} />}
      {mdDown ? <BottomNav /> : <Footer />}
    </StyledContainer>
  )
}
