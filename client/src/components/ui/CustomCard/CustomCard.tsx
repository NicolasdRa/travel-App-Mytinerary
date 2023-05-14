import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Button,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  CardActions,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { FavouriteComponent } from '../FavouriteComponent/FavouriteComponent'

import { selectCurrentUser } from '../../../redux/usersSlice'
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

export const CustomCard: React.FC<CustomCardProps> = ({ source, ...rest }) => {
  const user = useSelector(selectCurrentUser)

  const { _id, name, country, title, cityName, img, duration, author, price } =
    rest

  const link = getValue(source).link
  const sourceType = getValue(source).sourceType

  if (!img) {
    return (
      <Grid
        container
        className="loader"
        direction="column"
        justifyContent="center"
      >
        <Typography>Loading...</Typography>
        <CircularProgress color="secondary" />
      </Grid>
    )
  }

  return (
    <StyledCard>
      <CardMedia
        component="img"
        alt={`${sourceType} image`}
        image={img}
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
              sourceId={_id}
              userId={user ? user._id : undefined}
            />
          </div>
        </div>

        <Typography variant="h6" color="primary" className="title">
          {source === 'cities' ? name : title}
        </Typography>

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
        <div className="bottom-content">
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
