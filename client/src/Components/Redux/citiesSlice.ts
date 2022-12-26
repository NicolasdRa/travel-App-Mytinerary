import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { citiesUrl } from '../../constants'
import { RootState } from './store'
import { City, Favourite } from '../../@types/types'

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
  async (cityName: string | undefined) => {
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

// Define a type for the slice state
interface CitiesSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  currentCity: City | null
  // geoDB: null,
  data: City[]
}

// Define the initial state using that type
const initialState: CitiesSlice = {
  loading: 'idle',
  status: '',
  results: '',
  // geoDB: null,
  currentCity: null,
  data: [],
}

// SLICE
const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types
    addCity(state, action: PayloadAction<City>) {
      // "mutate" the array by calling push()
      state.data.push(action.payload)
    },
    deleteCity(state, action) {
      state.data.filter((city, i) => i !== action.payload.index)
    },
    addCityFavourite: {
      reducer(state, action: PayloadAction<Favourite>) {
        state.currentCity &&
          state.currentCity.favourites.unshift(action.payload)
      },
      prepare: (data: Favourite) => {
        return {
          payload: data,
        }
      },
    },
    deleteCityFavourite: {
      reducer(state, action: PayloadAction<Favourite>) {
        state.currentCity &&
          state.currentCity.favourites.filter(
            (favourite: { _id: any }) => favourite._id !== action.payload._id
          )
      },
      prepare(data: Favourite) {
        return {
          payload: data,
        }
      },
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCities.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload.data
    })
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(fetchCityByName.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchCityByName.fulfilled, (state, action) => {
      state.loading = 'done'
      state.currentCity = action.payload
    })
    builder.addCase(fetchCityByName.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
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
const selectCities = (state: RootState) => state.cities.data

export const selectCitiesLoading = (state: RootState) => state.cities.loading

export const selectCurrentCity = (state: RootState) => state.cities.currentCity

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

export const selectRandomCity = createSelector([selectAllCities], (items) => {
  const randomItem = items[Math.floor(Math.random() * items.length)]
  return randomItem
})

// Extract and export each action creator by name
export const { addCity, deleteCity } = citiesSlice.actions

// // Export the reducer as a default export
export default citiesSlice.reducer
