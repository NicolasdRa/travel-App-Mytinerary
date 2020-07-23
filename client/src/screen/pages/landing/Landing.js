import React from 'react'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../Headers/Header'
import { Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { openLoginForm } from '../../../Components/Redux/loginForm/loginFormActions'
import { openSignupForm } from '../../../Components/Redux/signupForm/signupFormActions'
import { loadUser } from '../../../Components/Redux/auth/authActions'
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

  question: {
    margin: '1rem 0 1.5rem 0',
    [theme.breakpoints.up('sm')]: {
      margin: '1rem 0 0 0',
      fontSize: '1.5rem'
    },

    [theme.breakpoints.up('lg')]: {
      margin: '2rem 0',
      fontSize: '2rem'
    }
  },

  btnsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4rem',

    [theme.breakpoints.up('sm')]: {
      margin: '1rem 5rem 4rem 5rem'
    },

    [theme.breakpoints.up('lg')]: {
      margin: '1rem 5rem 4rem 5rem'
    }
  },

  modal_btn: {
    margin: '0 .5rem',
    height: '3rem',
    width: '6rem',
    [theme.breakpoints.up('sm')]: {
      margin: '0 1.5rem',
      width: '8rem',
      height: '3rem',
      fontSize: '1.1rem'
    },

    [theme.breakpoints.up('lg')]: {
      margin: '0 1.5rem',
      width: '8rem',
      height: '3.5rem',
      fontSize: '1.2rem'
    }
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
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Typography variant='subtitle1' className={classes.question}>
          Want to build your own MYtinerary?
        </Typography>
        <Box className={classes.btnsContainer}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => dispatch(openLoginForm())}
            className={classes.modal_btn}
          >
            Login
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => dispatch(openSignupForm())}
            className={classes.modal_btn}
          >
            Signup
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Landing
