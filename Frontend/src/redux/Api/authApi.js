import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/' 
    }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url:'/auth/login',
          method:'POST',
          body:data
        })
      }),
      register: builder.mutation({
        query: (data) => ({
          url:'/auth/register',
          method:'POST',
          body:data
        })
      }),
    }),
  })

  export const { useLoginMutation , useRegisterMutation } = authApi