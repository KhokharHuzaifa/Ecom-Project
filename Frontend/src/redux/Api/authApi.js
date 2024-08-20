import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https:localhost:8000' 
    }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: () => 'auth/login',
      }),
      register: builder.mutation({
        query: () => 'auth/register',
      }),
    }),
  })

  export const { useLoginMutation , useRegisterMutation } = authApi