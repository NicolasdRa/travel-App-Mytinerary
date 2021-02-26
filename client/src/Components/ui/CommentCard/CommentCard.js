import React from 'react'
import moment from 'moment'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  CardHeader,
  Typography,
} from '@material-ui/core'

import Rating from '@material-ui/lab/Rating'

import { useStyles } from './styles'

export const CommentCard = ({ comment }) => {
  const classes = useStyles()

  const {
    rating,
    summary,
    description,
    author: { userName: authorName },
    author: { img: authorImg },
    createdAt,
  } = comment

  const date = moment(createdAt).startOf('day').fromNow()

  return (
    <Card raised={false} className={classes.card}>
      <CardContent className={classes.userInfo}>
        <Avatar
          aria-label="recipe"
          alt={authorName}
          src={authorImg}
          className={classes.avatar}
        />
        <Box className={classes.header}>
          <Typography
            className={classes.userName}
            color="primary"
            variant="body2"
          >
            {authorName}
          </Typography>
          <Box className={classes.ratingContainer}>
            <Rating
              name="read-only"
              value={rating}
              precision={0.5}
              size="small"
              readOnly
              className={classes.rating}
            />
            <Typography
              className={classes.number}
              color="primary"
              variant="caption"
            >
              ({rating})
            </Typography>
            <Typography variant="caption" className={classes.date}>
              {date}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent className={classes.content}>
        <Typography className={classes.summary} variant="body2" color="primary">
          {summary}
        </Typography>

        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
      </CardContent>
      {/* <Divider /> */}
    </Card>
  )
}
