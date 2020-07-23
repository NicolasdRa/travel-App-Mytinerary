import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { red } from '@material-ui/core/colors'

import {
  Avatar,
  Button,
  Collapse,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EuroIcon from '@material-ui/icons/Euro'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { fetchItineraries } from '../../Components/Redux/itineraries/itineraryActions'

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
    marginLeft: 'auto'
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
    // marginLeft: '.5rem',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },

  cardContent_Gallery: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '.2rem',
    '&:last-child': { paddingBottom: '16px' }
  }
}))

const ActivityCard = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const {
    city,
    category,
    title,
    img,
    price,
    duration,
    hashtags,
    likes
  } = props.activity

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <div className={classes.content}>
        <div className={classes.details}>
          <CardContent className={classes.info}>
            <div className={classes.main_info}>
              <Typography variant='overline' color='textSecondary'>
                {city} - {category}
              </Typography>
              <Typography component='h6' variant='h6'>
                {title}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {hashtags}
              </Typography>
            </div>
            <div
              className={classes.extra_info}
              style={{
                padding: '0'
              }}
            >
              <div className={classes.duration}>
                <AccessTimeIcon className={classes.icons} />
                <Typography variant='body2' color='textSecondary' component='p'>
                  {duration}hs
                </Typography>
              </div>
              <div className={classes.price}>
                <EuroIcon className={classes.icons} />
                <Typography variant='body2' color='textSecondary' component='p'>
                  {price}
                </Typography>
              </div>
            </div>
            {/* <Divider /> */}
          </CardContent>
        </div>
        <CardMedia className={classes.image} image={img} title={title} />
      </div>
      <CardActions
        disableSpacing
        classes={{
          root: classes.actions
        }}
      >
        <div className={classes.author_info}>
          <Avatar
            // aria-label='recipe'
            // variant='rounded'
            className={classes.avatar}
          >
            {/* (get from author_id) */}
            Author Name
          </Avatar>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.author_name}
          >
            {/* ..still to develop this variable */}
            by John Doe
          </Typography>
        </div>
        <div className={classes.action_icons}>
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
        </div>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent
          classes={{
            root: classes.cardContent_Gallery
          }}
        >
          <Button
            size='small'
            color='secondary'
            component={Link}
            to={'/activitypage/' + title}
            className={classes.text_btn}
          >
            VIEW MORE
          </Button>
          {/* activities={props.itinerary.activities.sort((a, b) =>
            a.likes > b.likes ? -1 : 1
            )} */}

          {/* <div>
            <form>
              <TextField
                id='outlined-helperText'
                label='Leave a comment'
                defaultValue=''
                variant='outlined'
                // onChange={}
                // onSubmit={}
                color='primary'
                style={{ margin: '1rem 0 2.5rem 0', width: '95%' }}
              />
            </form>
          </div> */}
        </CardContent>
      </Collapse>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    cities: state.cities.cities,
    itineraries: state.itineraries.itineraries,
    string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: cities => dispatch(fetchItineraries(cities))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCard)
