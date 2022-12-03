import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Fade, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { CustomAvatar } from '../CustomAvatar/CustomAvatar'

import { logOutUser } from '../../Redux/authSlice'

import { unloadCurrentUser } from '../../Redux/usersSlice'
import { RootState } from '../../Redux/store'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'

export const MenuMobile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const user = useAppSelector((state: RootState) => state.auth.user)

  // log out functionality
  const handleLogOut = (e: any) => {
    e.preventDefault()
    dispatch(logOutUser())
    dispatch(unloadCurrentUser(user))
    navigate('/')
  }

  // menu functionality
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenu = (e: any) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        edge="start"
        className="menuButton"
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
