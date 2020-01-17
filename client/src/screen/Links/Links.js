import React from 'react'
import { MemoryRouter as Router } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './Links.css'
// import Signup from './../Signup/Signup'
// import Login from './../Login/Login'

// const LinkBehavior = React.forwardRef((props, ref) => (
//     <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
//   ));

const Links = () => {
  return (
    <Router>
      <div className='linkContainer'>
        <Button color='primary' component={Link} to='/login'>
          Log in
        </Button>
        <br />
        <Button color='primary' component={Link} to='/signup'>
          Create Account
        </Button>
      </div>
    </Router>
  )
}

export default Links
