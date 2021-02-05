import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppRouter } from './routers/AppRouter'

import { fetchCities, getCitiesGeoDB } from './Components/Redux/citiesSlice'
import { fetchItineraries } from './Components/Redux/itinerariesSlice'
import { fetchActivities } from './Components/Redux/activitiesSlice'
import {
  loadCurrentUser,
  unloadCurrentUser,
} from './Components/Redux/usersSlice'
import { isLoggedIn } from './Components/Redux/authSlice'

const App = () => {
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
    dispatch(fetchCities())
  }, [dispatch, fetchCities])

  useEffect(() => {
    dispatch(fetchItineraries())
  }, [dispatch, fetchItineraries])

  useEffect(() => {
    dispatch(fetchActivities())
  }, [dispatch, fetchActivities])

  // useEffect(() => {
  //   getCitiesGeoDB('Rio')
  // }, [getCitiesGeoDB])

  // console.log('App rendered')

  return <AppRouter />
}

export default App
