import { useState } from 'react'

import {
  Box,
  Button,
  Link,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material'

import { resetPassword } from '../../../features/auth'
import { useForm } from '../../../hooks/useForm'
import { StyledPaper } from './styles'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'

interface PasswordResetFormProps {
  match: any
  history: any
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  match,
  history,
}) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  // must be outside handleSubmit
  const redirectPath = localStorage.getItem('lastPath')

  const [openSnackBar, setOpenSnackBar] = useState(false)

  const { values: formValues, handleInputChange } = useForm({
    password: '',
    passwordConfirm: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const data = { ...formValues, resetToken: match.params.resetToken }

    dispatch(resetPassword(data))
    setOpenSnackBar(true)
    setTimeout(() => {
      setOpenSnackBar(false)
      navigate('/')
    }, 3000)
  }

  const handleCloseSnackBar:
    | ((
        event: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
      ) => void)
    | undefined = (e, reason) => {
    reason === 'clickaway' && setOpenSnackBar(false)
  }

  return (
    <StyledPaper>
      <Box className="container">
        <Typography variant="h6" className="title">
          Reset your password
        </Typography>

        <Typography variant="body2" className="subtitle">
          Enter a new password, confirm and submit.
        </Typography>

        <Typography variant="body2" className="paragraph">
          You will be re-directed to the log in page shortly afterwards.
        </Typography>

        <form className="form">
          <TextField
            required
            autoFocus
            margin="dense"
            name="password"
            label="New Password"
            type="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            fullWidth
            className="input_field"
          />
          <TextField
            required
            autoFocus
            margin="dense"
            name="passwordConfirm"
            label="Confirm New Password"
            type="password"
            autoComplete="current-password-confirm"
            onChange={handleInputChange}
            fullWidth
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
            message="Your password has been reset, please log in with your new password"
          />
          <Typography variant="body2" className="text">
            By proceeding you agree to Mytinerary’s Privacy Policy, User
            Agreement and T&Cs.
          </Typography>

          <Link
            component="button"
            onClick={() => navigate(`${redirectPath}`)}
            color="inherit"
            className="btn"
          >
            Cancel
          </Link>

          <Button onClick={handleSubmit} color="secondary" className="btn">
            Submit
          </Button>
        </form>
      </Box>
    </StyledPaper>
  )
}
