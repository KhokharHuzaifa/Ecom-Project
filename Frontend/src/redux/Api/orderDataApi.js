import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderDataApi = createApi({
  reducerPath: "orderDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ['orders'],
  endpoints: (builder) => ({
    orderData: builder.query({
      query: () => ({
        url:"/order-list",
        method : "GET"
      }),
      invalidatesTags: ['orders']
    })
  }),
});

export const {
  useOrderDataQuery
} = orderDataApi;
