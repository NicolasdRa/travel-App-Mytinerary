import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core'
import GoogleSVGIcon from '../Icons/GoogleSVGIcon'
import { loginUser } from '../../store/actions/authActions'
import { clearErrors } from '../../store/actions/errorActions'
import { withStyles } from '@material-ui/core/styles'
import uuid from 'react-uuid'
import { Alert } from 'reactstrap'
// import Slide from '@material-ui/core/Slide'

// const Transition = React.forwardRef(function Transition (props, ref) {
//   return <Slide direction='up' ref={ref} {...props} />
// })

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

class Login extends Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    email: '',
    password: '',
    img: '',
    isAuthenticated: false,
    msg: null
  }

  componentDidUpdate (prevProps) {
    const { errors } = this.props
    if (errors !== prevProps.errors)
      if (errors.id === 'LOGIN_FAIL') {
        // Check for login Errors
        this.setState({ msg: errors.msg.msg })
      } else {
        this.setState({ msg: null })
      }
  }

  handleChange = e => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleSubmit = e => {
    clearErrors()
    this.handleClose()
    e.preventDefault()

    const { email, password } = this.state

    const user = {
      email,
      password
    }
    this.props.loginUser(user)
  }

  clearState = e => {
    e.preventDefault()
    this.setState({
      [e.target.id]: ''
    })
  }

  handleToggle = () => {
    this.setState({
      open: !this.setState.open
    })
  }

  render () {
    const { classes } = this.props
    const errors = this.state.msg
    const { open } = this.state

    const handleClickOpen = () => {
      this.setState({
        open: true
      })
    }

    return (
      <div>
        <Button color='secondary' onClick={handleClickOpen}>
          LOGIN
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
              <Typography variant='body2'>Easy Login</Typography>
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
                Log in with Google
              </Button>
              <DialogTitle
                id='form-dialog-title'
                disableTypography
                className={classes.subtitle}
              >
                <Typography variant='body2'>
                  Login with email & password
                </Typography>
              </DialogTitle>

              {errors
                ? errors.map(error => (
                    <Box key={uuid()}>
                      <Alert
                        color='danger'
                        style={{ color: 'red', margin: '1.5rem' }}
                      >
                        {error.msg}
                      </Alert>
                    </Box>
                  ))
                : null}

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
              <TextField
                required
                autoFocus
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
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))
