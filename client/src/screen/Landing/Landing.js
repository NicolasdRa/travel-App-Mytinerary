import React from 'react'
import 'typeface-roboto'
import './Landing.css'
import { Box, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../Header/Header'
import { Button, Typography } from '@material-ui/core'
import Links from '../Links/Links'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../store/actions/authActions'
import jwtDecode from 'jwt-decode'

const useStyles = makeStyles(theme => ({
  root: {
    // width: '80%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  header: {
    marginTop: '5.5rem'
  },

  startBtn: {
    padding: '.7rem 4rem',
    margin: '3rem 1rem 1rem 1rem'
  },

  legend: {
    fontSize: '.9rem'
  },

  links: {
    marginTop: '3.5rem'
  }
}))

const Landing = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.token)

  if (!token || !user) {
    const cookie = document.cookie
    // console.log('cookie', cookie)
    const token = cookie.split('=', 2)[1]
    // console.log('token', token)
    // console.log('decoded', jwtDecode(token))
    const id = jwtDecode(token)._id
    // console.log(id)
    dispatch(loadUser(token, id))
  }

  return (
    <Box className='container'>
      <Container className={classes.header}>
        <Header />
        <Button
          variant='contained'
          color='secondary'
          className={classes.startBtn}
          component={Link}
          to='/listing'
        >
          Start as guest
        </Button>
        {/* <Divider className={classes.divider} /> */}
        <Box className={classes.links}>
          <Typography variant='subtitle1' className={classes.legend}>
            Want to build your own MYtinerary?
          </Typography>
          <Links />
        </Box>
        {/* <Divider className={classes.divider} /> */}
      </Container>
    </Box>
  )
}

export default Landing
