import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxwidth: '8rem',
    margin: '.3rem',
    minWidth: '9rem',
    maxWidth: '9rem',
    padding: '0.6rem'
  },

  media: {
    height: '8rem',
    objectFit: 'cover',
    minWidth: '100%',
    maxWidth: '100%',
    borderRadius: 12,
    boxShadow: '0 2px 6px 0 #c1c9d7, 0 -2px 6px 0 #cce1e9'
  },

  card_title: {
    padding: '12px 8px 0 8px'
  }
})

export default function ActivityCardSmall (props) {
  const classes = useStyles()
  const { title, img } = props.activity

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={title} />
        <CardContent className={classes.card_title}>
          <Typography gutterBottom variant='subtitle2' component='h6'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
