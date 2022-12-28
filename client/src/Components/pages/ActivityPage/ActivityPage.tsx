import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

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

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { Header } from '../../sections/Header/Header'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { ImageHeader } from '../../sections/Headers/ImageHeader'

import {
  fetchActivityByTitle,
  selectCurrentActivity,
} from '../../../redux/activitiesSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { RootState } from '../../../redux/store'

import { theme } from '../../../theme/Theme'
import { StyledContainer } from './styles'
import { CreateItineraryForm } from '../../forms/CreateItineraryForm/CreateItineraryForm'

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
    return <CustomLoader loading={true} message="Activity Page" />
  }

  const { cityName, category, likes, duration, price, img, details } = activity

  console.log({ activity })

  console.log({ img })

  return (
    <StyledContainer>
      <Header />
      <ImageHeader img={img} />
      <div className="content">
        <Typography className="overline" variant="overline">
          {cityName} - {category}
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
    </StyledContainer>
  )
}

export default ActivityPage
