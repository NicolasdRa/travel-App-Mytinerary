import {
  FETCH_FAVOURITES,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  LOADING_ERROR,
} from "../types";

const initialState = {
  results: 0,
  loading: false,
  error: null,
  newfavourite: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOURITES:
      return {
        ...state,
        results: action.payload.results,
        loading: false,
      };

    case ADD_FAVOURITE:
      return {
        ...state,
        newFavourite: action.payload,
        loading: false,
      };

    case REMOVE_FAVOURITE:
      return {
        ...state,
        newFavourite: action.payload,
        loading: false,
      };

    case LOADING_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
