import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { forgotPassword } from '../../Redux/auth/authActions'
import { clearErrors } from '../../Redux/error/errorActions'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    fontStyle: 'lowercase'
  },

  btn: {
    textTransform: 'none'
  },

  title: {
    margin: '1rem 0 0 0',
    padding: 0,
    textAlign: 'center'
  },

  subtitle: {
    margin: '1.5rem 1.5rem 0 1.5rem',
    padding: 0,
    textAlign: 'left'
  },

  input_field: {
    margin: '.8rem 0'
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center'
  },

  btns: {
    paddingLeft: '1rem'
  }
})

class ForgotPasswordForm extends Component {
  state = {
    fullWidth: true,
    maxWidth: 'sm',
    email: '',
    isAuthenticated: false,
    msg: null,
    setOpen: false,
    openSnackBar: false
  }

  handleChange = e => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  handleClose = () => {
    this.setState({ setOpen: false })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { email } = this.state
    const data = { email }

    this.props.forgotPassword(data)
    this.setState({ openSnackBar: true })
    setTimeout(() => {
      this.handleClose()
      this.setState({ openSnackBar: false })
    }, 3000)
  }

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ openSnackBar: false })
  }

  clearState = e => {
    e.preventDefault()
    this.setState({
      [e.target.id]: ''
    })
  }

  render () {
    const { classes } = this.props
    const open = this.state.setOpen

    const handleClickOpen = () => {
      this.setState({ setOpen: true })
    }

    return (
      <div className={classes.btnContainer}>
        <Button
          className={classes.btn}
          color='primary'
          onClick={handleClickOpen}
        >
          Forgot Password?
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle
              id='form-dialog-title'
              disableTypography
              className={classes.title}
            >
              <Typography variant='h6'>Forgot your Password?</Typography>
            </DialogTitle>
            <DialogTitle
              id='form-dialog-subtitle'
              disableTypography
              className={classes.subtitle}
            >
              <Typography variant='body2'>
                Enter your email address and submit. You will be sent an email
                to the address provided with a password reset link.
              </Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                required
                autoFocus
                fullWidth
                margin='dense'
                id='email'
                label='Email Address'
                type='email'
                autoComplete='current-email'
                onChange={this.handleChange}
                className={classes.input_field}
              />
              <Snackbar
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'center'
                }}
                open={this.state.openSnackBar}
                autoHideDuration={4000}
                onClose={this.handleCloseSnackBar}
                message='A message with a password reset link has been sent to your email account.'
              />
            </DialogContent>
            <DialogActions className={classes.btns}>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color='secondary'>
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.error,
    isAuthenticated: state.isAuthenticated,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: data => dispatch(forgotPassword(data)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ForgotPasswordForm))
