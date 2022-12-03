import { useSelector } from 'react-redux'

import Avatar from '@mui/material/Avatar'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'

import { selectCurrentUser } from '../../Redux/usersSlice'
import { StyledContainer } from './styles'

export const CustomAvatar = () => {
  const user = useSelector(selectCurrentUser)

  if (user) {
    const { userName, img } = user

    let initials
    userName ? (initials = userName.charAt(0).toUpperCase()) : (initials = 'U')

    return (
      <StyledContainer>
        <Avatar src={img} className="small" alt={userName}>
          {initials}
        </Avatar>
      </StyledContainer>
    )
  } else {
    return <AccountCircleRoundedIcon />
  }
}
