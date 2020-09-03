import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.3rem',
    minWidth: '12rem',
    maxWidth: '14rem',
    overflow: 'visible',

    [theme.breakpoints.up('md')]: {
      maxWidth: '17rem'
    }
  },

  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddinTop: 0
  },

  cardImg: {
    height: '8rem',
    // objectFit: 'cover',
    // minWidth: '4rem',
    borderRadius: 2
  },

  textBtn: { margin: '0 .5rem', fontSize: '.7rem' },

  likesBtn: {
    margin: '0 auto 0 0'
  },

  cardContent: {
    paddingBottom: 0
  }
}))

function CityCard (props) {
  const classes = useStyles()
  const { name, country, img, likes } = props.city

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='City Image'
          // height='120'
          image={img}
          title={name}
          className={classes.cardImg}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2'>{name}</Typography>
          <Typography variant='body2' color='textSecondary'>
            {country}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label='add to favorites' className={classes.likesBtn}>
          <FavoriteIcon />
          <Typography variant='body2' color='textSecondary' component='p'>
            {likes}
          </Typography>
        </IconButton>
        <Button
          size='small'
          color='primary'
          component={Link}
          to={'/citypage/' + name}
          // to={'/itinerarypage/' + city}
          className={classes.textBtn}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  )
}

export default CityCard
