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
    width: '100%'
  },

  container: {
    backgroundImage:
      'radial-gradient(circle, rgba(255, 255, 255, .7) 0%, rgba(255, 255, 255, 1) 60%), url(' +
      Image +
      ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh',
    margin: '0',
    padding: '0',

    [theme.breakpoints.up('lg')]: {
      height: '96vh'
    }
  },

  startBtn: {
    margin: '3rem 0',
    width: '12rem',
    height: '3rem',

    [theme.breakpoints.up('sm')]: {
      margin: '4rem 0 3rem 0',
      width: '15rem',
      height: '3.5rem',
      fontSize: '1.1rem'
    },

    [theme.breakpoints.up('lg')]: {
      margin: '5rem 0 4rem 0',
      width: '18rem',
      height: '4rem',
      fontSize: '1.2rem'
    }
  },

  legend: {
    margin: '.5rem 0',
    [theme.breakpoints.up('sm')]: {
      margin: '1rem 0 0 0',
      fontSize: '1.5rem'
    },

    [theme.breakpoints.up('lg')]: {
      margin: '2rem 0',
      fontSize: '2rem'
    }
  },

  link_btns: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5rem 5rem 3rem 5rem',

    [theme.breakpoints.up('sm')]: {
      margin: '1rem 5rem 3rem 5rem'
    },

    [theme.breakpoints.up('lg')]: {
      margin: '1rem 5rem 3rem 5rem'
    }
  },

  modal_btn: {
    margin: '0 5rem',
    height: '3rem'
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

  // const openSignUpModal = () => {
  //   // use selector to select piece of state
  //   //dispatch action to set modal state to open
  // }

  return (
    <Grid
      container
      item
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      <Grid item className={classes.header}>
        <Header />
      </Grid>
      <Grid item>
        <Button
          className={classes.startBtn}
          variant='contained'
          color='secondary'
          component={Link}
          to='/listing'
        >
          Start as guest
        </Button>
      </Grid>
      <Grid
        item
        direction='column'
        justify='center'
        alignItems='center'
        className={classes.linksBlock}
      >
        <Typography variant='subtitle1' className={classes.legend}>
          Want to build your own MYtinerary?
        </Typography>
        <Box className={classes.link_btns}>
          {/* <Button
            variant='outlined'
            color='primary'
            onClick={openSignUpModal}
            className={classes.modal_btn}
          >
            Test
          </Button> */}
          <Signup className={classes.btn} />
          <Login className={classes.btn} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Landing
