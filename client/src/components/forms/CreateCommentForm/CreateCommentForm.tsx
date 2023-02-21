import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
  Rating,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

import { StyledContainer, StyledDialog } from './styles'
import { useForm } from '../../../hooks/useForm'

import { addComment } from '../../../redux/commentsSlice'
import { updateItineraryComments } from '../../../redux/itinerariesSlice'
import { useAppDispatch } from '../../../redux/hooks'

interface CreateCommentFormProps {
  userId: string
  userName: string
  userImg: string
  sourceId: string
  sourceType: string
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  userId,
  userName,
  userImg,
  sourceId,
  sourceType,
}) => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const { values: formValues, handleInputChange } = useForm({
    rating: '',
    summary: '',
    description: '',
    author: userId,
    userName: userName,
    userImg: userImg,
    sourceId: sourceId,
    sourceType: sourceType,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    dispatch(addComment(formValues))
    dispatch(updateItineraryComments(formValues))

    setOpenSnackBar(true)
    setTimeout(() => {
      setOpenSnackBar(false)
      handleClose()
    }, 2500)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseSnackBar = (e: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <StyledContainer>
      <Button className="btn" color="secondary" onClick={handleClickOpen}>
        Post Review
        <CreateIcon color="secondary" className="createIcon" />
      </Button>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <DialogTitle id="form-dialog-title" className="title">
            Share your experience
          </DialogTitle>
          <Typography variant="body1" color="inherit" className="subtitle">
            Help the community with your review
          </Typography>
          <DialogContent>
            <div className="ratingContainer">
              <Typography variant="body2" className="ratingLabel">
                Rate your experience
              </Typography>
              <Rating
                size="large"
                precision={0.5}
                defaultValue={2}
                name="rating"
                onChange={handleInputChange}
                className="rating"
              />
            </div>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="summary"
              label="summary"
              type="text"
              autoComplete="current-summary"
              onChange={handleInputChange}
              className="input_field"
            />
            <TextField
              required
              autoFocus
              fullWidth
              multiline
              rows={3}
              margin="dense"
              name="description"
              label="full review"
              type="text"
              autoComplete="current-description"
              onChange={handleInputChange}
              className="input_field"
            />
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={openSnackBar}
              autoHideDuration={4000}
              onClose={handleCloseSnackBar}
              message="Your comment has been submitted, thanks!!."
            />
          </DialogContent>
          <DialogActions className="btns">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </StyledContainer>
  )
}

export default CreateCommentForm
