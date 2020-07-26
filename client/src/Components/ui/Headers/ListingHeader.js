import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: props => 'url(' + props.city.img + ')',
    backgroundPosition: 'center',
    width: '100%',
    height: '10rem',
    backgroundSize: 'cover',
    borderRadius: '5px',

    [theme.breakpoints.up('sm')]: {
      height: '15rem'
    },
    [theme.breakpoints.up('lg')]: {
      height: '30rem'
    }
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: 'white',
    padding: '1rem 1.5rem'
  }
}))

// image header for listing tabs: cities, itineraries, activities
const ListingHeader = props => {
  const classes = useStyles(props)
  const { city } = props

  return (
    <Box sm={12} className={classes.image}>
      <Box className={classes.title}>
        <Typography variant='h6'>{city.name}</Typography>
      </Box>
    </Box>
  )
}

export default ListingHeader
