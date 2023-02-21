import { useState } from 'react'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'

import { Collapse, Divider, IconButton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import CreateCommentForm from '../../forms/CreateCommentForm/CreateCommentForm'
import { CommentCard } from '../CommentCard/CommentCard'
import { StyledContainer } from './styles'

interface PageReviewsCardProps {
  comments: any[]
  currentUser: any
  itemId: string
}

export const PageReviewsCard: React.FC<PageReviewsCardProps> = ({
  comments,
  currentUser,
  itemId,
}) => {
  const [expanded, setExpanded] = useState(false)

  // handles expand reviews
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <StyledContainer>
      <div className="card-header">
        <div className="view-reviews">
          <Typography variant="body2" className="review-text">
            View all Reviews ({comments.length})
          </Typography>
          <IconButton
            style={{ padding: 0, marginRight: 'auto' }}
            className={clsx('expand', {
              ['expand-open']: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        {currentUser && (
          <CreateCommentForm
            userId={currentUser._id}
            userName={currentUser.userName}
            userImg={currentUser.img}
            sourceId={itemId}
            sourceType="item"
          />
        )}
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {comments.map((comment) => (
          <CommentCard key={uuidv4()} comment={comment} />
        ))}
      </Collapse>
      <Divider className="divider" />
    </StyledContainer>
  )
}
