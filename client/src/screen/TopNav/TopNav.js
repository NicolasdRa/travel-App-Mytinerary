import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../store/actions/authActions'
import { logOutAll } from '../../store/actions/authActions'
import logo from '../../Images/LogoSmallSimpleGrey.png'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    // marginRight: theme.spacing(2)
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  title: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 100,
    marginLeft: 12
  }
}))

export default function TopNav () {
  const classes = useStyles()
  // const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const history = useHistory()
  // const handleChange = event => {
  //   setAuth(event.target.checked)
  // }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = e => {
    e.preventDefault()
    dispatch(logOutUser(user))

    if ((user = null)) {
      history.push('/')
    }
  }

  const handleLogOutAll = e => {
    e.preventDefault()
    dispatch(logOutAll(user))
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt='Logo' className={classes.logo} />
          {/* <Typography variant='h6' className={classes.title}>
            {isAuthenticated ? 'Hi ' + user.userName + '!' : 'Hi guest user!'}
          </Typography> */}
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            {isAuthenticated ? (
              <MenuItem onClick={handleClose}>
                <Link to='/profile'>Your Profile</Link>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>
                <Link to='/login'>Log in</Link>
              </MenuItem>
            )}
            {isAuthenticated ? (
              <div>
                <MenuItem onClick={handleLogOut}>
                  <Link to='/'>Log out</Link>
                </MenuItem>
                <MenuItem onClick={handleLogOutAll}>
                  <Link to='/'>Log out from all devices</Link>
                </MenuItem>
              </div>
            ) : (
              <MenuItem onClick={handleClose}>
                <Link to='/signup'>Create account</Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <Link to='/cities'>Start browsing</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}
