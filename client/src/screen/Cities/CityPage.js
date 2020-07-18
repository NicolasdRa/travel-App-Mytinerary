import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import ItineraryGallery from '../Itineraries/ItineraryGallery'
import ImageHeader from '../Headers/ImageHeader'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: '100%'
  },

  header: {
    height: '20rem',
    width: '100%'
  },

  city_title: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'left',
    marginTop: '1.5rem',
    marginLeft: '1rem'
  },

  subtitle: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'left',
    marginLeft: '1rem'
  },

  gallery: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'left',
    marginTop: '1.5rem'
  }
}))

function CityPage (props) {
  const classes = useStyles()
  const cityName = props.match.params.city_name

  const city = useSelector(state =>
    state.cities.cities.filter(city => city.name === cityName)
  )
  const itineraries = useSelector(state =>
    state.itineraries.itineraries.filter(
      itineraries => itineraries.city === cityName
    )
  )
  console.log(itineraries)
  const { name, img, country } = city[0]

  return (
    <Box className={classes.content}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.city_title}>
        <Typography variant='overline'>{country}</Typography>
        <Typography variant='h5'>{name}</Typography>
      </Box>
      <Box className={classes.gallery}>
        {itineraries.length > 0 && (
          <Typography className={classes.subtitle}>
            Available itineraries for {name}
          </Typography>
        )}
        <ItineraryGallery itineraries={itineraries} />
      </Box>
    </Box>
  )
}

export default CityPage
