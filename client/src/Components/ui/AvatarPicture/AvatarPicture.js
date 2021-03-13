import React from 'react'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'

import { selectCurrentUser } from '../../Redux/usersSlice'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.4),
      backgroundColor: 'orangered',
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}))

const AvatarPicture = () => {
  const classes = useStyles()

  const user = useSelector(selectCurrentUser)

  const { userName, img } = user

  let initials
  userName ? (initials = userName.charAt(0).toUpperCase()) : (initials = 'U')

  return (
    <div className={classes.root}>
      <Avatar src={img} className={classes.small} alt={userName}>
        {initials}
      </Avatar>
    </div>
  )
}

export default AvatarPicture
