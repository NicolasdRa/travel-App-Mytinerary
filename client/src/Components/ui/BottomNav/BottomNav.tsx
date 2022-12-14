import { SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BottomNavigationAction } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import { CustomAvatar } from '../CustomAvatar/CustomAvatar'
import { selectCurrentUser } from '../../Redux/usersSlice'
import { StyledBottomNavigation } from './styles'

export default function BottomNav() {
  const [value, setValue] = useState('recents')

  const user = useSelector(selectCurrentUser)

  const handleChange = (e: any, newValue: SetStateAction<string>) => {
    setValue(newValue)
  }

  return (
    <StyledBottomNavigation value={value} onChange={handleChange}>
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
    </StyledBottomNavigation>
  )
}
