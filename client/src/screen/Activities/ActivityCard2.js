import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { Typography, TextField, CardActionArea } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    maxWidth: '23rem'
  },
  media: {
    height: 'auto'
  }
})

const ActivityCard2 = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const { category, title, details, likes, img, price } = props.activity

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography paragraph>Details:</Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ActivityCard2
