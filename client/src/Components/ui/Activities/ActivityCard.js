import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EuroIcon from '@material-ui/icons/Euro'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.3rem',
    minWidth: '12rem',
    maxWidth: '15rem',
    overflow: 'visible'
  },

  cardHeader: {
    paddingBottom: '13px'
  },

  title: {
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: '500'
  },

  subheader: {
    textAlign: 'left',
    fontSize: '.8rem'
  },

  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: '0',
    paddingTop: '13px'
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
    height: '1rem',
    width: '1rem',
    alignSelf: 'flex-start'
  },

  authorInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  authorName: {
    margin: '0 0 0 5px',
    fontSize: '.7rem'
  },

  additionalInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
    // padding: '5px 5px 0 0'
  },

  duration: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '.7rem'
    // marginRight: '8px'
  },

  price: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    fontSize: '.7rem'
  },

  icons: {
    height: '.7rem',
    width: '.7rem',
    fill: 'grey',
    marginRight: '3px'
  },

  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: 0,
    paddingBottom: 0
  },

  textBtn: { margin: '0 3px 5px 0', fontSize: '.7rem' },

  likesBtn: {
    paddingLeft: '8px'
  }
}))

const ActivityCard = props => {
  const classes = useStyles()

  const activity = props.activity
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

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.title,
          subheader: classes.subheader,
          action: classes.additionalInfo
        }}
        title={title}
        subheader={city}
        //action={}
      />
      <CardMedia className={classes.media} image={img} />
      <CardContent className={classes.cardContent}>
        <Box className={classes.authorInfo}>
          <Avatar className={classes.avatar}>
            {/* (get from author_id) */}
            Author Name
          </Avatar>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.authorName}
          >
            {/* {..still to develop this variable} */}
            by John Doe
          </Typography>
        </Box>
        <Box className={classes.additionalInfo}>
          <Box className={classes.duration}>
            <AccessTimeIcon className={classes.icons} />
            <Typography variant='caption' color='textSecondary' component='p'>
              {duration}hs
            </Typography>
          </Box>
          <Box className={classes.price}>
            <EuroIcon className={classes.icons} />
            <Typography variant='caption' color='textSecondary' component='p'>
              {price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label='add to favorites' className={classes.likesBtn}>
          <FavoriteIcon />
          <Typography variant='body2' color='textSecondary' component='p'>
            {likes.length}
          </Typography>
        </IconButton>
        <Button
          size='small'
          color='primary'
          component={Link}
          to={'/activitypage/' + title}
          className={classes.textBtn}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  )
}

export default ActivityCard
