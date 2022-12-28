import { SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BottomNavigationAction, SxProps, Theme } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import { CustomAvatar } from '../../ui/CustomAvatar/CustomAvatar'
import { selectCurrentUser } from '../../../redux/usersSlice'
import { StyledBottomNavigation } from './styles'

interface BottomNavProps {
  sx?: SxProps<Theme>
}

export const BottomNav: React.FC<BottomNavProps> = ({ sx = [] }) => {
  const [value, setValue] = useState('recents')

  const user = useSelector(selectCurrentUser)

  const handleChange = (e: any, newValue: SetStateAction<string>) => {
    setValue(newValue)
  }

  return (
    <StyledBottomNavigation
      value={value}
      onChange={handleChange}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
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
    </StyledBottomNavigation>
  )
}
