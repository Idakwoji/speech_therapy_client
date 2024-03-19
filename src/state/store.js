import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: !!import.meta.env.DEV,
})
