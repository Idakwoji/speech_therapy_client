import { apiSlice } from '.'

export const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      //
      query: ({ username, password }) => ({
        url: '/login',
        method: 'post',
        body: JSON.stringify({ username: username, password }),
      }),
    }),

    //
    enableTwoFactorAuth: builder.mutation({
      query: ({ user_id }) => ({
        url: '/enable_2fa',
        method: 'post',
        body: JSON.stringify({ user_id }),
      }),
    }),
  }),
})

export const { useLoginMutation, useEnableTwoFactorAuthMutation } = auth
