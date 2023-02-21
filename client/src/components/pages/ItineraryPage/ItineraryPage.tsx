import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useMediaQuery } from '@mui/material'

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { Header } from '../../sections/Header/Header'
import { PageInfoCard } from '../../ui/PageInfoCard/PageInfoCard'
import { PageGalleryCard } from '../../ui/PageGalleryCard/PageGalleryCard'
import { PageReviewsCard } from '../../ui/PageReviewsCard/PageReviewsCard'
import { CreateItemForm } from '../../forms/CreateItemForm/CreateItemForm'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectCurrentUser } from '../../../redux/usersSlice'
import {
  fetchItineraryByTitle,
  selectCurrentItinerary,
} from '../../../redux/itinerariesSlice'

import { theme } from '../../../theme/Theme'
import { StyledContainer } from './styles'
import { Hero } from '../../sections/Hero/Hero'

// TODO: itinerary Reducer action to keep track of likes

export const ItineraryPage: React.FC = () => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectCurrentUser)
  const itinerary = useAppSelector(selectCurrentItinerary)

  // takes params to use in dispatch for single itinerary to display
  const { title } = useParams<{ title?: string | undefined }>()

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchItineraryByTitle(title))
  }, [])

  // TODO: fetch favourites from DB
  // useEffect(() => {
  //   dispatch(fetchFavourites(itinerary.id));
  // }, [itinerary, dispatch]);

  // // updates count
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   return () => setCount(favouriteCount);
  // }, [favouriteCount]);

  if (!itinerary) {
    return <CustomLoader loading={true} message="Itinerary Page" />
  }

  // variables for ui
  const {
    _id: itineraryId,
    city,
    category,
    duration,
    price,
    img,
    details,
    activities,
    favourites,
    ratingAvg,
    author: { userName: authorName = '', img: authorImg = '' },
    comments,
  } = itinerary

  return (
    <StyledContainer>
      <Header />
      <Hero img={img} size="medium" />
      <PageInfoCard
        user={currentUser}
        itemId={itineraryId}
        overline={`${city.name} - ${category}`}
        title={title}
        source={'itinerary'}
        favourites={favourites}
        ratingAvg={ratingAvg}
        authorName={authorName}
        authorImg={authorImg}
        duration={duration}
        price={price}
        description={details}
      />
      <PageGalleryCard
        title={`"${title}"`}
        items={activities}
        source={'activities'}
      />
      <PageReviewsCard
        comments={comments}
        currentUser={currentUser}
        itemId={itineraryId}
      />
      {currentUser && <CreateItemForm currentUser={currentUser} />}
      {mdDown ? <BottomNav /> : <Footer />}
    </StyledContainer>
  )
}
