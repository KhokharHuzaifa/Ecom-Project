import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ['orders'],
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (data) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['orders'] 
    }),
  }),
});

export const {
  useMakePaymentMutation
} = paymentApi;
