import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

// THUNKS
export const fetchComments = createAsyncThunk(
  "comments/fetchAll",
  async (thunkAPI) => {
    const res = await axios({
      method: "get",
      url: "/api/v1/comments",
      responseType: "json",
    });
    return res.data;
  },
);

export const fetchCommentsForItinerary = createAsyncThunk(
  "comments/fetchForItinerary",
  async (thunkAPI) => {
    const res = await axios({
      method: "get",
      url: "/api/v1/comments/itinerary/:title",
      responseType: "json",
    });
    return res.data;
  },
);

export const fetchCommentById = createAsyncThunk(
  "comments/fetchById",
  async (thunkAPI) => {
    const res = await axios({
      method: "get",
      url: "/api/v1/comments/:id",
      responseType: "json",
    });
    return res.data;
  },
);

export const fetchCommentByTitle = createAsyncThunk(
  "comments/fetchByTitle",
  async (thunkAPI) => {
    const res = await axios({
      method: "get",
      url: "/api/v1/comments/:title",
      responseType: "json",
    });
    return res.data;
  },
);

export const addComment = createAsyncThunk(
  "comments/addOne",
  async (formData, thunkAPI) => {
    const res = await axios({
      method: "POST",
      url: "/api/v1/comments",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    });
    return res.data;
  },
);

// SLICE
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    loading: "idle",
    status: "",
    results: "",
    data: [],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addComment(state, action) {
      // "mutate" the array by calling push()
      state.data.push(action.payload);
    },
    deleteComment(state, action) {
      return state.filter((comment, i) => i !== action.payload.index);
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchComments.fulfilled]: (state, action) => {
      return {
        loading: "done",
        ...action.payload,
      };
    },
    [fetchComments.rejected]: (state, action) => {
      return {
        loading: "fail",
        error: action.payload,
      };
    },
    [addComment.fulfilled]: (state, action) => {
      const newItinerary = action.payload.data.data;
      state.data.unshift(newItinerary);
    },
    [addComment.rejected]: (state, action) => {
      state.loading = "fail";
      state.error = action.payload;
    },
  },
});

// SELECTORS
const selectComments = (state) => state.comments.data;

export const selectCommentsLoading = (state) => state.comments.loading;

export const selectAllComments = createSelector(
  [selectComments],
  (comments) => comments,
);

export const selectCommentsForCity = createSelector(
  [selectAllComments, (state, city) => city],
  (comments, city) =>
    comments && city ? comments.filter((comment) => comment.city === city) : [],
);

export const selectCommentsForItinerary = createSelector(
  [selectAllComments, (state, itinerary) => itinerary],
  (comments, itinerary) =>
    comments && itinerary
      ? comments.filter((comment) => comment.itinerary === itinerary)
      : [],
);

export const selectCommentById = createSelector(
  [selectAllComments, (state, id) => id],
  (comments, id) =>
    comments && id ? comments.filter((comment) => comment.id === id) : [],
);

export const selectCommentsByUserId = createSelector(
  [selectAllComments, (state, userId) => userId],
  (comments, userId) =>
    comments && userId
      ? comments.filter((comment) => comment.author === userId)
      : [],
);

// Extract and export each action creator by name
export const { deleteComment } = commentsSlice.actions;

// // Export the reducer as a default export
export default commentsSlice.reducer;
