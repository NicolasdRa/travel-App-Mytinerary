import axios from 'axios'
import { FETCH_ACTIVITIES, SET_LOADING, LOADING_ERROR } from '../types'

// gets cities from server/DB
export const fetchActivities = () => async dispatch => {
  try {
    setLoading()
    const res = await axios({
      method: 'get',
      url: '/activities',
      baseURL: 'http://localhost:5000/api/v1',
      responseType: 'json'
    })
    const data = await res.data

    dispatch({
      type: FETCH_ACTIVITIES,
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
