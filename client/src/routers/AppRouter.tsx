import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AlertProps, Snackbar } from '@mui/material'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import { LandingPage } from '../components/pages/LandingPage/LandingPage'
import { CustomLoader } from '../components/ui/CustomLoader/CustomLoader'
import { LoginPage } from '../components/pages/LoginPage/LoginPage'
import { SignupPage } from '../components/pages/SignupPage/SignupPage'
import { ListingPage } from '../components/pages/ListingPage/ListingPage'
import { CityPage } from '../components/pages/CityPage/CityPage'
import { ItineraryPage } from '../components/pages/ItineraryPage/ItineraryPage'
import { ActivityPage } from '../components/pages/ActivityPage/ActivityPage'
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage'
import { PasswordResetPage } from '../components/pages/PasswordResetPage/PasswordResetPage'

import { fetchCities } from '../redux/citiesSlice'
import { fetchItineraries } from '../redux/itinerariesSlice'
import { fetchActivities } from '../redux/activitiesSlice'
import { fetchFavourites } from '../redux/favouritesSlice'
import { fetchCurrentUser, selectCurrentUser } from '../redux/usersSlice'
import { setUser } from '../redux/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { StyledGrid } from './styles'
import { getCookieValue } from '../utils/utils'

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isLoading, setisLoading] = useState(true)

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector(selectCurrentUser)

  useEffect(() => {
    const jwt = getCookieValue('jwt')

    if (jwt !== null || jwt !== 'loggedOut') {
      dispatch(setUser())
    }
  }, [isAuthenticated])

  useEffect(() => {
    // console.log('2st useEffect FETCH USER DATA', user)
    if (isAuthenticated) {
      dispatch(fetchCurrentUser())
    }
  }, [isAuthenticated])

  // fetches data from DB
  useEffect(() => {
    // console.log('3rd useEffect rendered: DATA', user)
    dispatch(fetchCities())
    dispatch(fetchItineraries())
    dispatch(fetchActivities())
    dispatch(fetchFavourites())
    setisLoading(false)
  }, [])

  // manages alerts
  const [alert, setAlert] = useState(false)
  const { error: authError } = useAppSelector((state) => state.auth)
  useEffect(() => {
    setAlert(true)
  }, [authError])

  // TODO redirect when itinerary name is not found in route

  if (isLoading) {
    return <CustomLoader loading={true} message="Profile Page" />
  }

  // Alert component
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />
  })

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setAlert(false)
  }

  return (
    <Router>
      <StyledGrid className="main">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/listing"
            element={
              <PublicRoute>
                <ListingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/citypage/:city_name"
            element={
              <PublicRoute>
                <CityPage />
              </PublicRoute>
            }
          />
          <Route
            path="/itinerarypage/:title"
            element={
              <PublicRoute>
                <ItineraryPage />
              </PublicRoute>
            }
          />
          <Route
            path="/activitypage/:title"
            element={
              <PublicRoute>
                <ActivityPage />
              </PublicRoute>
            }
          />
          <Route
            path="/user/:userName"
            element={
              <PrivateRoute>
                {user ? <ProfilePage user={user} /> : <Navigate to="/login" />}
              </PrivateRoute>
            }
          />
          <Route
            path="/resetPassword/:resetToken"
            element={
              <PublicRoute>
                <PasswordResetPage />
              </PublicRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>

        {authError && (
          <Snackbar
            open={alert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={4000}
            onClose={handleCloseAlert}
            message="test snackbar"
          >
            <Alert
              onClose={handleCloseAlert}
              severity="error"
              className="alert"
            >
              {authError}
            </Alert>
          </Snackbar>
        )}
      </StyledGrid>
    </Router>
  )
}
