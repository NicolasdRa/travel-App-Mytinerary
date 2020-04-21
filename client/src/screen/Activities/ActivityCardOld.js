import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { Typography, TextField } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
  activityCard: {
    width: '18rem',
    margin: '5px',
    flexShrink: 0,
    overflowX: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
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
  activityCardInfo: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}))

const ActivityCard = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const { category, title, details, likes, img, price } = props.activity

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      classes={{
        root: classes.activityCard
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={category}
        align='left'
      />
      <CardMedia className={classes.media} image={img} title={title} />
      <CardContent
        classes={{
          root: classes.activityCardInfo
        }}
      >
        <Typography variant='body2' color='textSecondary' component='p'>
          Likes: {likes}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
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
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {details}
          </Typography>
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
                style={{ margin: '.3rem 0 0 0', width: '98%' }}
              />
            </form>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ActivityCard
