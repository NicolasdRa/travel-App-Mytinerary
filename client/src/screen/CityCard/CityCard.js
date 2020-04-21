import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: '0.2rem',
    width: '100%',
    padding: '.6rem'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    // width: '65%',
    marginRight: 'auto'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'start'
  },
  image: {
    justifyContent: 'flex-end',
    minWidth: '35%',
    maxWidth: '35%',
    borderRadius: 10,
    boxShadow: '0 2px 6px 0 #c1c9d7, 0 -2px 6px 0 #cce1e9'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    paddingBottom: theme.spacing(1)
  }
}))

export default function CityCard (props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h6' variant='h6'>
            {props.city.name}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {props.city.country}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
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
        </div>
      </div>
      <CardMedia
        className={classes.image}
        image={props.city.img}
        title={props.city.name}
      />
    </Card>
  )
}
