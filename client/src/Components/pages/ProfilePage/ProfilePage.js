import React from 'react'
import { useSelector } from 'react-redux'

import PuffLoader from 'react-spinners/PuffLoader'
import { Avatar, Box, Divider, Typography } from '@material-ui/core'

import CreateItineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'
import ImageHeader from '../../ui/Headers/ImageHeader'
import UserItinerariesSmall from '../../ui/Itineraries/UserItinerariesSmall'
import EditProfileForm from '../../ui/EditProfileForm/EditProfileForm'
import Favourite from '../../ui/Favourite/Favourite'

import { useStyles } from './styles'
import { selectCurrentUser } from '../../Redux/usersSlice'

const Profile = () => {
  const classes = useStyles()

  const user = useSelector(selectCurrentUser)

  // TODO load favourites

  if (!user) {
    return (
      <div className={classes.loader}>
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    )
  }

  // variables for ui
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
            <EditProfileForm />
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
            className={classes.userName}
          >
            {userName}
          </Typography>
        </Box>
        <Box className={classes.gallery}>
          <Typography variant="body2" className={classes.text}>
            {details}
          </Typography>
          <Divider className={classes.divider} />
          <UserItinerariesSmall />
          <Divider className={classes.divider} />
        </Box>
        <CreateItineraryForm />
      </Box>
    </Box>
  )
}

export default Profile
