import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Button, Grid, Hidden, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import { Header } from '../Header/Header'
import { Container } from './styles'
import { theme } from '../../Styles/Theme'

export const HeroSection = () => {
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Container className="main">
      <Header />
      <Grid
        item
        container
        direction="column"
        spacing={3}
        xs={12}
        className="content"
      >
        <Grid item xs={12}>
          <Typography variant="h1" className="title">
            Find the perfect tour
          </Typography>
          <Typography variant="subtitle1" className="subtitle">
            designed by insiders who know and love their cities
          </Typography>
        </Grid>
        <Grid item xs={12} className="btns-container">
          <div className="start-btn-container">
            <Button
              className="start-btn"
              variant={matches ? 'outlined' : 'contained'}
              color="secondary"
              component={Link}
              to="/listing"
            >
              {isAuthenticated ? 'Start' : 'Start as Guest'}
            </Button>
          </div>

          {!isAuthenticated && (
            <Hidden mdUp>
              <div className="login-btns-container">
                <Typography variant="subtitle1" className="question">
                  Want to build your own MYtinerary?
                </Typography>

                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  className="modal-btn"
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/signup"
                  className="modal-btn"
                >
                  Signup
                </Button>
              </div>
            </Hidden>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}