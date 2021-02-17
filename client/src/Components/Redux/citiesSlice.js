import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

// THUNKS
export const fetchCities = createAsyncThunk("cities/fetchAll", async () => {
  const res = await axios({
    method: "GET",
    url: "/api/v1/cities",
    responseType: "json",
  });
  return res.data;
});

export const getCitiesGeoDB = createAsyncThunk("cities/geoDB", async (name) => {
  const res = await axios({
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: {
      limit: "10",
      minPopulation: "20000",
      namePrefix: `${name}`,
      sort: "population",
    },
    headers: {
      "x-rapidapi-key": "312e885d70msh49b3d4dcfdebf37p1945cdjsn1b9050b9edb7",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
    responseType: "json",
  });
  return res.data;
});

// SLICE
const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    loading: "idle",
    geoDB: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addCity(state, action) {
      // "mutate" the array by calling push()
      state.push(action.payload);
    },
    deleteCity(state, action) {
      return state.filter((city, i) => i !== action.payload.index);
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCities.fulfilled]: (state, action) => {
      // Add user to the state array
      return { loading: "done", ...action.payload };
    },
    [fetchCities.rejected]: (state, action) => {
      return {
        loading: "fail",
        error: action.error,
      };
    },
    [getCitiesGeoDB.fulfilled]: (state, action) => {
      // Add user to the state array
      return { loading: "done", geoDB: { ...action.payload } };
    },
    [getCitiesGeoDB.rejected]: (state, action) => {
      return {
        loading: "fail",
        error: action.error,
      };
    },
  },
});

// SELECTORS
const selectCities = (state) => state.cities.data;

export const selectCitiesLoading = (state) => state.cities.loading;

export const selectAllCities = createSelector(
  [selectCities],
  (cities) => cities,
);

export const selectFilteredCities = createSelector(
  [selectAllCities, (state, string) => string],
  (cities, string) =>
    cities.filter((city) => city.name.toLowerCase().startsWith(string)),
);

export const selectCityByName = createSelector(
  [selectAllCities, (state, name) => name],
  (cities, name) => cities.find((city) => city.name === name),
);

// Extract and export each action creator by name
export const { addCity, deleteCity } = citiesSlice.actions;

// // Export the reducer as a default export
export default citiesSlice.reducer;
