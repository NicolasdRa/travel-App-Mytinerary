import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EuroIcon from '@material-ui/icons/Euro'

import { useStyles } from './styles'

const ActivityCard = (props) => {
  const classes = useStyles()

  const { city, title, img, pricing, duration, likes } = props.activity

  if (!img) {
    return (
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignjustify="center">
        <Typography>Loading itinearies...</Typography>
        <CircularProgress color="secondary" />
      </Grid>
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.title,
          subheader: classes.subheader,
          action: classes.additionalInfo,
        }}
        title={title}
        subheader={city.name}
        //action={}
      />
      <CardMedia
        // component="img"
        alt="Activity Image"
        className={classes.media}
        image={img}
      />
      <CardContent className={classes.cardContent}>
        <Box className={classes.authorInfo}>
          <Avatar className={classes.avatar}>
            {/* (get from author_id) */}
            Author Name
          </Avatar>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.authorName}>
            {/* {..still to develop this variable} */}
            by John Doe
          </Typography>
        </Box>
        <Box className={classes.additionalInfo}>
          <Box className={classes.duration}>
            <AccessTimeIcon className={classes.icons} />
            <Typography variant="caption" color="textSecondary" component="p">
              {duration}hs
            </Typography>
          </Box>
          <Box className={classes.price}>
            <EuroIcon className={classes.icons} />
            <Typography variant="caption" color="textSecondary" component="p">
              {pricing.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="add to favorites" className={classes.likesBtn}>
          <FavoriteIcon />
          <Typography variant="body2" color="textSecondary" component="p">
            {likes}
          </Typography>
        </IconButton>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={'/activitypage/' + title}
          className={classes.textBtn}>
          View more
        </Button>
      </CardActions>
    </Card>
  )
}

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
}

export default ActivityCard
