import React, { useEffect, useState, Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AlertProps, Snackbar } from '@mui/material'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import { CustomLoader } from '../components/ui/CustomLoader/CustomLoader'

import { fetchCities } from '../redux/citiesSlice'
import { fetchItineraries } from '../redux/itinerariesSlice'
import { fetchActivities } from '../redux/activitiesSlice'
import { fetchFavourites } from '../redux/favouritesSlice'
import { fetchCurrentUser, selectCurrentUser } from '../redux/usersSlice'
import { setUser } from '../features/auth'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { StyledGrid } from './styles'
import { getCookieValue } from '../utils/utils'

// Lazy load page components for better performance
const LandingPage = lazy(() => import('../components/pages/LandingPage/LandingPage').then(module => ({ default: module.LandingPage })))
const LoginPage = lazy(() => import('../components/pages/LoginPage/LoginPage').then(module => ({ default: module.LoginPage })))
const SignupPage = lazy(() => import('../components/pages/SignupPage/SignupPage').then(module => ({ default: module.SignupPage })))
const ListingPage = lazy(() => import('../components/pages/ListingPage/ListingPage').then(module => ({ default: module.ListingPage })))
const CityPage = lazy(() => import('../components/pages/CityPage/CityPage').then(module => ({ default: module.CityPage })))
const ItineraryPage = lazy(() => import('../components/pages/ItineraryPage/ItineraryPage').then(module => ({ default: module.ItineraryPage })))
const ActivityPage = lazy(() => import('../components/pages/ActivityPage/ActivityPage').then(module => ({ default: module.ActivityPage })))
const ProfilePage = lazy(() => import('../components/pages/ProfilePage/ProfilePage').then(module => ({ default: module.ProfilePage })))
const PasswordResetPage = lazy(() => import('../components/pages/PasswordResetPage/PasswordResetPage').then(module => ({ default: module.PasswordResetPage })))

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isLoading, setisLoading] = useState(true)

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector(selectCurrentUser)

  useEffect(() => {
    const jwt = getCookieValue('jwt')

    if (jwt !== null && jwt !== 'loggedOut') {
      dispatch(setUser())
    }
  }, [dispatch])

  useEffect(() => {
    // Only fetch user data when authenticated and we don't have user data yet
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, isAuthenticated, user])

  // fetches data from DB
  useEffect(() => {
    // console.log('3rd useEffect rendered: DATA', user)
    dispatch(fetchCities())
    dispatch(fetchItineraries())
    dispatch(fetchActivities())
    dispatch(fetchFavourites())
    setisLoading(false)
  }, [dispatch])

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
        <Suspense fallback={<CustomLoader loading={true} message="Loading page..." />}>
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
        </Suspense>

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
