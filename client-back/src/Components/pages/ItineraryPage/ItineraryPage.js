import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import PuffLoader from 'react-spinners/PuffLoader'

import {
  fetchItineraryByTitle,
  selectCurrentItinerary,
} from '../../Redux/itinerariesSlice'
import { selectCurrentUser } from '../../Redux/usersSlice'

import ImageHeader from '../../ui/Headers/ImageHeader'
import CreateIitineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'
import ActivityGallerySmall from '../../ui/Activities/ActivityGallerySmall'
import Favourite from '../../ui/Favourite/Favourite'

import {
  Avatar,
  Collapse,
  Divider,
  IconButton,
  Typography,
  Rating,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EuroIcon from '@mui/icons-material/Euro'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useStyles } from './styles'
import clsx from 'clsx'

import CreateCommentForm from '../../ui/CreateCommentForm/CreateCommentForm'

import { CommentCard } from '../../ui/CommentCard/CommentCard'

// TODO: itinerary Reducer action to keep track of likes

const ItineraryPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [expanded, setExpanded] = React.useState(false)

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const currentUser = useSelector(selectCurrentUser)

  // takes params & chooses itinerary to display
  const { title } = useParams()

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchItineraryByTitle(title))
  }, [])

  const itinerary = useSelector(selectCurrentItinerary)

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
      <div className={classes.loader}>
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
    author: { userName: authorName } = '',
    author: { img: authorImg } = '',
    comments,
  } = itinerary

  // variable to pass in create comment form
  const { _id: userId, userName, img: userImg } = currentUser

  return (
    <div className={classes.container}>
      <ImageHeader img={img} className={classes.header} />

      <div className={classes.content}>
        <Typography className={classes.overline} variant="overline">
          {city.name} - {category}
        </Typography>
        <div className={classes.info}>
          <div className={classes.city_title}>
            <Typography variant="h5">{title}</Typography>
          </div>
          <div className={classes.likes}>
            <Favourite
              readOnly={!userId && true}
              data={favourites.length}
              sourceType="itinerary"
              sourceId={itineraryId}
              userId={userId && userId}
              className={classes.favourites}
            />
          </div>
        </div>
        <div
          component="fieldset"
          borderColor="transparent"
          className={classes.ratingContainer}
        >
          <Rating
            name="read-only"
            size="small"
            precision={0.5}
            value={ratingAvg}
            readOnly
            className={classes.rating}
          />
          <Typography
            className={classes.ratingNumber}
            color="primary"
            variant="body2"
          >
            ({ratingAvg})
          </Typography>
        </div>
        <div className={classes.extra_info}>
          <div className={classes.user_info}>
            <Avatar
              // aria-label='recipe'
              // variant='rounded'
              alt={authorName}
              src={authorImg}
              className={classes.avatar}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.author_name}
            >
              {authorName ? `by ${authorName}` : 'by anonymous'}
            </Typography>
          </div>
          <div className={classes.price_time}>
            <div className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {duration}
              </Typography>
            </div>
            <div className={classes.price}>
              <EuroIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {price}
              </Typography>
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.gallery}>
          <Typography variant="body2" className={classes.text}>
            {details}
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.gallery}>
            <Typography variant="body2" className={classes.subtitle}>
              {activities.length > 0
                ? 'Available activities'
                : 'No activities found'}{' '}
              for {title}
            </Typography>

            <ActivityGallerySmall activities={activities} />
          </div>

          <Divider className={classes.divider} />
          <div className={classes.reviewContainer}>
            <div className={classes.viewReviews}>
              <Typography variant="body2" className={classes.reviewText}>
                View all Reviews ({comments.length})
              </Typography>
              <IconButton
                style={{ padding: 0, marginRight: 'auto' }}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <CreateCommentForm
              userId={userId}
              userName={userName}
              userImg={userImg}
              sourceId={itineraryId}
              sourceType="itinerary"
              className={classes.postReview}
            />
          </div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {itinerary.comments.map((comment) => (
              <CommentCard key={uuidv4()} comment={comment} />
            ))}
          </Collapse>
          <Divider className={classes.divider} />
        </div>
        {isAuthenticated && <CreateIitineraryForm />}
      </div>
    </div>
  )
}

export default ItineraryPage
