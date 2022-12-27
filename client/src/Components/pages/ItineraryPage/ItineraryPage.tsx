import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import PuffLoader from 'react-spinners/PuffLoader'

import {
  fetchItineraryByTitle,
  selectCurrentItinerary,
} from '../../Redux/itinerariesSlice'
import { selectCurrentUser } from '../../Redux/usersSlice'

import { ImageHeader } from '../../ui/Headers/ImageHeader'
import { CreateItineraryForm } from '../../ui/CreateItineraryForm/CreateItineraryForm'
import ActivityGallerySmall from '../../ui/Activities/ActivityGallerySmall'
import { FavouriteComponent } from '../../ui/FavouriteComponent/FavouriteComponent'

import {
  Avatar,
  Collapse,
  Divider,
  IconButton,
  Typography,
  Rating,
  useMediaQuery,
  Box,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EuroIcon from '@mui/icons-material/Euro'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import clsx from 'clsx'

import CreateCommentForm from '../../ui/CreateCommentForm/CreateCommentForm'

import { CommentCard } from '../../ui/CommentCard/CommentCard'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { RootState } from '../../Redux/store'
import { StyledContainer } from './styles'
import { Header } from '../../ui/Header/Header'
import { theme } from '../../Styles/Theme'
import { BottomNav } from '../../ui/BottomNav/BottomNav'
import { Footer } from '../../ui/Footer/Footer'

// TODO: itinerary Reducer action to keep track of likes

export const ItineraryPage: React.FC = () => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const [expanded, setExpanded] = React.useState(false)

  const currentUser = useAppSelector(selectCurrentUser)
  const itinerary = useAppSelector(selectCurrentItinerary)
  const cities = useAppSelector((state: RootState) => state.cities.data)

  // takes params & chooses itinerary to display
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

  // handles expand reviews
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  if (!itinerary) {
    return (
      <div className="loader">
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    )
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
    likes,
    author: { userName: authorName = '', img: authorImg = '' },
    comments,
  } = itinerary

  return (
    <StyledContainer>
      <Header />
      <ImageHeader img={img} />

      <div className="content">
        <Typography className="overline" variant="overline">
          {city.name} - {category}
        </Typography>
        <div className="info">
          <div className="city_title">
            <Typography variant="h5">{title}</Typography>
          </div>
          <div className="likes">
            {currentUser && (
              <FavouriteComponent
                readOnly={!currentUser._id && true}
                amount={favourites ? favourites.length : 0}
                sourceType="itinerary"
                sourceId={itineraryId}
                userId={currentUser._id}
              />
            )}
          </div>
        </div>
        <Box
          component="fieldset"
          borderColor="transparent"
          className="ratingContainer"
        >
          <Rating
            name="read-only"
            size="small"
            precision={0.5}
            value={ratingAvg}
            readOnly
            className="rating"
          />
          <Typography className="ratingNumber" color="primary" variant="body2">
            ({ratingAvg})
          </Typography>
        </Box>
        <div className="extra_info">
          <div className="user_info">
            <Avatar
              // aria-label='recipe'
              // variant='rounded'
              alt={authorName}
              src={authorImg}
              className="avatar"
            />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="author_name"
            >
              {authorName ? `by ${authorName}` : 'by anonymous'}
            </Typography>
          </div>
          <div className="price_time">
            <div className="duration">
              <AccessTimeIcon className="icons" />
              <Typography variant="body2" color="textSecondary" component="p">
                {duration}
              </Typography>
            </div>
            <div className="price">
              <EuroIcon className="icons" />
              <Typography variant="body2" color="textSecondary" component="p">
                {price}
              </Typography>
            </div>
          </div>
        </div>
        <Divider className="divider" />
        <div className="gallery">
          <Typography variant="body2" className="decription">
            {details}
          </Typography>
          <Divider className="divider" />
          <div className="gallery">
            <Typography variant="body2" className="subtitle">
              {activities.length > 0
                ? 'Available activities'
                : 'No activities found'}{' '}
              for {title}
            </Typography>

            <ActivityGallerySmall activities={activities} />
          </div>

          <Divider className="divider" />
          <div className="reviewContainer">
            <div className="viewReviews">
              <Typography variant="body2" className="reviewText">
                View all Reviews ({comments.length})
              </Typography>
              <IconButton
                style={{ padding: 0, marginRight: 'auto' }}
                className={clsx('expand', {
                  ['expandOpen']: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            {currentUser && (
              <CreateCommentForm
                userId={currentUser._id}
                userName={currentUser.userName}
                userImg={currentUser.img}
                sourceId={itineraryId}
                sourceType="itinerary"
              />
            )}
          </div>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            className="collapse"
          >
            {itinerary.comments.map((comment) => (
              <CommentCard key={uuidv4()} comment={comment} />
            ))}
          </Collapse>
          <Divider className="divider" />
        </div>
        {currentUser && <CreateItineraryForm currentUser={currentUser} />}
      </div>
      {mdDown ? <BottomNav /> : <Footer />}
    </StyledContainer>
  )
}
