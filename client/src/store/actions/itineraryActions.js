import { FETCH_ITINERARIES, SET_LOADING, LOADING_ERROR } from './types'

// gets itineraries from server/DB
export const fetchItineraries = cityName => async dispatch => {
  setLoading()

  try {
    const res = await fetch('http://localhost:5000/itineraries/' + cityName)
    const itineraries = await res.json()

    dispatch({
      type: FETCH_ITINERARIES,
      payload: itineraries
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
