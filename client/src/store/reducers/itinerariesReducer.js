import {
  FETCH_ITINERARIES,
  FETCH_ITINERARIES_BY_CITY,
  ADD_ITINERARY,
  SET_LOADING,
  LOADING_ERROR,
  POSTING_ERROR
} from '../actions/types'

const initialState = {
  itineraries: null,
  current: null,
  loading: false,
  error: null,
  newItinerary: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITINERARIES:
      // console.log("fetched itineraries")
      return {
        ...state,
        itineraries: action.payload,
        loading: false
      }

    case FETCH_ITINERARIES_BY_CITY:
      const { itineraries, cityName } = action.payload
      return {
        ...state,
        itineraries: {
          ...state.itineraries,
          [cityName]: itineraries
        },
        loading: false
      }

    case ADD_ITINERARY:
      return {
        ...state,
        newItinerary: action.payload,
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

    case POSTING_ERROR:
      console.log(action.payload)
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
