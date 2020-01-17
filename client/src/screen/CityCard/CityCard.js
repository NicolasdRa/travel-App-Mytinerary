import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    margin: '0.3rem',
    display: ''
  },
  media: {
    height: '8rem'
  }
})

const CityCard = props => {
  const classes = useStyles()

  return (
    <Grid item xs={6}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.city.img}
            title={props.city.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {props.city.name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {props.city.country}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              href='#contained-buttons'
              component={Link}
              to={'/itineraries/' + props.city.name}
              style={{ marginTop: '0.5rem' }}
            >
              ITINERARIES
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default CityCard
