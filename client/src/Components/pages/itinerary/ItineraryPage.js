import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EuroIcon from '@material-ui/icons/Euro'
import CreateIcon from '@material-ui/icons/Create'
import ActivityGallerySmall from '../../ui/Activities/ActivityGallerySmall'
import ImageHeader from '../../ui/Headers/ImageHeader'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: '100%'
  },

  header: {
    height: '20rem',
    width: '100%'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem'
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem'
  },

  overline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '1rem',
    padding: '0 0 0 1rem'
  },

  city_title: {
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  likes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  likes_btn: {
    display: 'flex',
    flexDirection: 'row',
    flex: '0 0 auto',
    textAlign: 'left',
    padding: 0
  },

  likes_icon: {
    height: '2.5rem',
    width: '2.5rem'
  },

  extra_info: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2rem'
  },

  user_info: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  avatar: {
    height: '2rem',
    width: '2rem',
    marginRight: '.5rem'
  },

  price_time: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    padding: '1rem 0'
  },

  duration: {
    display: 'flex',
    alignItems: 'center'
  },

  price: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem'
  },

  info_icon: {
    alignItems: 'center',
    fill: 'grey'
  },

  divider: {
    margin: '1rem'
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'left',
    margin: '1rem'
  },

  gallery: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto'
  },

  comment_btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1.5rem'
  },

  view_btn: {
    alignItems: 'center'
  },

  text_btn: {
    alignItems: 'center'
  },

  write_btn: {
    display: 'flex',
    color: 'grey',
    paddingLeft: '.5rem',
    alignItems: 'center'
  },

  write_icon: {
    alignItems: 'center'
  }
}))

function ItineraryPage (props) {
  const classes = useStyles()
  const title = props.match.params.title

  const itinerary = useSelector(state =>
    state.itineraries.itineraries.filter(itinerary => itinerary.title === title)
  )

  console.log(itinerary)

  const {
    city,
    category,
    likes,
    duration,
    price,
    hashtags,
    img,
    activities,
    details
  } = itinerary[0]

  return (
    <Box className={classes.container}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.content}>
        <Typography className={classes.overline} variant='overline'>
          {city} - {category}
        </Typography>
        <Box className={classes.info}>
          <Box className={classes.city_title}>
            <Typography variant='h5'>{title}</Typography>
          </Box>
          <Box className={classes.likes}>
            <IconButton
              aria-label='add to favorites'
              className={classes.likes_btn}
            >
              <FavoriteBorderRoundedIcon className={classes.likes_icon} />
            </IconButton>
            <Typography variant='body2' color='textSecondary' component='p'>
              {likes.length}
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
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.author_name}
            >
              {/* ..still to develop this variable */}
              by John Doe
            </Typography>
          </Box>
          <Box className={classes.price_time}>
            <Box className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography variant='body2' color='textSecondary' component='p'>
                {duration}hs
              </Typography>
            </Box>
            <Box className={classes.price}>
              <EuroIcon className={classes.icons} />
              <Typography variant='body2' color='textSecondary' component='p'>
                {price}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.gallery}>
          <Typography variant='body2' className={classes.text}>
            {details}
          </Typography>
          <Divider className={classes.divider} />
          <Box className={classes.gallery}>
            {activities.length > 0 && (
              <Typography className={classes.subtitle}>
                Available activities for {title}
              </Typography>
            )}
            <ActivityGallerySmall activities={activities} />
          </Box>

          <Divider className={classes.divider} />
          <Box className={classes.comment_btns}>
            <Button
              size='small'
              color='secondary'
              component={Link}
              to={'/activitypage/' + title}
              className={classes.view_btn}
            >
              View Reviews (54)
            </Button>
            <Box className={classes.write_btn}>
              <Button
                size='small'
                color='secondary'
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
        {/* <AddItinerary /> */}
      </Box>
    </Box>
  )
}

export default ItineraryPage
