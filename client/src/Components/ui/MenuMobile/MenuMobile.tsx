import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Box,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Theme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { logOutUser } from '../../../redux/authSlice'

import { unloadCurrentUser } from '../../../redux/usersSlice'
import { RootState } from '../../../redux/store'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

interface MenuMobileProps {
  sx?: SxProps<Theme>
}

export const MenuMobile: React.FC<MenuMobileProps> = ({ sx = [] }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const user = useAppSelector((state: RootState) => state.auth.userId)

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
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <IconButton
        edge="start"
        className="menuButton"
        color="inherit"
        // aria-label='menu'
        aria-controls="mobile-menu"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <MenuIcon />
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
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={user ? `/user/${user}` : '/'}
          >
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
    </Box>
  )
}
