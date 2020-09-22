import axios from 'axios'
import { FETCH_CITIES, SET_LOADING, LOADING_ERROR } from '../types'

// gets cities from server/DB
export const fetchCities = () => async dispatch => {
  try {
    setLoading()
    const res = await axios.get('http://localhost:5000/api/v1/cities')
    const data = await res.json()

    dispatch({
      type: FETCH_CITIES,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOADING_ERROR,
      payload: error
    })
  }
}

// Sets Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}
