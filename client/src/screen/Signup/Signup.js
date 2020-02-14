import React, { Component } from 'react'
import 'typeface-roboto'
import { Typography, Button, TextField, Container } from '@material-ui/core'
import './Signup.css'
import { connect } from 'react-redux'
import { signupUser } from '../../store/actions/authActions'
import { clearErrors } from '../../store/actions/errorActions'
import { Alert } from 'reactstrap'
import uuid from 'react-uuid'

class Signup extends Component {
  state = {
    userName: '',
    email: '',
    img: '',
    password: '',
    isAuthenticated: '',
    msg: null
  }

  componentDidUpdate (prevProps) {
    const { errors } = this.props
    if (errors !== prevProps.errors)
      if (errors.id === 'SIGNUP_FAIL') {
        // Check for signUp Errors
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

  handleSubmit = e => {
    clearErrors()
    e.preventDefault()

    const { userName, email, img, password } = this.state

    const newUser = {
      userName,
      email,
      img,
      password
    }

    this.props.signupUser(newUser)
  }

  clearState = e => {
    e.preventDefault()
  }

  render () {
    const errors = this.state.msg

    return (
      <Container className='signup_form'>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='h4' align='center'>
            Sign up
          </Typography>
          {errors
            ? errors.map(error => (
                <div key={uuid()}>
                  <Alert
                    color='danger'
                    style={{ color: 'red', margin: '1.5rem' }}
                  >
                    {error.msg}
                  </Alert>
                </div>
              ))
            : null}
          <div className='signup_input_field'>
            <TextField
              required
              id='userName'
              label='User Name'
              variant='outlined'
              autoComplete='current-userName'
              autoFocus
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_input_field'>
            <TextField
              required
              id='email'
              label='email'
              variant='outlined'
              autoComplete='current-email'
              autoFocus
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_input_field'>
            <TextField
              required
              id='img'
              label='insert image URL'
              variant='outlined'
              autoFocus
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_input_field'>
            <TextField
              required
              minLength='6'
              id='password'
              type='password'
              label='Password'
              variant='outlined'
              autoComplete='current-password'
              autoFocus
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_form_buttons'>
            <Button onClick={this.clearState} type='reset' variant='contained'>
              Clear
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
          </div>
          <div className='google_button'>
            <Button
              variant='contained'
              color='secondary'
              href='http://localhost:5000/api/auth/google'
            >
              Sign up with Google
            </Button>
          </div>
        </form>
      </Container>
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
    signupUser: user => dispatch(signupUser(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
