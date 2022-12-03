import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PuffLoader from 'react-spinners/PuffLoader'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { LandingPage } from '../Components/pages/LandingPage/LandingPage'
import { LoginPage } from '../Components/pages/LoginPage/LoginPage'
import { SignupPage } from '../Components/pages/SignupPage/SignupPage'
import ProfilePage from '../Components/pages/ProfilePage/ProfilePage'
import ListingPage from '../Components/pages/ListingPage/ListingPage'
import CityPage from '../Components/pages/CityPage/CityPage'
import ItineraryPage from '../Components/pages/ItineraryPage/ItineraryPage'
import ActivityPage from '../Components/pages/ActivityPage/ActivityPage'
import { PasswordResetPage } from '../Components/pages/PasswordResetPage/PasswordResetPage'

import { Snackbar, Typography } from '@mui/material'

// import { ThemeProvider } from '@mui/material/styles'

import { fetchCities } from '../Components/Redux/citiesSlice'
import { fetchItineraries } from '../Components/Redux/itinerariesSlice'
import { fetchActivities } from '../Components/Redux/activitiesSlice'
import { fetchFavourites } from '../Components/Redux/favouritesSlice'
import { loadCurrentUser } from '../Components/Redux/usersSlice'
import { isLoggedIn } from '../Components/Redux/authSlice'

import { StyledGrid } from './styles'

export const AppRouter = () => {
  const dispatch = useDispatch()

  const [isLoading, setisLoading] = useState(true)

  // manages alerts
  const [alert, setAlert] = useState(false)

  const { error: authError } = useSelector((state) => state.auth)
  useEffect(() => {
    setAlert(true)
  }, [authError])

  // manages authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  useEffect(() => {
    dispatch(loadCurrentUser())
  }, [isAuthenticated, dispatch])

  //logs in user if GoogleAuth
  const user = useSelector((state) => state.users.currentUser)
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
        <Switch>
          <PublicRoute
            exact
            path="/"
            isAuthenticated={true}
            component={LandingPage}
          />
          <PublicRoute
            exact
            path="/login"
            isAuthenticated={true}
            component={LoginPage}
          />
          <PublicRoute
            exact
            path="/signup"
            isAuthenticated={true}
            component={SignupPage}
          />
          <PublicRoute
            exact
            path="/listing"
            isAuthenticated={true}
            component={ListingPage}
          />
          <PublicRoute
            exact
            path="/citypage/:city_name"
            isAuthenticated={true}
            component={CityPage}
          />
          <PublicRoute
            exact
            path="/itinerarypage/:title"
            isAuthenticated={true}
            component={ItineraryPage}
          />
          <PublicRoute
            exact
            path="/activitypage/:title"
            isAuthenticated={true}
            component={ActivityPage}
          />
          <PrivateRoute
            exact
            path="/user/:userName"
            isAuthenticated={true}
            component={ProfilePage}
          />
          <PublicRoute
            path="/resetPassword/:resetToken"
            isAuthenticated={true}
            component={PasswordResetPage}
          />
          <Redirect to="/" />
        </Switch>
        {authError && (
          <Snackbar
            open={alert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={4000}
            onClose={handleCloseAlert}
            className="alert"
          >
            <Alert onClose={handleCloseAlert} severity="error">
              {authError.message}
            </Alert>
          </Snackbar>
        )}
      </StyledGrid>
    </Router>
  )
}
