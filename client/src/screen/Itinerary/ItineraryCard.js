import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Typography, TextField } from '@material-ui/core'
import ActivityGallery from '../Activities/ActivityGallery'
import { connect } from 'react-redux'
import { fetchItineraries } from '../../store/actions/itineraryActions'
import './ItineraryCard.css'

const useStyles = makeStyles(theme => ({
  card: {
    Width: '100%',
    margin: '3px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '.2rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  headerTitle: {
    padding: '.5rem'
  },
  cardContent: {
    padding: '.2rem'
  },
  actionButtons: {
    padding: '.2rem'
  },
  availableActivities: {
    margin: 'auto'
  },
  cardContentGallery: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '.2rem'
  }
}))

const ItineraryCard = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const { title, likes, duration, price, hashtags } = props.itinerary

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label='recipe'
            variant='rounded'
            className={classes.avatar}
          >
            user
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant='h6' color='textPrimary'>
            {title}
          </Typography>
        }
        subheader={
          <div className='itinerary_info_summary'>
            <Typography variant='body2' color='textSecondary' component='p'>
              Likes: {likes}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Duration:{duration} hours
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Price: {price}
            </Typography>
          </div>
        }
        classes={{
          root: classes.headerTitle
        }}
      />
      <CardContent
        classes={{
          root: classes.cardContent
        }}
      >
        <div className='itinerary_hashtags'>
          <Typography variant='body2' color='textSecondary' component='p'>
            {hashtags}
          </Typography>
        </div>
      </CardContent>
      <CardActions
        disableSpacing
        classes={{
          root: classes.actionButtons
        }}
      >
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          classes={{
            root: classes.availableActivities
          }}
        >
          Available Activities: {props.itinerary.activities.length}
        </Typography>
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
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent
          classes={{
            root: classes.cardContentGallery
          }}
        >
          <ActivityGallery
            className={classes.media}
            activities={props.itinerary.activities.sort((a, b) =>
              a.likes > b.likes ? -1 : 1
            )}
          />
          <div>
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
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    cities: state.cities.cities
    // string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: cities => dispatch(fetchItineraries(cities))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCard)
