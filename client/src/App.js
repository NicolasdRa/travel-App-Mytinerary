import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import TopNav from './Components/ui/TopNav/TopNav'
import BottomNav from './Components/ui/BottomNav/BottomNav'
import Footer from './Components/ui/footer/Footer'
import LandingPage from './Components/pages/LandingPage/LandingPage'
import ProfilePage from './Components/pages/ProfilePage/ProfilePage'
import ListingPage from './Components/pages/ListingPage/ListingPage'
import CityPage from './Components/pages/CityPage/CityPage'
import ItineraryPage from './Components/pages/ItineraryPage/ItineraryPage'
import ActivityPage from './Components/pages/ActivityPage/ActivityPage'
import PasswordResetForm from './Components/ui/PasswordResetForm/PasswordResetForm'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from './Components/theme/Theme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { fetchCities } from './Components/Redux/citiesSlice'
import { fetchItineraries } from './Components/Redux/itinerariesSlice'
import { fetchActivities } from './Components/Redux/activitiesSlice'
import {
  loadCurrentUser,
  unloadCurrentUser,
} from './Components/Redux/usersSlice'
import { isLoggedIn } from './Components/Redux/authSlice'

const useStyles = makeStyles((theme) => ({
  topNav: {
    position: 'fixed',
    bottom: 0,
  },

  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  bottomNav: {
    position: 'fixed',
    top: 0,
  },
}))

const App = ({ fetchCities, fetchItineraries, fetchActivities }) => {
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()

  //logs in user
  const user = useSelector((state) => state.users.currentUser)
  useEffect(() => {
    if (user) dispatch(isLoggedIn(user))
  }, [dispatch, user])

  // authenticates user
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  useEffect(() => {
    dispatch(loadCurrentUser())

    // clean-up
    return () => {
      dispatch(unloadCurrentUser())
    }
  }, [dispatch, isAuthenticated])

  // fetches data from DB
  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  useEffect(() => {
    fetchItineraries()
  }, [fetchItineraries])

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  // console.log('App rendered')

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TopNav className={classes.topNav} />
        <Grid className={classes.main}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              exact
              path="/resetPassword/:resetToken"
              component={PasswordResetForm}
            />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/listing" component={ListingPage} />
            <Route exact path="/citypage/:city_name" component={CityPage} />
            <Route
              exact
              path="/itinerarypage/:title"
              component={ItineraryPage}
            />
            <Route exact path="/activitypage/:title" component={ActivityPage} />
          </Switch>
        </Grid>
        {matches ? <BottomNav className={classes.bottomNav} /> : <Footer />}
      </ThemeProvider>
    </BrowserRouter>
  )
}

App.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  fetchItineraries: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
}

export default connect(null, {
  fetchCities,
  fetchItineraries,
  fetchActivities,
  loadCurrentUser,
})(App)
