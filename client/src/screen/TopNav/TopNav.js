import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../store/actions/authActions'
import { logOutAll } from '../../store/actions/authActions'
import logo from '../../Images/LogoSmallSimpleGrey.png'

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
  }

  const handleLogOutAll = e => {
    e.preventDefault()
    dispatch(logOutAll(user))
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
              <React.Fragment>
                <MenuItem onClick={handleLogOut}>
                  <Link to='/'>Log out</Link>
                </MenuItem>
                <MenuItem onClick={handleLogOutAll}>
                  <Link to='/'>Log out from all devices</Link>
                </MenuItem>
              </React.Fragment>
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
    // <div className={classes.root}>
    //   <AppBar position='fixed'>
    //     <Toolbar>
    //       {auth && (
    //         <div>
    //           <IconButton
    //             aria-label='account of current user'
    //             aria-controls='menu-appbar'
    //             aria-haspopup='true'
    //             onClick={handleMenu}
    //             color='inherit'
    //           >
    //             <AccountCircle />
    //           </IconButton>
    //           <Menu
    //             id='menu-appbar'
    //             anchorEl={anchorEl}
    //             anchorOrigin={{
    //               vertical: 'top',
    //               horizontal: 'right'
    //             }}
    //             keepMounted
    //             transformOrigin={{
    //               vertical: 'top',
    //               horizontal: 'right'
    //             }}
    //             open={open}
    //             onClose={handleClose}
    //           >
    //             {isAuthenticated ? (
    //               <MenuItem onClick={handleLogOut}>
    //                 <Link to='#'>Log out</Link>
    //               </MenuItem>
    //             ) : (
    //               ((
    //                 <MenuItem onClick={handleClose}>
    //                   <Link to='/login'>Log in</Link>
    //                 </MenuItem>
    //               ),
    //               (
    //                 <MenuItem onClick={handleClose}>
    //                   <Link to='/signup'>Create account</Link>
    //                 </MenuItem>
    //               ))
    //             )}
    //           </Menu>
    //         </div>
    //       )}
    //       <Typography variant='h6' className={classes.title}>
    //         User´s Name / code
    //       </Typography>
    //       <IconButton
    //         edge='start'
    //         className={classes.menuButton}
    //         color='inherit'
    //         aria-label='menu'
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //     </Toolbar>
    //   </AppBar>
    //   <FormGroup>
    //     <FormControlLabel
    //       control={
    //         <Switch
    //           checked={auth}
    //           onChange={handleChange}
    //           aria-label='login switch'
    //         />
    //       }
    //       label={auth ? 'Logout' : 'Login'}
    //     />
    //   </FormGroup>
    // </div>
  )
}
