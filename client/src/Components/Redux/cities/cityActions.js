import { FETCH_CITIES, SET_LOADING, LOADING_ERROR } from '../types'

// gets cities from server/DB
export const fetchCities = () => async dispatch => {
  try {
    setLoading()
    const res = await fetch('http://localhost:5000/api/cities/all')
    const data = await res.json()

    dispatch({
      type: FETCH_CITIES,
      payload: data
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
