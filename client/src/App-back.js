// this is the original Class based component...
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopNav from './screen/TopNav/TopNav'
import Landing from './screen/pages/landing/Landing'
import Signup from './screen/Signup/Signup'
import Login from './screen/Login/Login'
import Profile from './screen/pages/profile/Profile'
import Listing from './screen/pages/listing/Listing'
import CityPage from './screen/Cities/CityPage'
import ItineraryPage from './screen/pages/itinerary/ItineraryPage'
import ActivityPage from './screen/pages/activity/ActivityPage'
import BottomNav from './screen/BottomNav/BottomNav'
import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from './screen/theme/Theme'

const styles = theme => ({
  topNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },

  main: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '4rem'
  },

  bottomNav: {
    position: 'fixed',
    top: 0,
    width: '100%'
  }
})

class App extends Component {
  // Checks & Loads user if logged in
  // componentDidMount () {
  //   store.dispatch(loadUser())
  // }

  render () {
    const { classes } = this.props
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <TopNav className={classes.topNav} />
          <Box className={classes.main}>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/listing' component={Listing} />
              <Route exact path='/citypage/:city_name' component={CityPage} />
              <Route
                exact
                path='/itinerarypage/:title'
                component={ItineraryPage}
              />
              <Route
                exact
                path='/activitypage/:title'
                component={ActivityPage}
              />
            </Switch>
          </Box>
          <BottomNav className={classes.bottomNav} />
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles)(App)