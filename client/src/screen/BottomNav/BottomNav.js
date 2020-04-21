import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import AvatarPicture from '../AvatarPicture/AvatarPicture'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#FAFAFA'
  }
})

export default function BottomNav () {
  const classes = useStyles()
  const [value, setValue] = React.useState('recents')
  const user = useSelector(state => state.auth.user)

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
        to='/'
        label='Home'
        value='home'
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/listing'
        label='Explore'
        value='explore'
        icon={<SearchRoundedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/postForm'
        label='Add'
        value='add'
        icon={<AddRoundedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/profile'
        label='Profile'
        value='profile'
        icon={user != null ? <AvatarPicture /> : <AccountCircleRoundedIcon />}
      />
    </BottomNavigation>
  )
}
