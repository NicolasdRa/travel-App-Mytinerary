import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import PuffLoader from 'react-spinners/PuffLoader'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { LandingPage } from '../Components/pages/LandingPage/LandingPage'
import { LoginPage } from '../Components/pages/LoginPage/LoginPage'
import { SignupPage } from '../Components/pages/SignupPage/SignupPage'
import { ProfilePage } from '../Components/pages/ProfilePage/ProfilePage'
import ListingPage from '../Components/pages/ListingPage/ListingPage'
import CityPage from '../Components/pages/CityPage/CityPage'
import ItineraryPage from '../Components/pages/ItineraryPage/ItineraryPage'
import ActivityPage from '../Components/pages/ActivityPage/ActivityPage'
import { PasswordResetPage } from '../Components/pages/PasswordResetPage/PasswordResetPage'

import { Snackbar, Typography } from '@mui/material'

import { fetchCities } from '../Components/Redux/citiesSlice'
import { fetchItineraries } from '../Components/Redux/itinerariesSlice'
import { fetchActivities } from '../Components/Redux/activitiesSlice'
import { fetchFavourites } from '../Components/Redux/favouritesSlice'
import { loadCurrentUser } from '../Components/Redux/usersSlice'
import { isLoggedIn } from '../Components/Redux/authSlice'

import { StyledGrid } from './styles'
import { RootState } from '../Components/Redux/store'
import { useAppDispatch } from '../Components/Redux/hooks'

export const AppRouter = () => {
  const dispatch = useAppDispatch()

  const [isLoading, setisLoading] = useState(true)

  // manages alerts
  const [alert, setAlert] = useState(false)

  const { error: authError } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    setAlert(true)
  }, [authError])

  // manages authenticated
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  useEffect(() => {
    dispatch(loadCurrentUser())
  }, [isAuthenticated, dispatch])

  //logs in user if GoogleAuth
  const user = useSelector((state: RootState) => state.users.currentUser)
  useEffect(() => {
    if (user) dispatch(isLoggedIn(user))
  }, [user, dispatch])

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchCities())
    dispatch(fetchItineraries())
    dispatch(fetchActivities())
    dispatch(fetchFavourites())
    setisLoading(false)
  }, [dispatch])

  // TODO redirect when itinerary name is not found in route

  if (isLoading) {
    return (
      <div className="loader">
        <PuffLoader color="red" loading={true} size={80} />
        <Typography
          color="secondary"
          variant="caption"
          className="loaderMessage"
        >
          Mytinerary is loading...
        </Typography>
      </div>
    )
  }

  function Alert(props: any) {
    return <Alert elevation={6} variant="filled" {...props} />
  }

  const handleCloseAlert = (event: any, reason: string) => {
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
          {/* <Route
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
          <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>

        {authError && (
          <Snackbar
            open={alert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={4000}
            onClose={handleCloseAlert}
            className="alert"
          >
            <Alert onClose={handleCloseAlert} severity="error">
              {authError}
            </Alert>
          </Snackbar>
        )}
      </StyledGrid>
    </Router>
  )
}
