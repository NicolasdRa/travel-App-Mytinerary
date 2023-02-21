import { Avatar, Divider, Typography } from '@mui/material'

import { User } from '../../../@types/types'
import { FavouriteComponent } from '../FavouriteComponent/FavouriteComponent'
import { StyledContainer } from './styles'
import EditProfileForm from '../../forms/EditProfileForm/EditProfileForm'

interface PageUserInfoCardProps {
  user: User
}

export const PageUserInfoCard: React.FC<PageUserInfoCardProps> = ({ user }) => {
  const { details, favourites, img, firstName, lastName, userName } = user
  return (
    <StyledContainer>
      <Avatar alt={firstName + '' + lastName} src={img} className="avatar" />
      <div className="info">
        <div className="edit_btn">
          <EditProfileForm currentUser={user} />
        </div>
      </div>
      <div className="user_info">
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="username"
        >
          {userName}
        </Typography>
      </div>
      <div className="description-container">
        <Typography variant="body2" className="description-title">
          About me
        </Typography>
        <Typography variant="body2" className="description">
          {details}
        </Typography>
        <Divider className="divider" />
      </div>
    </StyledContainer>
  )
}
