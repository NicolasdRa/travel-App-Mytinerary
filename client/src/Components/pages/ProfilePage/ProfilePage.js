import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Avatar, Box, Divider, Typography } from '@material-ui/core'

import Signup from '../../ui/Signup/Signup'
import Login from '../../ui/Login/Login'
import CreateItineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'
import ImageHeader from '../../ui/Headers/ImageHeader'
import UserItinerariesSmall from '../../ui/Itineraries/UserItinerariesSmall'
import UpdateProfileForm from '../../ui/UpdateProfileForm/UpdateProfileForm'
import Favourite from '../../ui/Favourite/Favourite'

import { loadCurrentUser } from '../../Redux/usersSlice'

import { useStyles } from './styles'
import { selectItinerariesByUser } from '../../Redux/itinerariesSlice'

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [data, setData] = useState(null)

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.users.currentUser)
  // const favouriteTotal = useSelector((state) => state.favourites.favourites);
  const userItineraries = useSelector((state) =>
    selectItinerariesByUser(state, user._id),
  )

  useEffect(() => {
    setData(userItineraries)
  }, [userItineraries])

  useEffect(() => {
    return () => {
      dispatch(loadCurrentUser())
    }
  }, [dispatch])

  if (isAuthenticated) {
    const { userName, firstName, lastName, details, img, coverImg } = user

    return (
      <Box className={classes.container}>
        <ImageHeader img={coverImg} className={classes.header} />
        <Box className={classes.content}>
          <Avatar
            alt={firstName + '' + lastName}
            src={img}
            className={classes.userImg}
          />
          <Box className={classes.info}>
            <Box className={classes.edit_btn}>
              <UpdateProfileForm />
            </Box>
            <Box className={classes.likes}>
              <Favourite data={23} />
            </Box>
          </Box>
          <Box className={classes.user_info}>
            <Typography variant="h5" className={classes.user_fullName}>
              {firstName} {lastName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.userName}>
              {userName}
            </Typography>
          </Box>
          <Box className={classes.gallery}>
            <Typography variant="body2" className={classes.text}>
              {details}
            </Typography>
            <Divider className={classes.divider} />
            <UserItinerariesSmall itineraries={data} />
            <Divider className={classes.divider} />
          </Box>
          <CreateItineraryForm />
        </Box>
      </Box>
    )
  } else {
    return (
      <Box className={classes.alt_container}>
        <Box className={classes.alt_container_legend}>
          <Typography variant="h6" align="center" className="profileTitle">
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
