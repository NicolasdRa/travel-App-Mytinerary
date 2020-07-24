import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flex: '0 0 auto',
    maxwidth: '8rem',
    margin: '.3rem',
    minWidth: '8rem',
    maxWidth: '8rem',
    // padding: '0.6rem',
    padding: '0'
  },

  media: {
    height: '6rem',
    objectFit: 'cover',
    minWidth: '4rem',
    // maxWidth: '100%',
    borderRadius: 3
    // boxShadow: '0 2px 6px 0 #c1c9d7, 0 -2px 6px 0 #cce1e9',
    // rounded centered image
    // paddingTop: '65%',
    // borderRadius: '50%',
    // margin: '1.5rem 1.5rem 0 1.5rem'
  },

  card_underlineNone: {
    textDecoration: 'none'
  },

  card_title: {
    padding: '0 .15rem',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 400
  }
})

export default function ActivityCardSmall (props) {
  const classes = useStyles()
  const { title, img } = props.activity

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={title} />
        <CardContent
          component={Link}
          to={'/activitypage/' + title}
          className={classes.card_underlineNone}
        >
          <Typography
            className={classes.card_title}
            gutterBottom
            variant='subtitle2'
            component='h6'
            textcolor='primary'
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
