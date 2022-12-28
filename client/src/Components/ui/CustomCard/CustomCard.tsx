import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  CircularProgress,
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

const getValue = (type: 'cities' | 'itineraries' | 'activities') => {
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
  return values[type]
}

interface CustomCardProps {
  data: any
  type: 'cities' | 'itineraries' | 'activities'
}

export const CustomCard: React.FC<CustomCardProps> = ({ data, type }) => {
  const user = useSelector(selectCurrentUser)

  const { _id, name, country, title, cityName, img, duration, author, price } =
    data

  const link = getValue(type).link
  const sourceType = getValue(type).sourceType

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
            {type === 'cities' && country}
            {type === 'itineraries' && cityName}
            {type === 'activities' && cityName}
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
          {type === 'cities' ? name : title}
        </Typography>

        {(type === 'itineraries' || type === 'activities') && (
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
        {(type === 'itineraries' || type === 'activities') && (
          <div className="additionalInfo">
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
            <div className="price">
              <Typography variant="caption" color="textSecondary" component="p">
                Cost: {price}
              </Typography>
            </div>
          </div>
        )}
      </CardContent>

      <CardActions className="cardActions">
        <Button
          size="small"
          color="secondary"
          component={Link}
          to={type === 'cities' ? `${link}${name}` : `${link}${title}`}
          className="textBtn"
        >
          View more
        </Button>
      </CardActions>
    </StyledCard>
  )
}
