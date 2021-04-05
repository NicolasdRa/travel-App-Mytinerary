import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { citiesUrl } from '../../constants'

// THUNKS
export const fetchCities = createAsyncThunk('cities/fetchAll', async () => {
  const res = await axios({
    method: 'GET',
    url: citiesUrl,
    responseType: 'json',
  })
  return res.data
})

export const fetchCityByName = createAsyncThunk(
  'itineraries/fetchItineraryByName',
  async (cityName, thunkAPI) => {
    const res = await axios({
      method: 'GET',
      url: `${citiesUrl}name/${cityName}`,
      responseType: 'json',
    })
    return res.data
  }
)

// export const getCitiesGeoDB = createAsyncThunk('cities/geoDB', async (name) => {
//   const res = await axios({
//     method: 'GET',
//     url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
//     params: {
//       limit: '10',
//       minPopulation: '20000',
//       namePrefix: `${name}`,
//       sort: 'population',
//     },
//     headers: {
//       'x-rapidapi-key': '312e885d70msh49b3d4dcfdebf37p1945cdjsn1b9050b9edb7',
//       'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
//     },
//     responseType: 'json',
//   })
//   return res.data
// })

// SLICE
const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    loading: 'idle',
    results: '',
    // geoDB: null,
    data: [],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addCity(state, action) {
      // "mutate" the array by calling push()
      state.push(action.payload)
    },
    deleteCity(state, action) {
      return state.filter((city, i) => i !== action.payload.index)
    },
    addCityFavourite: {
      reducer(state, action) {
        state.currentCity.favourites.unshift(action.payload)
      },
      prepare(data) {
        return {
          payload: data,
        }
      },
    },
    deleteCityFavourite: {
      reducer(state, action) {
        state.currentCity.favourites.filter(
          (favourite) => favourite._id !== action.payload._id
        )
      },
      prepare(data) {
        return {
          payload: data,
        }
      },
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCities.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.data = action.payload.data
    },
    [fetchCities.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.error
    },
    [fetchCityByName.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentCity = action.payload.data
    },
    [fetchCityByName.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
    // [getCitiesGeoDB.fulfilled]: (state, action) => {
    //   state.loading = 'done'
    //   state.geoDB = action.payload
    // },
    // [getCitiesGeoDB.rejected]: (state, action) => {
    //   state.loading = 'fail'
    //   state.error = action.error
    // },
  },
})

// SELECTORS
const selectCities = (state) => state.cities.data

export const selectCitiesLoading = (state) => state.cities.loading

export const selectCurrentCity = (state) => state.cities.currentCity

export const selectAllCities = createSelector(
  [selectCities],
  (cities) => cities
)

export const selectFilteredCities = createSelector(
  [selectAllCities, (state, string) => string],
  (cities, string) =>
    cities.filter((city) => city.name.toLowerCase().startsWith(string))
)

export const selectCityByName = createSelector(
  [selectAllCities, (state, name) => name],
  (cities, name) =>
    cities && name && cities.filter((city) => city.name === name)
)

// Extract and export each action creator by name
export const { addCity, deleteCity } = citiesSlice.actions

// // Export the reducer as a default export
export default citiesSlice.reducer
