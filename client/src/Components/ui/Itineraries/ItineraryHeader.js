import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151
  },
  controls: {
    //available itineraries
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '0.7rem'
  }
}))

export default function ItineraryHeader (props) {
  // console.log('props :', props)
  const classes = useStyles()
  const { cityName, cityImg, selectedCity } = props
  const itineraries = props.itineraries
  const itineraryNumber = itineraries.length
  const country = selectedCity[0].country
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h4' variant='h4'>
            {cityName}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {country}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography variant='subtitle1' color='textSecondary'>
            Available Mytineraries: {itineraryNumber}
          </Typography>
        </div>
      </div>
      <CardMedia className={classes.cover} image={cityImg} title={cityName} />
    </Card>
  )
}
