import React from 'react'
import { Box } from '@material-ui/core'
import CityCard from './CityCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  gallery: {
    position: 'relative',
    display: 'flex',
    flex: '0 1 auto',
    width: 'auto',
    overflowX: 'auto'

    // [theme.breakpoints.up('sm')]: {
    //   margin: '1rem 3rem'
    // },

    // [theme.breakpoints.up('md')]: {
    //   margin: '1rem 5rem'
    // }

    // [theme.breakpoints.up('lg')]: {
    //   width: '30em'
    // }
  }
}))

const CityGallery = props => {
  const classes = useStyles()
  const { cities } = props

  return (
    <Box className={classes.gallery}>
      {cities.map(city => (
        <CityCard city={city} key={city._id} />
      ))}
    </Box>
  )
}

export default CityGallery
