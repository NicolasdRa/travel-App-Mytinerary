import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import TopNav from './screen/TopNav/TopNav'
import Landing from './screen/Landing/Landing'
import Signup from './screen/Signup/Signup'
import Login from './screen/Login/Login'
import Profile from './screen/Profile/Profile'
import Cities from './screen/Cities/Cities'
import Itinerary from './screen/Itinerary/Itinerary'
import BottomNav from './screen/BottomNav/BottomNav'
import './App.css'
import 'typeface-roboto'
import store from './store/store'
import { loadUser } from './store/actions/authActions'

export default class App extends Component {
  // Checks & Loads user if logged in
  componentDidMount () {
    store.dispatch(loadUser())
  }

  render () {
    return (
      <BrowserRouter>
        <TopNav className='topNav' />
        <div className='main'>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/cities' component={Cities} />
            <Route exact path='/itineraries/:city_name' component={Itinerary} />
          </Switch>
        </div>
        <BottomNav className='bottomNav' />
      </BrowserRouter>
    )
  }
}
