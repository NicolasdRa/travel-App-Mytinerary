import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core'
import GoogleSVGIcon from '../Icons/GoogleSVGIcon'
import { signupUser } from '../../Redux/auth/authActions'
import { clearErrors } from '../../Redux/error/errorActions'
import {
  openSignupForm,
  closeSignupForm
} from '../../Redux/signupForm/signupFormActions'
import { withStyles } from '@material-ui/core/styles'
import uuid from 'react-uuid'
import { Alert, AlertTitle } from '@material-ui/lab'

const styles = theme => ({
  title: {
    margin: '1.5rem 0 0 0',
    padding: 0,
    textAlign: 'center'
  },

  subtitle: {
    margin: '2.5rem 0 0 0 ',
    padding: 0,
    textAlign: 'center'
  },

  input_field: {
    margin: '.8rem 0'
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center'
  },

  google_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem'
  },

  btns: {
    paddingLeft: '1rem'
  }
})

class Signup extends Component {
  state = {
    fullWidth: true,
    maxWidth: 'sm',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    img: '',
    isAuthenticated: false,
    msg: null
  }

  componentDidUpdate (prevProps) {
    const { errors } = this.props
    if (errors !== prevProps.errors)
      if (errors.id === 'SIGNUP_FAIL') {
        // Check for signup Errors
        this.setState({ msg: errors.msg.msg })
      } else {
        this.setState({ msg: null })
      }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleClose = () => {
    this.props.closeSignupForm()
  }

  handleSubmit = e => {
    clearErrors()
    this.handleClose()
    e.preventDefault()

    const { userName, email, password } = this.state

    const newUser = {
      userName,
      email,
      password
    }

    this.props.signupUser(newUser)
  }

  clearState = e => {
    e.preventDefault()
    this.setState({
      [e.target.id]: ''
    })
  }

  render () {
    const { classes } = this.props
    const errors = this.state.msg
    const open = this.props.setOpen

    const handleClickOpen = () => {
      this.props.openSignupForm()
    }

    return (
      <div>
        <Button color='secondary' onClick={handleClickOpen}>
          Signup
        </Button>
        <Dialog
          //   TransitionComponent={Transition}
          //   keepMounted
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
              <Typography variant='body2'>Easy Signup</Typography>
            </DialogTitle>
            <DialogContent>
              <Button
                className={classes.google_button}
                variant='outlined'
                //   color='secondary'
                // component={Link}
                // to='api/auth/google'
                href='http://localhost:5000/api/users/google'
                startIcon={<GoogleSVGIcon />}
              >
                Sign up with Google
              </Button>

              <DialogTitle
                id='form-dialog-title'
                disableTypography
                className={classes.subtitle}
              >
                <Typography variant='body2'>Sign up with your info</Typography>
              </DialogTitle>

              {errors
                ? errors.map(error => (
                    <Box key={uuid()}>
                      <Alert
                        severity='error'
                        style={{ color: 'red', margin: '1.5rem' }}
                      >
                        <AlertTitle>Error</AlertTitle>
                        {error.msg} — <strong>check it out!</strong>
                      </Alert>
                    </Box>
                  ))
                : null}

              <TextField
                required
                autoFocus
                margin='dense'
                id='userName'
                label='User Name'
                type='userName'
                autoComplete='current-firstName'
                onChange={this.handleChange}
                fullWidth
                className={classes.input_field}
              />
              <TextField
                required
                autoFocus
                margin='dense'
                id='email'
                label='Email Address'
                type='email'
                autoComplete='current-email'
                onChange={this.handleChange}
                fullWidth
                className={classes.input_field}
              />
              <TextField
                required
                autoFocus
                minLength='6'
                margin='dense'
                id='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                onChange={this.handleChange}
                fullWidth
                className={classes.input_field}
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
    user: state.user,
    authError: state.auth.error,
    isAuthenticated: state.isAuthenticated,
    errors: state.errors,
    setOpen: state.signupForm.setOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupUser: user => dispatch(signupUser(user)),
    clearErrors: () => dispatch(clearErrors()),
    openSignupForm: () => dispatch(openSignupForm()),
    closeSignupForm: () => dispatch(closeSignupForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signup))
