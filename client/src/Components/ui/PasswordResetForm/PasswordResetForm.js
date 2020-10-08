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
import { openLoginForm } from '../../Redux/loginForm/loginFormActions'
import { resetPassword } from '../../Redux/auth/authActions'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  title: {
    margin: '1rem 1rem 0 1rem',
    textAlign: 'center'
  },

  subtitle: {
    margin: '0 1.5rem',
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

class PasswordResetForm extends Component {
  state = {
    fullWidth: true,
    maxWidth: 'sm',
    password: '',
    passwordConfirm: '',
    isAuthenticated: false,
    msg: null,
    setOpen: true,
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

    const { password, passwordConfirm } = this.state

    const data = {
      resetToken: this.props.match.params.resetToken,
      password,
      passwordConfirm
    }
    this.props.resetPassword(data)
    this.setState({ openSnackBar: true })
    setTimeout(() => {
      this.handleClose()
      this.setState({ openSnackBar: false })
      this.props.openLoginForm()
      this.props.history.push(`/`)
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

    return (
      <div>
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
              <Typography variant='h6'>Reset your password</Typography>
            </DialogTitle>
            <DialogTitle
              id='form-dialog-subtitle'
              disableTypography
              className={classes.subtitle}
            >
              <Typography variant='body2'>
                Enter a new password, confirm and submit. You will be logged in
                shortly afterwards.
              </Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                required
                autoFocus
                margin='dense'
                id='password'
                label='New Password'
                type='password'
                autoComplete='current-password'
                onChange={this.handleChange}
                fullWidth
                className={classes.input_field}
              />
              <TextField
                required
                autoFocus
                minLength='6'
                margin='dense'
                id='passwordConfirm'
                label='Confirm New Password'
                type='password'
                autoComplete='current-password-confirm'
                onChange={this.handleChange}
                fullWidth
                className={classes.input_field}
              />
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                open={this.state.openSnackBar}
                autoHideDuration={4000}
                onClose={this.handleCloseSnackBar}
                message='Your password has been reset, you will be logged in'
              />
              <Typography variant='body2' className={classes.text}>
                By proceeding you agree to Mytinerary’s Privacy Policy, User
                Agreement and T&Cs.
              </Typography>
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
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: data => dispatch(resetPassword(data)),
    openLoginForm: () => dispatch(openLoginForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PasswordResetForm))
