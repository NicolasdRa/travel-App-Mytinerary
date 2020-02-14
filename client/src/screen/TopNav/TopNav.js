import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AvatarPicture from '../AvatarPicture/AvatarPicture'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function TopNav () {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleChange = event => {
    setAuth(event.target.checked)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            {user != null ? <AvatarPicture /> : <AccountCircle />}
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {isAuthenticated
              ? 'Hi ' + user.userName + '!'
              : 'Hello guest user!'}
          </Typography>
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
              <MenuItem onClick={() => dispatch({ type: 'LOGOUT_SUCCESS' })}>
                <Link to='#'>Log out</Link>
              </MenuItem>
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
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label='login switch'
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
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
