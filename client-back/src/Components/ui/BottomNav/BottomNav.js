import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import { CustomAvatar } from '../CustomAvatar/CustomAvatar'
import { selectCurrentUser } from '../../Redux/usersSlice'

import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#FAFAFA',
  },
})

export default function BottomNav() {
  const classes = useStyles()
  const [value, setValue] = React.useState('recents')

  const user = useSelector(selectCurrentUser)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        value="home"
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/listing"
        label="Explore"
        value="explore"
        icon={<SearchRoundedIcon />}
      />
      {/* <BottomNavigationAction
        component={Link}
        to='/postForm'
        label='Add'
        value='add'
        icon={<AddRoundedIcon />}
      /> */}
      <BottomNavigationAction
        component={Link}
        to={user ? `/user/${user.userName}` : '/'}
        label="Profile"
        value="profile"
        icon={user ? <CustomAvatar /> : <AccountCircleRoundedIcon />}
      />
    </BottomNavigation>
  )
}
