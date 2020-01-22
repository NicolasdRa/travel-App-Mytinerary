import React, { Component } from 'react'
import 'typeface-roboto'
import { Typography, Button, TextField, Container } from '@material-ui/core'
import './Signup.css'

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
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
      <Container className='signup_form'>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='h4' align='center'>
            Sign up
          </Typography>
          <div className='signup_input_field'>
            <TextField
              required
              id='firstName'
              label='firstName'
              variant='outlined'
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_input_field'>
            <TextField
              required
              id='lastName'
              label='lastName'
              variant='outlined'
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_input_field'>
            <TextField
              required
              id='email'
              label='email'
              variant='outlined'
              onChange={this.handleChange}
            />
          </div>
          <div className='signup_input_field'>
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
          <div className='signup_form_buttons'>
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

export default Signup
