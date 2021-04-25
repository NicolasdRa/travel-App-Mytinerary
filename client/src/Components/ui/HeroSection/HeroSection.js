import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Grid, Hidden, Typography } from '@material-ui/core'

import { Header } from '../../ui/Header/Header'

import { useStyles } from './styles'
// import { useTheme } from '@material-ui/core/styles'

export const HeroSection = () => {
  // const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Box container className={classes.main}>
      <Header className={classes.topNav} />
      <Grid
        item
        container
        spacing={3}
        xs={12}
        direction="column"
        className={classes.content}
      >
        <Grid item xs={12} direction="column">
          <Typography variant="h1" className={classes.title}>
            Find the perfect tour
          </Typography>
          <Typography variant="subtitle1" className={classes.subTitle}>
            designed by insiders who know and love their cities
          </Typography>
        </Grid>
        <Grid item xs={12} direction="column" className={classes.btnsContainer}>
          <Box className={classes.startBtnContainer}>
            <Button
              className={classes.startBtn}
              variant="contained"
              color="secondary"
              component={Link}
              to="/listing"
            >
              {isAuthenticated ? 'Start' : 'Start as Guest'}
            </Button>
          </Box>

          {!isAuthenticated && (
            <Hidden mdUp>
              <Box className={classes.loginBtnsContainer}>
                <Typography variant="subtitle1" className={classes.question}>
                  Want to build your own MYtinerary?
                </Typography>

                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  className={classes.modal_btn}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/signup"
                  className={classes.modal_btn}
                >
                  Signup
                </Button>
              </Box>
            </Hidden>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
