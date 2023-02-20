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
      <div className="top-container">
        <Typography className="overline" variant="overline">
          {overline}
        </Typography>
        <div className="topRight">
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
      </div>

      <div className="info">
        <div className="infoLeft">
          <div className="title">
            <Typography variant="h5">{title}</Typography>
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
            <Typography
              className="rating-number"
              color="primary"
              variant="body2"
            >
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
        </div>
        <div className="infoRight">
          {description && (
            <div className="description-desktop">
              <Typography variant="body1" className="description-title">
                Description
              </Typography>
              <Typography variant="body2" className="description-text">
                {description}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <Divider className="divider" />
      {description && (
        <div className="description-mobile">
          <Typography variant="body1" className="description-title">
            Description
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Divider className="divider" />
        </div>
      )}
    </StyledContainer>
  )
}
