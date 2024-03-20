import { apiSlice } from '.'

export const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      //
      query: ({ username, password, account_type }) => ({
        url: '/login',
        method: 'post',
        body: JSON.stringify({ username: username, password, account_type }),
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

    //
    verifyTwoFactorAuth: builder.mutation({
      query: ({ user_id, otp_code }) => ({
        url: '/verify_2fa',
        method: 'post',
        body: JSON.stringify({ user_id, otp_code }),
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useEnableTwoFactorAuthMutation,
  useVerifyTwoFactorAuthMutation,
} = auth
