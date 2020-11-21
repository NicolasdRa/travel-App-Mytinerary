import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopNav from './Components/ui/TopNav/TopNav'
import BottomNav from './Components/ui/BottomNav/BottomNav'
import Footer from './Components/ui/footer/Footer'
import Landing from './Components/pages/landing/Landing'
import Profile from './Components/pages/profile/Profile'
import Listing from './Components/pages/listing/Listing'
import CityPage from './Components/pages/city/CityPage'
import ItineraryPage from './Components/pages/itinerary/ItineraryPage'
import ActivityPage from './Components/pages/activity/ActivityPage'
import PasswordResetForm from './Components/ui/PasswordResetForm/PasswordResetForm'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from './Components/theme/Theme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { fetchCities } from './Components/Redux/cities/cityActions'
import { fetchItineraries } from './Components/Redux/itineraries/itineraryActions'
import { fetchActivities } from './Components/Redux/activities/activityActions'
import { loadCurrentUser } from './Components/Redux/users/userActions'
import { isLoggedIn } from './Components/Redux/auth/authActions'

const useStyles = makeStyles(theme => ({
  topNav: {
    position: 'fixed',
    bottom: 0
  },

  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  bottomNav: {
    position: 'fixed',
    top: 0
  }
}))

const App = ({ fetchCities, fetchItineraries, fetchActivities }) => {
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const dispatch = useDispatch()

  const user = useSelector(state => state.users.currentUser)
  useEffect(() => {
    dispatch(isLoggedIn(user))
  }, [user])

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  useEffect(() => {
    dispatch(loadCurrentUser())
  }, [isAuthenticated])

  // fetches data from DB
  useEffect(() => {
    fetchCities()
    fetchItineraries()
    fetchActivities()
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TopNav className={classes.topNav} />
        <Grid className={classes.main}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route
              exact
              path='/resetPassword/:resetToken'
              component={PasswordResetForm}
            />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/listing' component={Listing} />
            <Route exact path='/citypage/:city_name' component={CityPage} />
            <Route
              exact
              path='/itinerarypage/:title'
              component={ItineraryPage}
            />
            <Route exact path='/activitypage/:title' component={ActivityPage} />
          </Switch>
        </Grid>
        {matches ? <BottomNav className={classes.bottomNav} /> : <Footer />}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default connect(null, {
  fetchCities,
  fetchItineraries,
  fetchActivities,
  loadCurrentUser
})(App)
