import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { useSelector } from 'react-redux'
import { deepOrange } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  avatarPic: {
    padding: 0,
    margin: 0
  },
  small: {
    width: '0.5rem',
    height: '0.5rem'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}))

export default function ImageAvatars () {
  const classes = useStyles()
  const user = useSelector(state => state.auth.user)

  let initials = user.userName.charAt(0).toUpperCase()

  return (
    <div
      classes={{
        root: classes.avatarPic
      }}
    >
      <Avatar
        src={user.img}
        className={classes.small.orange}
        alt={user.userName}
      >
        {initials}
      </Avatar>
    </div>
  )
}
