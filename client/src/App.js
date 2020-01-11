import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import TopNav from '../src/Components/TopNav/TopNav'
import Landing from './screen/Landing/Landing'
import Signup from './screen/Signup/Signup'
import Login from './screen/Login/Login'
import Cities from './screen/Cities/Cities'
import Itinerary from './screen/Itinerary/Itinerary'
import BottomNav from '../src/Components/BottomNav/BottomNav'
import './App.css'
import 'typeface-roboto'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <TopNav />
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/cities' component={Cities} />
            <Route exact path='/itineraries/:city_name' component={Itinerary} />
          </Switch>
        </div>
        <BottomNav />
      </BrowserRouter>
    )
  }
}
