import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import TopNav from '../Components/ui/TopNav/TopNav'
import BottomNav from '../Components/ui/BottomNav/BottomNav'
import Footer from '../Components/ui/footer/Footer'
import LandingPage from '../Components/pages/LandingPage/LandingPage'
import ProfilePage from '../Components/pages/ProfilePage/ProfilePage'
import ListingPage from '../Components/pages/ListingPage/ListingPage'
import CityPage from '../Components/pages/CityPage/CityPage'
import ItineraryPage from '../Components/pages/ItineraryPage/ItineraryPage'
import ActivityPage from '../Components/pages/ActivityPage/ActivityPage'
import PasswordResetForm from '../Components/ui/PasswordResetForm/PasswordResetForm'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../Components/theme/Theme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

export const AppRouter = () => {
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Router>
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
            <Redirect to="/" />
          </Switch>
        </Grid>
        {matches ? <BottomNav className={classes.bottomNav} /> : <Footer />}
      </ThemeProvider>
    </Router>
  )
}
