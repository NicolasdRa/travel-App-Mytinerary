import {
  LOAD_USER,
  UNLOAD_USER,
  UPDATE_USER,
  UPDATE_ERROR,
  SET_LOADING,
  LOADING_ERROR
} from '../types'

const initialState = {
  currentUser: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    case LOAD_USER:
      return {
        ...state,
        currentUser: action.payload.data,
        loading: false
      }

    case UNLOAD_USER:
      return {
        ...state,
        currentUser: null,
        loading: false
      }

    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload.data,
        loading: false
      }

    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload
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
