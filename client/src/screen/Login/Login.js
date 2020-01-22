import React, { Component } from 'react'
import 'typeface-roboto'
import { Typography, Button, TextField, Container } from '@material-ui/core'
import './Login.css'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    console.log(this.state)
  }

  render () {
    return (
      <Container className='login_form'>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='h4' align='center'>
            Log in
          </Typography>
          <div className='input_field'>
            <TextField
              required
              id='email'
              label='email'
              variant='outlined'
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
            <Button type='reset' variant='contained'>
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
        </form>
      </Container>
    )
  }
}

export default Login
