import { FETCH_FAVOURITES, LOADING_ERROR } from "../types";
import axios from "axios";

// gets itineraries from server/DB
export const fetchFavourites = (id) => async (dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: `itineraries/${id}/favourites`,
      baseURL: "http://localhost:5000/api/v1",
      responseType: "json",
    });
    const data = await res.data;
    dispatch({
      type: FETCH_FAVOURITES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOADING_ERROR,
      payload: error,
    });
  }
};
