import { FETCH_ITINERARIES, SET_LOADING, LOADING_ERROR } from '../actions/types'

const initialState = {
  itineraries: null,
  current: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITINERARIES:
      const { itineraries, cityName } = action.payload
      return {
        ...state,
        itineraries: {
          ...state.itineraries,
          [cityName]: itineraries
        },
        loading: false
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    case LOADING_ERROR:
      console.log(action.payload)
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
