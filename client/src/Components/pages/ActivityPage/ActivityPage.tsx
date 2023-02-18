import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useMediaQuery } from '@mui/material'

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { Header } from '../../sections/Header/Header'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { CreateItemForm } from '../../forms/CreateItemForm/CreateItemForm'
import { PageInfoCard } from '../../ui/PageInfoCard/PageInfoCard'
import { PageReviewsCard } from '../../ui/PageReviewsCard/PageReviewsCard'

import {
  fetchActivityByTitle,
  selectCurrentActivity,
} from '../../../redux/activitiesSlice'
import { selectCurrentUser } from '../../../redux/usersSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { theme } from '../../../theme/Theme'
import { StyledContainer } from './styles'
import { Hero } from '../../sections/Hero/Hero'

export const ActivityPage: React.FC = () => {
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectCurrentUser)
  const activity = useAppSelector(selectCurrentActivity)

  // takes params & chooses activity to display
  const { title } = useParams<{ title?: string | undefined }>()

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchActivityByTitle(title))
  }, [])

  if (!activity) {
    return <CustomLoader loading={true} message="Activity Page" />
  }

  const {
    _id,
    title: activityTitle,
    itinerary: { title: itineraryTitle },
    cityName,
    category,
    likes,
    duration,
    price,
    img,
    details,
    favourites,
    ratingAvg,
    author: { userName: authorName = '', img: authorImg = '' },
    comments,
  } = activity

  return (
    <StyledContainer>
      <Header />
      <Hero img={img} />
      <PageInfoCard
        user={currentUser}
        itemId={_id}
        overline={`${itineraryTitle} - ${category}`}
        title={activityTitle}
        source={'activity'}
        favourites={favourites}
        ratingAvg={ratingAvg}
        authorName={authorName}
        authorImg={authorImg}
        duration={duration}
        price={price}
        description={details}
      />
      <PageReviewsCard
        comments={comments}
        currentUser={currentUser}
        itemId={_id}
      />
      {matchesSm ? <BottomNav /> : <Footer />}
      {currentUser ? <CreateItemForm currentUser={currentUser} /> : null}
    </StyledContainer>
  )
}
