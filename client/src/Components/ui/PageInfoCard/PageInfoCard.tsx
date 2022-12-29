import { Avatar, Box, Divider, Rating, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EuroIcon from '@mui/icons-material/Euro'

import { Activity, Favourite, User } from '../../../@types/types'
import { FavouriteComponent } from '../FavouriteComponent/FavouriteComponent'
import { StyledContainer } from './styles'

interface PageInfoCardProps {
  user: User | null
  itemId: string
  overline: string
  title: string | undefined
  subtitle?: string
  activities?: Activity[]
  source: 'itinerary' | 'city' | 'activity'
  favourites?: Favourite[]
  ratingAvg?: number
  authorName?: string
  authorImg?: string
  duration?: string
  price?: string
  description?: string
}

export const PageInfoCard: React.FC<PageInfoCardProps> = ({
  user,
  itemId,
  overline,
  title,
  source,
  favourites,
  ratingAvg,
  authorName,
  authorImg,
  duration,
  price,
  description,
}) => {
  return (
    <StyledContainer>
      <Typography className="overline" variant="overline">
        {overline}
      </Typography>
      <div className="info">
        <div className="title">
          <Typography variant="h5">{title}</Typography>
        </div>
        <div className="likes">
          {user && favourites && (
            <FavouriteComponent
              readOnly={!user._id && true}
              amount={favourites ? favourites.length : 0}
              sourceType={source}
              sourceId={itemId}
              userId={user._id}
            />
          )}
        </div>
      </div>
      <Box
        component="fieldset"
        borderColor="transparent"
        className="rating-container"
      >
        <Rating
          name="read-only"
          size="small"
          precision={0.5}
          value={ratingAvg}
          readOnly
        />
        <Typography className="rating-number" color="primary" variant="body2">
          ({ratingAvg})
        </Typography>
      </Box>
      <div className="extra-info">
        <div className="user-info">
          <Avatar
            // aria-label='recipe'
            // variant='rounded'
            alt={authorName}
            src={authorImg}
            className="avatar"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="author_name"
          >
            {authorName ? `by ${authorName}` : 'by anonymous'}
          </Typography>
        </div>
        <div className="price-time">
          <div className="duration">
            <AccessTimeIcon className="icons" />
            <Typography variant="body2" color="textSecondary" component="p">
              {duration}
            </Typography>
          </div>
          <div className="price">
            <EuroIcon className="icons" />
            <Typography variant="body2" color="textSecondary" component="p">
              {price}
            </Typography>
          </div>
        </div>
      </div>
      <Divider className="divider" />
      <Typography variant="body2" className="decription">
        {description}
      </Typography>
      <Divider className="divider" />
    </StyledContainer>
  )
}
