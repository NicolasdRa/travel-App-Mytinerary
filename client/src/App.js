import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import TopNav from './screen/TopNav/TopNav'
import Landing from './screen/Landing/Landing'
import Signup from './screen/Signup/Signup'
import Login from './screen/Login/Login'
import Profile from './screen/Profile/Profile'
import Listing from './screen/Listing/Listing'
import Itinerary from './screen/Itineraries/Itineraries'
import BottomNav from './screen/BottomNav/BottomNav'
import './App.css'
import 'typeface-roboto'
//

export default class App extends Component {
  // Checks & Loads user if logged in
  // componentDidMount () {
  //   store.dispatch(loadUser())
  // }

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
            <Route exact path='/listing' component={Listing} />
            <Route exact path='/itineraries/:city_name' component={Itinerary} />
          </Switch>
        </div>
        <BottomNav className='bottomNav' />
      </BrowserRouter>
    )
  }
}
