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
import './CityCard.css'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    maxWidth: 500
  },
  media: {
    height: 300
  }
})

const CityCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.city.img}
          title={props.city.name}
        />{' '}
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {' '}
            {props.city.name}{' '}
          </Typography>{' '}
          <Typography variant='body2' color='textSecondary' component='p'>
            {' '}
            {props.city.country}{' '}
          </Typography>{' '}
        </CardContent>{' '}
      </CardActionArea>{' '}
      <CardActions>
        <Button size='small' color='primary'>
          Share{' '}
        </Button>{' '}
        <Button size='small' color='primary'>
          <Link to={'/itineraries/' + props.city.name}>
            {' '}
            Go to Itineraries{' '}
          </Link>{' '}
        </Button>{' '}
      </CardActions>{' '}
    </Card>
  )
}

export default CityCard
