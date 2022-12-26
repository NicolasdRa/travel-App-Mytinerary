import { Link } from 'react-router-dom'

import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import { StyledContainer } from './styles'
import { theme } from '../../Styles/Theme'
import { useAppSelector } from '../../Redux/hooks'
import { selectAuthenticated } from '../../Redux/authSlice'

export const HeroSection = () => {
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const isAuthenticated = useAppSelector(selectAuthenticated)

  return (
    <StyledContainer>
      <Grid item container direction="column" spacing={0} className="container">
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
              color="primary"
              component={Link}
              to="/listing"
            >
              {isAuthenticated ? 'Start' : 'Start as Guest'}
            </Button>
          </div>

          {!isAuthenticated && (
            <Box
              sx={{ display: { xs: 'block', md: 'none' } }}
              className="login-btns-container"
            >
              <Typography variant="subtitle1" className="question">
                Want to build your own MYtinerary?
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/login"
                className="modal-btn"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
                className="modal-btn"
              >
                Signup
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </StyledContainer>
  )
}
