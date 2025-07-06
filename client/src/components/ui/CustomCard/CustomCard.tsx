import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { memo } from 'react'

import {
  Avatar,
  Button,
  CardContent,
  Typography,
  CircularProgress,
  CardActions,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { FavouriteComponent } from '../FavouriteComponent/FavouriteComponent'
import { FallbackImage } from '../FallbackImage/FallbackImage'

import { selectCurrentUser } from '../../../redux/usersSlice'
import { selectAuthUserId } from '../../../features/auth/authSlice'
import { StyledCard } from './styles'

interface Values {
  cities: {
    link: string
    sourceType: 'city' | 'itinerary' | 'activity'
  }
  itineraries: {
    link: string
    sourceType: 'city' | 'itinerary' | 'activity'
  }
  activities: {
    link: string
    sourceType: 'city' | 'itinerary' | 'activity'
  }
}

const getValue = (source: 'cities' | 'itineraries' | 'activities') => {
  const values: Values = {
    cities: {
      link: '/citypage/',
      sourceType: 'city',
    },
    itineraries: {
      link: '/itinerarypage/',
      sourceType: 'itinerary',
    },
    activities: {
      link: '/activitypage/',
      sourceType: 'activity',
    },
  }
  return values[source]
}

interface CustomCardProps {
  source: 'itineraries' | 'cities' | 'activities'
  // All other props
  [x: string]: any
}

const CustomCardComponent: React.FC<CustomCardProps> = ({ source, ...rest }) => {
  const user = useSelector(selectCurrentUser)
  const authUserId = useSelector(selectAuthUserId)

  const { _id, id, name, country, title, cityName, img, duration, author, price } =
    rest

  const link = getValue(source).link
  const sourceType = getValue(source).sourceType
  
  // Use either _id or id, whichever is available
  const sourceId = _id || id


  return (
    <StyledCard>
      <FallbackImage
        src={img}
        alt={name || title || `${sourceType} image`}
        fallbackType={sourceType === 'city' ? 'city' : sourceType === 'activity' ? 'activity' : 'travel'}
        width="100%"
        height="160px"
        className="cardImg"
      />
      <CardContent className="cardContent">
        <div className="firstLine">
          <Typography
            variant="overline"
            color="textSecondary"
            className="overline"
          >
            {source === 'cities' && country}
            {source === 'itineraries' && cityName}
            {source === 'activities' && cityName}
          </Typography>
          <div className="likesBtn">
            <FavouriteComponent
              sourceType={sourceType}
              sourceId={sourceId}
              userId={authUserId}
            />
          </div>
        </div>

        <Typography variant="h6" color="primary" className="title">
          {source === 'cities' ? name : title}
        </Typography>

        <div className="bottom-content">
          {(source === 'itineraries' || source === 'activities') && author && (
            <div className="authorInfo">
              <Avatar className="avatar" src={author ? author.img : 'anonymous'}>
                {author ? author.userName : 'anonymous'}
              </Avatar>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="authorName"
              >
                by {author ? author.userName : 'anonymous'}
              </Typography>
            </div>
          )}
          <div className="additionalInfo">
            {duration && (
              <div className="duration">
                <AccessTimeIcon className="icons" />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                  className="infoText"
                >
                  {duration}
                </Typography>
              </div>
            )}
            {price && (
              <div className="price">
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                  className="infoText"
                >
                  Cost: {price}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardActions className="cardActions">
        <Button
          size="small"
          color="secondary"
          component={Link}
          to={source === 'cities' ? `${link}${name}` : `${link}${title}`}
          className="textBtn"
        >
          View more
        </Button>
      </CardActions>
    </StyledCard>
  )
}

export const CustomCard = memo(CustomCardComponent)
