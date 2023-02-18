import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useMediaQuery } from '@mui/material'

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { Header } from '../../sections/Header/Header'

import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { CreateItemForm } from '../../forms/CreateItemForm/CreateItemForm'
import { PageInfoCard } from '../../ui/PageInfoCard/PageInfoCard'
import { PageGalleryCard } from '../../ui/PageGalleryCard/PageGalleryCard'
import { PageReviewsCard } from '../../ui/PageReviewsCard/PageReviewsCard'

import { fetchCityByName, selectCurrentCity } from '../../../redux/citiesSlice'
import { selectCurrentUser } from '../../../redux/usersSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

// import { getCitiesGeoDB } from '../../Redux/citiesSlice'

import { theme } from '../../../theme/Theme'
import { StyledContainer } from './styles'
import { selectActivitiesForCity } from '../../../redux/activitiesSlice'
import { selectItinerariesForCity } from '../../../redux/itinerariesSlice'
import { Hero } from '../../sections/Hero/Hero'

export const CityPage: React.FC = () => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  // takes params to use in dispatch for single city to display
  const { city_name } = useParams<{ city_name?: string | undefined }>()

  const currentUser = useAppSelector(selectCurrentUser)
  const city = useAppSelector(selectCurrentCity)

  const itineraries = useAppSelector((state) =>
    selectItinerariesForCity(state, city_name)
  )

  const activities = useAppSelector((state) =>
    selectActivitiesForCity(state, city_name)
  )

  // fetches data from DB
  useEffect(() => {
    console.log('City page rendered')

    dispatch(fetchCityByName(city_name))
  }, [])

  if (!city) {
    return <CustomLoader loading={true} message="City Page" />
  }

  // variables for ui
  const {
    _id: cityId,
    name,
    img,
    country,
    // itineraries,
    // favourites,
    // ratingAvg,
    // comments,
    // details,
  } = city

  return (
    <StyledContainer>
      <Header />
      <Hero img={img} />
      <PageInfoCard
        user={currentUser}
        itemId={cityId}
        overline={country}
        title={name}
        source={'city'}
        // favourites={favourites}
        // ratingAvg={ratingAvg}
        // description={details}
      />
      <PageGalleryCard
        title={`"${name}"`}
        items={itineraries}
        source={'itineraries'}
      />
      <PageGalleryCard
        title={`"${name}"`}
        items={activities}
        source={'activities'}
      />
      {/* <PageReviewsCard
        comments={comments}
        currentUser={currentUser}
        itemId={cityId}
      /> */}
      {currentUser && <CreateItemForm currentUser={currentUser} />}
      {mdDown ? <BottomNav /> : <Footer />}
    </StyledContainer>
  )
}
