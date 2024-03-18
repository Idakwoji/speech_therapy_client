import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//--------------------------------------------------

//--------------------------------------------------

const API_URL = import.meta.env.DEV ? 'http://83.85.157.106:8000/api/' : '/api/'
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({}),
})
