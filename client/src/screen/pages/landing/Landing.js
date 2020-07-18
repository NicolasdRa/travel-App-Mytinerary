import React from 'react'
import { Box, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../Headers/Header'
import { Button, Typography } from '@material-ui/core'
import Signup from '../../Signup/Signup'
import Login from '../../Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../../store/actions/authActions'
import jwtDecode from 'jwt-decode'
import Grid from '@material-ui/core/Grid'
import Image from '../../../Images/Shanghai.png'

const useStyles = makeStyles(theme => ({
  root: {
    // width: '80%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage:
      'radial-gradient(circle, rgba(255, 255, 255, .7) 0%, rgba(255, 255, 255, 1) 60%), url(' +
      Image +
      ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    paddingBottom: '4rem'
  },

  header: {
    marginTop: '5rem'
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
  },

  link_btns: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0.5rem 5rem'
  }
}))

const Landing = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.token)

  // if (!token || !user) {
  //   const cookie = document.cookie
  //   // console.log('cookie', cookie)
  //   const token = cookie.split('=', 2)[1]
  //   // console.log('token', token)
  //   // console.log('decoded', jwtDecode(token))
  //   const id = jwtDecode(token)._id
  //   // console.log(id)
  //   dispatch(loadUser(token, id))
  // }

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
              {/* <Links /> */}
              <Box className={classes.link_btns}>
                <Signup />
                <Login />
              </Box>
            </Box>
            {/* <Divider className={classes.divider} /> */}
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Landing
