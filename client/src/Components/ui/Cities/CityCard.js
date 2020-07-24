import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { red } from '@material-ui/core/colors'
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Button,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.2rem',
    width: '100%'
    // padding: '.6rem .6rem 0 .6rem'
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  info: {
    flex: '1 0 auto',
    flexDirection: 'row',
    textAlign: 'start',
    padding: '16px',
    '&:last-child': { paddingBottom: '8px' }
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '60%'
    // marginRight: 'auto'
  },

  image: {
    justifyContent: 'flex-end',
    minWidth: '40%',
    maxWidth: '40%'
    // borderRadius: 10,
    // boxShadow: '0 2px 6px 0 #c1c9d7, 0 -2px 6px 0 #cce1e9'
  },

  actions: {
    display: 'flex',
    padding: '2px'
  },

  author_info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  extra_info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '8px'
  },

  duration: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  price: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 0 1rem'
  },

  action_icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '10rem',
    marginLeft: 'auto',
    paddingLeft: '.3rem'
  },

  icons: {
    height: '1rem',
    width: '1rem',
    fill: 'grey'
  },

  avatar: {
    backgroundColor: red[500],
    margin: '0 0.8rem',
    width: '1.5rem',
    height: '1.5rem'
  },

  author_name: {
    alignSelf: 'center'
  },

  likes_btn: {
    marginRight: '22%',
    paddingLeft: '14px'
  },

  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },

  expandedCardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '0',
    '&:last-child': { paddingBottom: '16px' }
  },

  info_display: { textAlign: 'center', margin: '.5rem 0' },

  text_btn: { margin: '0 auto' }
}))

function CityCard (props) {
  const classes = useStyles()
  const { name, country, img, likes } = props.city
  // const itineraries = useSelector(state => state.itineraries.itineraries)

  // const filteredItineraries = [
  //   ...itineraries.filter(itinerary => {
  //     if (itinerary.city === name) return itinerary
  //   })
  // ]

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.details}>
          <CardContent className={classes.info}>
            <Box className={classes.main_info}>
              <Typography component='h6' variant='h6'>
                {name}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {country}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <CardMedia className={classes.image} image={img} title={name} />
      </Box>
      <CardActions
        disableSpacing
        classes={{
          root: classes.actions
        }}
      >
        <Box className={classes.action_icons}>
          <IconButton
            aria-label='add to favorites'
            className={classes.likes_btn}
          >
            <FavoriteIcon />
            <Typography variant='body2' color='textSecondary' component='p'>
              {likes}
            </Typography>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent
          classes={{
            root: classes.expandedCardContent
          }}
        >
          {/* <Box className={classes.info_display}>
            {filteredItineraries.length === 0 && (
              <Typography>No itineraries found for ' {name} '</Typography>
            )}
            {filteredItineraries.length === 1 && (
              <Typography>
                {filteredItineraries.length} itinerary found for ' {name} '
              </Typography>
            )}
            {filteredItineraries.length > 1 && (
              <Typography>
                {filteredItineraries.length} itineraries found for ' {name} '
              </Typography>
            )}
          </Box> */}

          <Button
            size='small'
            color='secondary'
            component={Link}
            to={'/citypage/' + name}
            // to={'/itinerarypage/' + city}
            className={classes.text_btn}
          >
            VIEW MORE
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default CityCard
