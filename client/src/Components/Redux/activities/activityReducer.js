import { FETCH_ACTIVITIES, SET_LOADING, LOADING_ERROR } from '../types'

const initialState = {
  activities: null,
  current: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        loading: false
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    case LOADING_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}