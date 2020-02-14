import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './Links.css'

const Links = () => {
  return (
    <div className='linkContainer'>
      <Button color='primary' component={Link} to='/login'>
        Log in
      </Button>
      <br />
      <Button color='primary' component={Link} to='/signup'>
        Create Account
      </Button>
    </div>
  )
}

export default Links
