import React from 'react'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'

import { selectCurrentUser } from '../../Redux/usersSlice'

import { useStyles } from './styles'

export const CustomAvatar = () => {
  const classes = useStyles()

  const user = useSelector(selectCurrentUser)

  if (user) {
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
  } else {
    return <AccountCircleRoundedIcon />
  }
}
