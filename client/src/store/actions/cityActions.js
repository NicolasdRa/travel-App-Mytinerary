import { FETCH_CITIES, SET_LOADING, LOADING_ERROR } from './types'

// gets cities from server/DB
export const fetchCities = () => async dispatch => {
  setLoading()

  try {
    const res = await fetch('http://localhost:5000/cities/all')
    const cities = await res.json()
    // console.log(cities)
    dispatch({
      type: FETCH_CITIES,
      payload: cities
    })
  } catch (error) {
    dispatch({
      type: LOADING_ERROR,
      payload: error.res.data
    })
  }
}

// Sets Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}
