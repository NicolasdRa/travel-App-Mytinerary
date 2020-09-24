import {
  FETCH_ITINERARIES,
  SET_LOADING,
  LOADING_ERROR,
  ADD_ITINERARY,
  POSTING_ERROR
} from '../types'
import axios from 'axios'

// gets itineraries from server/DB
export const fetchItineraries = () => async dispatch => {
  setLoading()

  try {
    const res = await axios({
      method: 'get',
      url: '/itineraries',
      baseURL: 'http://localhost:5000/api/v1',
      responseType: 'json'
    })
    const data = await res.data

    dispatch({
      type: FETCH_ITINERARIES,
      payload: data
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: LOADING_ERROR,
      payload: error
    })
  }
}

//adds new itinerary
export const addItinerary = () => async dispatch => {
  try {
    const res = await axios.post('http://localhost:5000/api/itineraries/add')
    const data = await res.json()
    console.log(data)

    dispatch({
      type: ADD_ITINERARY,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: POSTING_ERROR,
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

// gets itineraries by cityname from server/DB
// export const fetchItineraries = cityName => async dispatch => {
//   setLoading()

//   try {
//     const res = await fetch('http://localhost:5000/api/itineraries/' + cityName)
//     const itineraries = await res.json()

//     dispatch({
//       type: FETCH_ITINERARIES,
//       payload: { itineraries, cityName }
//     })
//   } catch (error) {
//     dispatch({
//       type: LOADING_ERROR,
//       payload: error.res.data
//     })
//   }
// }

// // Sets Loading to true
// export const setLoading = () => {
//   return {
//     type: SET_LOADING
//   }
// }
