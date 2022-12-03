import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import Favourite from '../Favourite/Favourite'

import { useStyles } from './styles'
import { selectCurrentUser } from '../../Redux/usersSlice'

const values = (type) => {
  switch (type) {
    case 'cities':
      return {
        link: '/citypage/',
        sourceType: 'city',
      }
    case 'itineraries':
      return {
        link: '/itinerarypage/',
        sourceType: 'itinerary',
      }
    case 'activities':
      return {
        link: '/activitypage/',
        sourceType: 'activity',
      }

    default:
      return {}
  }
}

export const CustomCard = ({ data, type }) => {
  const classes = useStyles()

  const user = useSelector(selectCurrentUser)

  const { _id, name, country, title, cityName, img, duration, author, price } =
    data

  const link = values(type).link
  const sourceType = values(type).sourceType

  if (!img) {
    return (
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignjustify="center"
      >
        <Typography>Loading...</Typography>
        <CircularProgress color="secondary" />
      </Grid>
    )
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt={`${sourceType} image`}
        image={img}
        className={classes.cardImg}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.firstLine}>
          <Typography
            variant="overline"
            color="textSecondary"
            className={classes.overline}
          >
            {type === 'cities' && country}
            {type === 'itineraries' && cityName}
            {type === 'activities' && cityName}
          </Typography>
          <div className={classes.likesBtn}>
            <Favourite
              sourceType={sourceType}
              sourceId={_id}
              userId={user ? user._id : undefined}
            />
          </div>
        </div>

        <Typography variant="h6" color="primary" className={classes.title}>
          {type === 'cities' ? name : title}
        </Typography>

        {(type === 'itineraries' || type === 'activities') && (
          <div className={classes.authorInfo}>
            <Avatar
              className={classes.avatar}
              src={author ? author.img : 'anonymous'}
            >
              {author ? author.userName : 'anonymous'}
            </Avatar>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.authorName}
            >
              by {author ? author.userName : 'anonymous'}
            </Typography>
          </div>
        )}
        {(type === 'itineraries' || type === 'activities') && (
          <div className={classes.additionalInfo}>
            <div className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                className={classes.infoText}
              >
                {duration}
              </Typography>
            </div>
            <div className={classes.price}>
              <Typography variant="caption" color="textSecondary" component="p">
                Cost: {price}
              </Typography>
            </div>
          </div>
        )}
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="secondary"
          component={Link}
          to={type === 'cities' ? `${link}${name}` : `${link}${title}`}
          className={classes.textBtn}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  )
}

CustomCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}
