import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Fade, IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { CustomAvatar } from '../CustomAvatar/CustomAvatar'

import { logOutUser } from '../../Redux/authSlice'

import { useStyles } from './styles'

import { unloadCurrentUser } from '../../Redux/usersSlice'

export const MenuMobile = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  // log out functionality
  const handleLogOut = (e) => {
    e.preventDefault()
    dispatch(logOutUser())
    dispatch(unloadCurrentUser())
    history.push('/')
  }

  // menu functionality
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        // aria-label='menu'
        aria-controls="mobile-menu"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        {user ? <CustomAvatar /> : <MenuIcon />}
      </IconButton>

      <Menu
        id="mobile-menu"
        open={open}
        onClose={handleClose}
        keepMounted
        anchorEl={anchorEl}
        TransitionComponent={Fade}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {isAuthenticated ? (
          <MenuItem onClick={handleClose} component={Link} to="/profile">
            Your Profile
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} component={Link} to="/login">
            Login
          </MenuItem>
        )}
        {isAuthenticated ? (
          <MenuItem onClick={handleLogOut} component={Link} to="/">
            Log out
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} component={Link} to="/signup">
            Signup
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}
