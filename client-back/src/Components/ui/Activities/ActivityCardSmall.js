import React from 'react'
import { makeStyles } from 'tss-react/mui'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flex: '0 0 auto',
    margin: '.3rem',
    minWidth: '8rem',
    maxWidth: '8rem',
    padding: '0',
  },

  media: {
    height: '6rem',
    objectFit: 'cover',
    minWidth: '4rem',
    borderRadius: 3,
  },

  card_underlineNone: {
    textDecoration: 'none',
  },

  card_title: {
    padding: '0 .15rem',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 400,
  },
})

const ActivityCardSmall = (props) => {
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
            variant="subtitle2"
            component="h6"
            textcolor="primary"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ActivityCardSmall
