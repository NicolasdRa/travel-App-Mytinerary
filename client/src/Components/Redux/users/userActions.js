import {
  LOAD_USER,
  UNLOAD_USER,
  LOADING_ERROR,
  UPDATE_USER,
  UPDATE_ERROR,
} from "../types";
import axios from "axios";

// load current User
export const loadCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/v1/users/me`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error });
  }
};

// unload current User
export const unloadCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: UNLOAD_USER });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error });
  }
};

// update user info & picture
export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    console.log(res.data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_ERROR,
      payload: error,
    });
  }
};

export const updateProfileCoverImage = (formData) => async (dispatch) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateCover",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onDownloadProgress: (progressEvent) => {
        console.log(
          "upload progress: " +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%",
        );
      },
    });
    console.log(res.data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_ERROR,
      payload: error,
    });
  }
};
