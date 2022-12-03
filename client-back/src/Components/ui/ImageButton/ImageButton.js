import React from 'react'
import PropTypes from 'prop-types'

import { ButtonBase, Typography } from '@mui/material'

import { useStyles } from './styles'

const images = [
  {
    // url: '/resources/defaultProfileCover.jpg',
    title: 'cover',
    width: '80%',
  },
  // {
  //   url: '/static/images/grid-list/burgers.jpg',
  //   title: 'Burgers',
  //   width: '30%'
  // }
  //   {
  //     url: '/static/images/grid-list/camera.jpg',
  //     title: 'Camera',
  //     width: '30%'
  //   }
]

const ImageButton = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
          onClick={props.handleClick}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${props.coverImg})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  )
}

ImageButton.propTypes = {
  coverImg: PropTypes.string.isRequired,
}

export default ImageButton
