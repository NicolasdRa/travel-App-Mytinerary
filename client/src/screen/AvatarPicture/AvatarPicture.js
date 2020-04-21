import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.4),
      backgroundColor: 'orangered'
    }
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}))

export default function ImageAvatars () {
  const classes = useStyles()
  const user = useSelector(state => state.auth.user)

  let initials = user.userName.charAt(0).toUpperCase()

  return (
    <div className={classes.root}>
      <Avatar src={user.img} className={classes.small} alt={user.userName}>
        {initials}
      </Avatar>
    </div>
  )
}
