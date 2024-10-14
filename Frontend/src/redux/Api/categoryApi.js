import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getallcategory: builder.query({
      query: () => ({
        url: "/category/all",
        methid: "GET",
      }),
    }),
    getsingleCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/new",
        method: "POST",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/category/update/${data._id}`,
        method: "PUT",
        body: data.formData,
      }),
    }),
  }),
});

export const {
  useGetallcategoryQuery,
  useGetsingleCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
