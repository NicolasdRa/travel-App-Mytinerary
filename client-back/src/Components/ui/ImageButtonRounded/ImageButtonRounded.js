import React from 'react'
import { makeStyles } from 'tss-react/mui'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const images = [
  {
    // url: '/resources/defaultProfileCover.jpg',
    title: 'profile',
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 auto',
    minWidth: '5rem',
    maxWidth: '50%',
  },
  image: {
    position: 'relative',
    marginTop: '-2rem',
    minHeight: '5rem',
    [theme.breakpoints.down('xs')]: {
      width: '5rem !important', // Overrides inline-style
      height: '5rem',
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '3px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    borderRadius: '50%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    borderRadius: '50%',
    border: '2px solid white',
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
      1
    )}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
    borderRadius: '.5rem',
  },
}))

const ImageButtonRounded = (props) => {
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
              backgroundImage: `url(${props.img})`,
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

ImageButtonRounded.propTypes = {
  img: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default ImageButtonRounded
