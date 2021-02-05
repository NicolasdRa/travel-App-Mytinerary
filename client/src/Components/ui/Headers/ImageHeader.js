import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: (props) => `url(${props.img})`,
    backgroundPosition: 'center',
    width: '100%',
    height: '10rem',
    backgroundSize: 'cover',

    [theme.breakpoints.up('sm')]: {
      height: '15rem',
    },
    [theme.breakpoints.up('lg')]: {
      height: '30rem',
    },
  },
}))

// image header for profile, itinerary, activity pages
const ImageHeader = (props) => {
  const classes = useStyles(props)

  return <Box sm={12} className={classes.image} />
}

ImageHeader.propTypes = {
  className: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default ImageHeader
