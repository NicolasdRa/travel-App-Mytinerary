import React, { useState, useEffect } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser, logOutAll } from '../../Redux/auth/authActions'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  tabContainer: {
    marginLeft: 'auto'
  },

  tab: {
    ...theme.typography.topNavTab
  }
}))

export const MenuDesk = valueFromLogo => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  const [value, setValue] = useState(0)
  const handleChange = (event, value) => {
    setValue(value)
  }

  const handleLogOut = e => {
    e.preventDefault()
    dispatch(logOutUser(user))
    history.push('/')
  }

  const handleLogOutAll = e => {
    e.preventDefault()
    dispatch(logOutAll(user))
    history.push('/')
  }

  // updates tab indicator value on component update
  useEffect(() => {
    if (window.location.pathname === '/') {
      setValue(0)
    }
    // if (window.location.pathname === '/' && valueFromLogo === 0) {
    //   setValue(0)
    // }
    if (window.location.pathname === '/listing' && value !== 0) {
      setValue(0)
    } else if (
      window.location.pathname === '/signup' ||
      (window.location.pathname === '/profile' && value !== 1)
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/login' ||
      (window.location.pathname === '/logout' && value !== 2)
    ) {
      setValue(2)
    }
  }, [value, valueFromLogo])

  return (
    <Tabs
      value={value}
      className={classes.tabContainer}
      onChange={handleChange}
      indicatorColor='secondary'
    >
      <Tab
        className={classes.tab}
        component={Link}
        to='/listing'
        label='Browse'
      />
      {isAuthenticated ? (
        <Tab
          className={classes.tab}
          component={Link}
          to='/profile'
          label='Your Profile'
        />
      ) : (
        <Tab
          className={classes.tab}
          component={Link}
          to='/signup'
          label='Signup'
        />
      )}
      {isAuthenticated ? (
        <Tab
          className={classes.tab}
          component={Link}
          to='/logout'
          label='Log Out'
        />
      ) : (
        <Tab
          className={classes.tab}
          component={Link}
          to='/login'
          label='Login'
        />
      )}
    </Tabs>
  )
}

export default MenuDesk
