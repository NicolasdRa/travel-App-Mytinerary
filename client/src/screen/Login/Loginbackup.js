import React, { Component } from 'react'
import 'typeface-roboto'
import { Typography, Button, TextField, Container } from '@material-ui/core'
import './Login.css'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../store/actions/authActions'

class Login extends Component {
  state = {
    email: '',
    password: '',
    img: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    this.props.loginUser(this.state)
  }

  clearState = e => {
    e.preventDefault()
    this.setState({
      [e.target.id]: ''
    })
    console.log(this.state)
  }

  render () {
    return (
      <Container className='login_form'>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='h4' align='center'>
            Log in
          </Typography>
          <div className={classes.root}>
            <Button variant='outlined' onClick={handleClick}>
              Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='success'>
                This is a success message!
              </Alert>
            </Snackbar>
            <Alert severity='error'>This is an error message!</Alert>
            <Alert severity='warning'>This is a warning message!</Alert>
            <Alert severity='info'>This is an information message!</Alert>
            <Alert severity='success'>This is a success message!</Alert>
          </div>
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
              // to='auth/google'
              href='http://localhost:5000/auth/google'
            >
              Log in with Google
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
    authError: state.auth.autherror
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
