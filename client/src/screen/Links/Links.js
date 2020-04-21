import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import './Links.css'

const useStyles = makeStyles(theme => ({
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '0.5rem 5rem'
  }
}))

const Links = () => {
  const classes = useStyles()

  return (
    <div className={classes.linkContainer}>
      <Button component={Link} to='/signup' color='secondary'>
        SIGNUP
      </Button>
      {/* <br /> */}
      <Button color='secondary' component={Link} to='/login'>
        LOGIN
      </Button>
    </div>
  )
}

export default Links
