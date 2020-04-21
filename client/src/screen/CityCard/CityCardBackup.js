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
  root: {
    paddingBottom: '0'
  },
  card: {
    margin: '0.2rem'
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  media: {
    display: 'flex',
    width: '10rem'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    alignContent: 'flex-start'
  }
})

const CityCard = props => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.card}>
        <CardActionArea className={classes.container}>
          <div className={classes.container}>
            <CardMedia className={classes.media} image={props.city.img} />
            <CardContent
              className={classes.content}
              style={{ paddingBottom: '1rem' }}
            >
              <Typography variant='h5' component='h2'>
                {props.city.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {props.city.country}
              </Typography>
              <Button
                size='small'
                color='secondary'
                component={Link}
                to={'/itineraries/' + props.city.name}
                style={{
                  display: 'inline-block',
                  marginTop: '.5rem',
                  padding: '0'
                }}
              >
                VIEW ITINERARIES
              </Button>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default CityCard
