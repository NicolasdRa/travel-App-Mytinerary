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
  const { userName, firstName, img } = useSelector(
    state => state.users.currentUser
  )

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
