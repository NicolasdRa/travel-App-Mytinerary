import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: props => 'url(' + props.img + ')',
    backgroundPosition: 'center',
    width: '100%',
    height: '10rem',
    backgroundSize: 'cover'
  }
}))

const ImageHeader = props => {
  const classes = useStyles(props)

  return <Box sm={12} className={classes.image} />
}

export default ImageHeader
