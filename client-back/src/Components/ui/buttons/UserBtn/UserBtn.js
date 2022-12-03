import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Avatar,
  Box,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'

import { useTheme } from '@mui/styles'
import { useStyles } from './styles'

export const UserBtn = ({ img, firstName, lastName, email }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('couponCode')
      localStorage.removeItem('referrer')
      // dispatch(signOutUser())
    } catch (error) {
      console.error(error)
    }
    handleClose()
  }

  return (
    <Box>
      {user ? (
        <Tooltip
          title={
            firstName && lastName
              ? `mytinerary account: ${firstName} ${lastName} ${email}`
              : `mytinerary account: ${email}`
          }
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.customWidth }}
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar src={img} className={classes.small} />
          </IconButton>
        </Tooltip>
      ) : (
        <AccountCircle />
      )}
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={handleSignOut} className={classes.menuItem}>
          Log out
        </MenuItem>
      </Menu>
    </Box>
  )
}
