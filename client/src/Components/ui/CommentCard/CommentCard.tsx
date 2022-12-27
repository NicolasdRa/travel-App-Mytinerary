import moment from 'moment'
import { Avatar, Typography, Rating } from '@mui/material'
import { StyledCard, StyledCardContent } from './styles'
import { Comment } from '../../../@types/types'

interface CommentCardProps {
  comment: Comment
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
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

  const date = moment(createdAt).startOf('day').fromNow()

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
          <Typography className="userName" color="primary" variant="body2">
            {authorName ? authorName : userName}
          </Typography>
          <div className="ratingContainer">
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
      <StyledCardContent className="content">
        <Typography className="summary" variant="body2" color="primary">
          {summary}
        </Typography>

        <Typography variant="body2" className="description">
          {description}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  )
}
