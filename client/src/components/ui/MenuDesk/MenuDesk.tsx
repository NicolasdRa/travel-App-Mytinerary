import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import {
  Button,
  Fade,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  SxProps,
  Theme,
} from '@mui/material/'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { CustomAvatar } from '../CustomAvatar/CustomAvatar'

import { logOutUser, selectIsAuthenticated, selectAuthUserId } from '../../../features/auth'
import { unloadCurrentUser, selectCurrentUser } from '../../../redux/usersSlice'

import { StyledList } from './styles'
import { useAppDispatch } from '../../../redux/hooks'

interface MenuDeskProps {
  sx?: SxProps<Theme>
}

export const MenuDesk: React.FC<MenuDeskProps> = ({ sx = [] }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userId = useSelector(selectAuthUserId)
  const user = useSelector(selectCurrentUser)

  // log out functionality
  const handleLogOut = (e: any) => {
    e.preventDefault()
    dispatch(logOutUser())
    dispatch(unloadCurrentUser(userId))
    navigate('/')
  }

  // menu functionality
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  // login button rotate
  const [expanded, setExpanded] = useState(open)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleMenu = (e: any): void => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    handleExpandClick()
    setAnchorEl(null)
  }

  const navItems = [
    {
      url: '/',
      label: 'Home',
    },
    {
      url: '/listing',
      label: 'Browse',
    },
  ]

  return (
    <StyledList sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {navItems.map((item, index) => (
        <ListItem key={index} className="listItem">
          <Button component={Link} to={item.url} className="navLink">
            {item.label}
          </Button>
        </ListItem>
      ))}
      <ListItem className="listItem">
        {user ? (
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="menu"
            aria-controls="desk-menu"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <CustomAvatar />
          </IconButton>
        ) : (
          <Button
            // variant="outlined"
            // component={Link}
            // to="/login"
            aria-label="menu"
            aria-controls="desk-menu"
            aria-haspopup="true"
            onClick={(e) => {
              handleMenu(e)
            }}
            className="navLink"
          >
            Login
            <ArrowDropDownIcon
              style={{ padding: 0, height: '1.1rem', width: '1.1rem' }}
              className={clsx('expand', {
                expandOpen: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            />
          </Button>
        )}
      </ListItem>
      <Menu
        id="desk-menu"
        open={open}
        onClose={handleClose}
        keepMounted
        anchorEl={anchorEl}
        TransitionComponent={Fade}
        // getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        // prop below fixes padding added to body on open
        disableScrollLock={true}
      >
        {isAuthenticated ? (
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={user ? `/user/${user.userName}` : '/'}
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
    </StyledList>
  )
}
