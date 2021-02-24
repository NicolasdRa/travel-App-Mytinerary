import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

// THUNKS
export const fetchItineraries = createAsyncThunk(
  "itineraries/fetchAll",
  async (thunkAPI) => {
    const res = await axios({
      method: "get",
      url: "/api/v1/itineraries",
      responseType: "json",
    });
    return res.data;
  },
);

export const fetchItineraryById = createAsyncThunk(
  "itineraries/fetchItineraryById",
  async (id, thunkAPI) => {
    const res = await axios({
      method: "get",
      url: `/api/v1/itineraries/${id}`,
      responseType: "json",
    });
    return res.data;
  },
);

export const fetchItineraryByTitle = createAsyncThunk(
  "itineraries/fetchItineraryByTitle",
  async (title, thunkAPI) => {
    const res = await axios({
      method: "get",
      url: `/api/v1/itineraries/title/${title}`,
      responseType: "json",
    });
    return res.data;
  },
);

export const addItinerary = createAsyncThunk(
  "itineraries/addOne",
  async (formData, thunkAPI) => {
    const res = await axios({
      method: "POST",
      url: "/api/v1/itineraries",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    return res.data;
  },
);

// SLICE
const itinerariesSlice = createSlice({
  name: "itineraries",
  initialState: {
    loading: "idle",
    status: "",
    results: "",
    data: [],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addItinerary(state, action) {
      // "mutate" the array by calling push()
      state.data.push(action.payload);
    },
    deleteItinerary(state, action) {
      return state.filter((itinerary, i) => i !== action.payload.index);
    },
    updateItineraryComments: {
      reducer(state, action) {
        state.currentItinerary.comments.push(action.payload);
      },
      prepare(comment) {
        return {
          payload: comment,
        };
      },
    },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchItineraries.fulfilled]: (state, action) => {
      return {
        loading: "done",
        ...action.payload,
      };
    },
    [fetchItineraries.rejected]: (state, action) => {
      return {
        loading: "fail",
        error: action.payload,
      };
    },
    [addItinerary.fulfilled]: (state, action) => {
      const newItinerary = action.payload.data.data;
      state.loading = "done";
      state.data.unshift(newItinerary);
    },
    [addItinerary.rejected]: (state, action) => {
      state.loading = "fail";
      state.error = action.payload;
    },

    [fetchItineraryByTitle.fulfilled]: (state, action) => {
      state.loading = "done";
      state.currentItinerary = action.payload.data;
    },
    [fetchItineraryByTitle.rejected]: (state, action) => {
      state.loading = "fail";
      state.error = action.payload;
    },

    [fetchItineraryById.fulfilled]: (state, action) => {
      state.loading = "done";
      state.currentItinerary = action.payload.data;
    },
    [fetchItineraryById.rejected]: (state, action) => {
      state.loading = "fail";
      state.error = action.payload;
    },
  },
});

// SELECTORS
const selectItineraries = (state) => state.itineraries.data;

export const selectCurrentItinerary = (state) =>
  state.itineraries.currentItinerary;

export const selectItinerariesLoading = (state) => state.itineraries.loading;

export const selectAllItineraries = createSelector(
  [selectItineraries],
  (itineraries) => itineraries,
);

// FIXME: fix this selector or leave the one above without createSelector
// export const selectCurrentItinerary = createSelector(
//   [selectItineraries],
//   (itineraries) => itineraries.currentItinerary,
// );

export const selectAllItinerariesForCity = createSelector(
  [selectAllItineraries, (state, city) => city],
  (itineraries, city) =>
    itineraries && city
      ? itineraries.filter((itinerary) => itinerary.city === city)
      : [],
);

export const selectItineraryByTitle = createSelector(
  [selectAllItineraries, (state, title) => title],
  (itineraries, title) =>
    itineraries && title
      ? itineraries.filter((itinerary) => itinerary.title === title)
      : [],
);

export const selectItinerariesByUser = createSelector(
  [selectAllItineraries, (state, userName) => userName],
  (itineraries, userName) =>
    itineraries && userName
      ? itineraries.filter(
          (itinerary) => itinerary.author.userName === userName,
        )
      : [],
);

// Extract and export each action creator by name
export const {
  deleteItinerary,
  updateItineraryComments,
} = itinerariesSlice.actions;

// // Export the reducer as a default export
export default itinerariesSlice.reducer;
