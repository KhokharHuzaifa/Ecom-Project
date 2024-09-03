import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserInfo, setIsAuthenticated } from '../features/authSlice';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials:'include'
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authApi.endpoints.getMe.initiate(null));
        } catch (err) {
          console.log(err);

        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.query({
      query: () => '/auth/logout',
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
        await queryFulfilled
        dispatch(setUserInfo(''));
        dispatch(setIsAuthenticated(false))
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getMe:builder.query({
      query: () => 'me',
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
        const {data} =  await queryFulfilled
        if(!data.success){
          dispatch(setIsAuthenticated(false));
          return;
        }
        dispatch(setUserInfo(data));
        dispatch(setIsAuthenticated(true));
        } catch (err) {
          console.log(err);
        }
      },
    })
  }),
})

export const { useLoginMutation, useRegisterMutation , useGetMeQuery, useLazyLogoutQuery} = authApi