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
import Signup from '../../ui/Signup/Signup'
import Login from '../../ui/Login/Login'
import AddItinerary from '../../ui/Itineraries/AddItinerary'
import CreateIcon from '@material-ui/icons/Create'
import ImageHeader from '../../ui/Headers/ImageHeader'
import UserItinerariesSmall from '../../ui/Itineraries/UserItinerariesSmall'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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

  userImg: {
    display: 'flex',
    margin: '-1.5rem auto 0 auto',
    height: '6rem',
    width: '6rem',
    border: '2px solid white'
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-3rem',
    padding: '0 1rem 0 0'
  },

  edit_btn: {
    display: 'flex',
    color: 'grey',
    alignItems: 'center'
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
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '1rem 0'
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
    margin: '1rem 0'
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'center',
    margin: '.5rem'
  },

  gallery: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto'
  },

  write_btn: {
    display: 'flex',
    color: 'grey',
    paddingLeft: '.5rem',
    alignItems: 'center'
  },

  write_icon: {
    alignItems: 'center',
    width: '1.2rem',
    height: '1.2rem',
    paddingBottom: '.3rem'
  },

  alt_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  alt_container_legend: {
    display: 'flex',
    margin: '3rem',
    textAlign: 'center'
  },

  alt_container_btns: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0.5rem 5rem'
  }
}))

const Profile = () => {
  const classes = useStyles()
  const user = useSelector(state => state.auth.user)
  const cities = useSelector(state => state.cities.cities.data)
  const itineraries = useSelector(state => state.itineraries.itineraries.data)
  // const dispatch = useDispatch()

  if (user != null) {
    const { userName, firstName, lastName, details, img, email, likes } = user
    function generateRandomInteger (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }

    const randomNumber = generateRandomInteger(0, cities.length)

    const randomImg = cities[randomNumber].img

    return (
      <Box className={classes.container}>
        <ImageHeader img={randomImg} className={classes.header} />
        <Box className={classes.content}>
          <Avatar
            alt={firstName + '' + lastName}
            src={img}
            className={classes.userImg}
          />
          <Box className={classes.info}>
            <Box className={classes.edit_btn}>
              <Button
                size='small'
                color='secondary'
                component={Link}
                to={'/'}
                className={classes.text_btn}
              >
                Edit profile
              </Button>
              <CreateIcon className={classes.write_icon} />
            </Box>
            <Box className={classes.likes}>
              <IconButton
                aria-label='add to favorites'
                className={classes.likes_btn}
              >
                <FavoriteBorderRoundedIcon className={classes.likes_icon} />
              </IconButton>
              <Typography variant='body2' color='textSecondary' component='p'>
                {likes}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.user_info}>
            <Typography variant='h5' className={classes.user_fullName}>
              {firstName} {lastName}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.userName}
            >
              {/* ..still to develop this variable */}
              {userName}
            </Typography>
          </Box>
          {/* <Divider className={classes.divider} /> */}
          <Box className={classes.gallery}>
            <Typography variant='body2' className={classes.text}>
              {details}
            </Typography>
            <Divider className={classes.divider} />
            <UserItinerariesSmall />
            <Divider className={classes.divider} />
          </Box>
          <AddItinerary />
        </Box>
      </Box>
    )
  } else {
    return (
      <Box className={classes.alt_container}>
        <Box className={classes.alt_container_legend}>
          <Typography variant='h6' align='center' className='profileTitle'>
            Please Sign up or Log in to access your profile page
          </Typography>
        </Box>
        <Box className={classes.alt_container_btns}>
          <Signup />
          <Login />
        </Box>
      </Box>
    )
  }
}

export default Profile
