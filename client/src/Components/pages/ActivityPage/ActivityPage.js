import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import PuffLoader from 'react-spinners/PuffLoader'

import {
  fetchActivityByTitle,
  selectCurrentActivity,
} from '../../Redux/activitiesSlice'

import { Header } from '../../ui/Header/Header'
import BottomNav from '../../ui/BottomNav/BottomNav'
import Footer from '../../ui/Footer/Footer'
import ImageHeader from '../../ui/Headers/ImageHeader'
import CreateIitineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EuroIcon from '@material-ui/icons/Euro'
import CreateIcon from '@material-ui/icons/Create'

import { useStyles } from './styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import theme from '../../theme/Theme'

const ActivityPage = () => {
  const classes = useStyles()
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // takes params & chooses activity to display
  const { title } = useParams()

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchActivityByTitle(title))
  }, [])

  const activity = useSelector(selectCurrentActivity)

  if (!activity) {
    return (
      <div className={classes.loader}>
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    )
  }

  const { city, category, likes, duration, price, img, details } = activity

  return (
    <Box className={classes.container}>
      <Header className={classes.topNav} />
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.content}>
        <Typography className={classes.overline} variant="overline">
          {city.name} - {category}
        </Typography>
        <Box className={classes.info}>
          <Box className={classes.city_title}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box className={classes.likes}>
            <IconButton
              aria-label="add to favorites"
              className={classes.likes_btn}
            >
              <FavoriteBorderRoundedIcon className={classes.likes_icon} />
            </IconButton>
            <Typography variant="body2" color="textSecondary" component="p">
              {likes}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.extra_info}>
          <Box className={classes.user_info}>
            <Avatar
              // aria-label='recipe'
              // variant='rounded'
              className={classes.avatar}
            >
              {/* (get from author_id) */}
              Author Name
            </Avatar>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.author_name}
            >
              {/* ..still to develop this variable */}
              by John Doe
            </Typography>
          </Box>
          <Box className={classes.price_time}>
            <Box className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {duration}hs
              </Typography>
            </Box>
            <Box className={classes.price}>
              <EuroIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {price}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.gallery}>
          <Typography variant="body2" className={classes.text}>
            {details}
          </Typography>
          <Divider className={classes.divider} />
          <Box className={classes.comment_btns}>
            <Button
              size="small"
              color="secondary"
              component={Link}
              to={'/activitypage/' + title}
              className={classes.view_btn}
            >
              View Reviews (54)
            </Button>
            <Box className={classes.write_btn}>
              <Button
                size="small"
                color="secondary"
                component={Link}
                to={'/activitypage/' + title}
                className={classes.text_btn}
              >
                Leave your comment
              </Button>
              <CreateIcon className={classes.write_icon} />
            </Box>
          </Box>
          <Divider className={classes.divider} />
        </Box>
      </Box>
      {matchesSm ? <BottomNav className={classes.bottomNav} /> : <Footer />}
      {isAuthenticated ? <CreateIitineraryForm /> : null}
    </Box>
  )
}

export default ActivityPage
