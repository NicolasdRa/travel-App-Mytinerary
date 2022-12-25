import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import PuffLoader from 'react-spinners/PuffLoader'

import {
  fetchActivityByTitle,
  selectCurrentActivity,
} from '../../Redux/activitiesSlice'

import { Header } from '../../ui/Header/Header'
import BottomNav from '../../ui/BottomNav/BottomNav'
import { Footer } from '../../ui/Footer/Footer'
import { ImageHeader } from '../../ui/Headers/ImageHeader'
import { CreateItineraryForm } from '../../ui/CreateItineraryForm/CreateItineraryForm'

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EuroIcon from '@mui/icons-material/Euro'
import CreateIcon from '@mui/icons-material/Create'

import { theme } from '../../Styles/Theme'
import { Container } from './styles'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { RootState } from '../../Redux/store'

const ActivityPage = () => {
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(
    (state: RootState) => state.users.currentUser
  )

  const cities = useAppSelector((state: RootState) => state.cities.data)

  console.log(cities)

  // takes params & chooses activity to display
  const { title } = useParams<{ title?: string | undefined }>()

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchActivityByTitle(title))
  }, [])

  const activity = useAppSelector(selectCurrentActivity)

  if (!activity) {
    return (
      <div className="loader">
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    )
  }

  const { city, category, likes, duration, price, img, details } = activity

  return (
    <Container>
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
            <IconButton aria-label="add to favorites" className="likes_btn">
              <FavoriteBorderRoundedIcon className="likes_icon" />
            </IconButton>
            <Typography variant="body2" color="textSecondary" component="p">
              {likes}
            </Typography>
          </div>
        </div>
        <div className="extra_info">
          <div className="user_info">
            <Avatar
              // aria-label='recipe'
              // variant='rounded'
              className="avatar"
            >
              {/* (get from author_id) */}
              Author Name
            </Avatar>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="author_name"
            >
              {/* ..still to develop this variable */}
              by John Doe
            </Typography>
          </div>
          <div className="price_time">
            <div className="duration">
              <AccessTimeIcon className="icons" />
              <Typography variant="body2" color="textSecondary" component="p">
                {duration}hs
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
          <Typography variant="body2" className="text">
            {details}
          </Typography>
          <Divider className="divider" />
          <div className="comment_btns">
            <Button
              size="small"
              color="secondary"
              component={Link}
              to={'/activitypage/' + title}
              className="view_btn"
            >
              View Reviews (54)
            </Button>
            <div className="write_btn">
              <Button
                size="small"
                color="secondary"
                component={Link}
                to={'/activitypage/' + title}
                className="text_btn"
              >
                Leave your comment
              </Button>
              <CreateIcon className="write_icon" />
            </div>
          </div>
          <Divider className="divider" />
        </div>
      </div>
      {matchesSm ? <BottomNav /> : <Footer />}
      {currentUser ? <CreateItineraryForm currentUser={currentUser} /> : null}
    </Container>
  )
}

export default ActivityPage
