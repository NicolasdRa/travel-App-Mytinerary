import { Avatar, Divider, Typography } from '@mui/material'

import { User } from '../../../@types/types'
import { FavouriteComponent } from '../FavouriteComponent/FavouriteComponent'
import { StyledContainer } from './styles'
import EditProfileForm from '../../forms/EditProfileForm/EditProfileForm'

interface PageUserInfoCardProps {
  user: User
}

export const PageUserInfoCard: React.FC<PageUserInfoCardProps> = ({ user }) => {
  const { details, img, firstName, lastName, userName } = user
  
  return (
    <StyledContainer>
      {/* Avatar */}
      <Avatar 
        alt={`${firstName} ${lastName}`} 
        src={img} 
        className="avatar" 
      />
      
      {/* Edit Button positioned next to avatar */}
      <div className="edit_btn">
        <EditProfileForm currentUser={user} />
      </div>
      
      {/* User Info Section */}
      <div className="user_info">
        <Typography variant="h4" className="name">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body1" className="username">
          @{userName}
        </Typography>
      </div>
      
      {/* About Section */}
      {details && (
        <div className="description-container">
          <Typography variant="h6" className="description-title">
            About me
          </Typography>
          <Typography variant="body1" className="description">
            {details}
          </Typography>
        </div>
      )}
      
      <Divider className="divider" />
    </StyledContainer>
  )
}
