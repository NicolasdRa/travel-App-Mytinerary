import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { memo } from 'react'
import { Avatar, Typography, Rating } from '@mui/material'
import { StyledCard, StyledCardContent, StyledCardMessage } from './styles'
import { Comment } from '../../../@types/types'

interface CommentCardProps {
  comment: Comment
}

const CommentCardComponent: React.FC<CommentCardProps> = ({ comment }) => {
  const {
    rating,
    summary,
    description,
    userName,
    userImg,
    author: { userName: authorName },
    author: { img: authorImg },
    createdAt,
  } = comment

  dayjs.extend(relativeTime)
  const date = dayjs(createdAt).startOf('day').fromNow()

  return (
    <StyledCard raised={false}>
      <StyledCardContent>
        <Avatar
          aria-label="recipe"
          alt={authorName ? authorName : userName}
          src={authorImg ? authorImg : userImg}
          className="avatar"
        />
        <div className="header">
          <Typography className="username" color="primary" variant="body2">
            {authorName ? authorName : userName}
          </Typography>
          <div className="rating-container">
            <Rating
              name="read-only"
              value={rating}
              precision={0.5}
              size="small"
              readOnly
              className="rating"
            />
            <Typography className="number" color="primary" variant="caption">
              ({rating})
            </Typography>
            <Typography variant="caption" className="date">
              {date}
            </Typography>
          </div>
        </div>
      </StyledCardContent>
      <StyledCardMessage>
        <Typography className="summary" variant="body2" color="primary">
          {summary}
        </Typography>
        <Typography variant="body2" className="description">
          {description}
        </Typography>
      </StyledCardMessage>
    </StyledCard>
  )
}

export const CommentCard = memo(CommentCardComponent)
