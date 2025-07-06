import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { CitiesService, GeoDBService } from '../services'
import { citiesUrl } from '../constants'
import { RootState } from './store'
import { City, Favourite } from '../@types/types'

// THUNKS
export const fetchCities = createAsyncThunk('cities/fetchAll', async () => {
  const data = await CitiesService.getAllCities()
  return data
})

export const fetchCityByName = createAsyncThunk(
  'itineraries/fetchItineraryByName',
  async (cityName: string | undefined) => {
    const data = await CitiesService.getCityByName(cityName!)
    return data
  }
)

export const getCitiesGeoDB = createAsyncThunk(
  'cities/geoDB', 
  async (name: string) => {
    const data = await GeoDBService.getCitiesGeoDB(name, 'cities')
    return data
  }
)

// Define a type for the slice state
interface CitiesSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  currentCity: City | null
  geoDB: any[] | null
  data: City[]
}

// Define the initial state using that type
const initialState: CitiesSlice = {
  loading: 'idle',
  status: '',
  results: '',
  geoDB: null,
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
      state.currentCity = action.payload.data
    })
    builder.addCase(fetchCityByName.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(getCitiesGeoDB.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getCitiesGeoDB.fulfilled, (state, action) => {
      state.loading = 'done'
      state.geoDB = action.payload
    })
    builder.addCase(getCitiesGeoDB.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
  },
})

// SELECTORS
export const selectAllCities = (state: RootState) => state.cities.data

export const selectCurrentCity = (state: RootState) => state.cities.currentCity

export const selectCitiesLoading = (state: RootState) => state.cities.loading

export const selectRandomCity = createSelector([selectAllCities], (items) => {
  const randomItem = items[Math.floor(Math.random() * items.length)]
  return randomItem
})

export const selectGeoDBCities = (state: RootState) => state.cities.geoDB

// Extract and export each action creator by name
export const { addCity, deleteCity } = citiesSlice.actions

// // Export the reducer as a default export
export default citiesSlice.reducer
