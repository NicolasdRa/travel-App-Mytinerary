import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchItineraries } from '../../store/actions/itineraryActions'

const useStyles = makeStyles({
  card: {
    maxWidth: 500
  },
  media: {
    height: 300
  }
})

const ItineraryCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.itinerary.img}
          title={props.itinerary.city}
        />{' '}
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {' '}
            {props.itinerary.title}{' '}
          </Typography>{' '}
          <Typography variant='body2' color='textSecondary' component='p'>
            {' '}
            {props.itinerary.hashtags}{' '}
          </Typography>{' '}
          <Typography variant='body2' color='textSecondary' component='p'>
            {' '}
            {props.itinerary.price}{' '}
          </Typography>{' '}
          <Typography variant='body2' color='textSecondary' component='p'>
            {' '}
            {props.itinerary.rating}{' '}
          </Typography>{' '}
        </CardContent>{' '}
      </CardActionArea>{' '}
      <CardActions>
        <Button size='small' color='primary'>
          Share{' '}
        </Button>{' '}
        <Button size='small' color='primary'>
          Learn More{' '}
        </Button>{' '}
      </CardActions>{' '}
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    cities: state.cities.cities
    // string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: cities => dispatch(fetchItineraries(cities))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCard)
