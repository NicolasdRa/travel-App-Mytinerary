import { Link } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import { useAppSelector } from '../../../redux/hooks'
import { selectIsAuthenticated } from '../../../features/auth'

import { StyledContainer, StyledHero } from './styles'
import { useHeroBreakpoints } from '../../../utils/breakpoints'

export const HeroLanding = () => {
  const { useOutlinedButton, showLoginButtons } = useHeroBreakpoints()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <StyledContainer>
      <StyledHero>
        <div className="text-container">
          <Typography variant="h1" className="title">
            Find the perfect tour
          </Typography>
          <Typography variant="subtitle1" className="subtitle">
            designed by insiders who know and love their cities
          </Typography>
        </div>
        <div className="btns-container">
          <div className="start-btn-container">
            <Button
              className="start-btn"
              variant={useOutlinedButton ? 'outlined' : 'contained'}
              color="primary"
              component={Link}
              to="/listing"
            >
              {isAuthenticated ? 'Start' : 'Start as Guest'}
            </Button>
          </div>

          {!isAuthenticated && showLoginButtons && (
            <Box
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
        </div>
      </StyledHero>
    </StyledContainer>
  )
}
