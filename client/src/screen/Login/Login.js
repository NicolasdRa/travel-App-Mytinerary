import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import 'typeface-roboto'
import { Typography, Button, TextField, Container } from '@material-ui/core'
import { Alert } from 'reactstrap'
import './Login.css'
import uuid from 'react-uuid'
import { loginUser } from '../../store/actions/authActions'
import { clearErrors } from '../../store/actions/errorActions'

class Login extends Component {
  state = {
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
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    clearErrors()
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

  render () {
    const errors = this.state.msg

    return (
      <Container className='login_form'>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='h4' align='center'>
            Log in
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
          <div className='input_field'>
            <TextField
              required
              id='email'
              label='Email'
              variant='outlined'
              autoComplete='current-email'
              onChange={this.handleChange}
            />
          </div>
          <div className='input_field'>
            <TextField
              required
              minLength='6'
              id='password'
              type='password'
              label='Password'
              variant='outlined'
              autoComplete='current-password'
              onChange={this.handleChange}
            />
          </div>
          <div className='form_buttons'>
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
              // component={Link}
              // to='api/auth/google'
              href='http://localhost:5000/api/users/google'
            >
              Log in with Google
            </Button>
          </div>
          <div className='login_links'>
            <Link to='/signup'>"Don't have an account? Sign Up"</Link>
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
    loginUser: user => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
