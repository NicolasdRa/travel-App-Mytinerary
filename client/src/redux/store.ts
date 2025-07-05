import { configureStore } from '@reduxjs/toolkit'
import citiesSlice from './citiesSlice'
import itinerariesSlice from './itinerariesSlice'
import activitiesSlice from './activitiesSlice'
import favouritesSlice from './favouritesSlice'
import commentsSlice from './commentsSlice'
import { authReducer } from '../features/auth'
import usersSlice from './usersSlice'
import uiSlice from './uiSlice'

export const store = configureStore({
  reducer: {
    cities: citiesSlice,
    itineraries: itinerariesSlice,
    activities: activitiesSlice,
    favourites: favouritesSlice,
    comments: commentsSlice,
    auth: authReducer,
    users: usersSlice,
    ui: uiSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
