import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getallproduct: builder.query({
      query: (data = {}) => ({
        url: `/product/all?price=${data.price || ""}&limit=${data.limit || 4}&page=${data.page || 1}&category=${data.category || ""}`,
        method: "GET",
      }),
    }),
    getsingleproduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/new",
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/update/${data._id}`,
        method: "PUT",
        body: data.formData,
      }),
    }),
  }),
});

export const {
  useGetallproductQuery,
  useGetsingleproductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
