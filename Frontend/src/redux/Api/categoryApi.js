import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    mode: "cors",
  }),
  tagTypes:["Category"],
  endpoints: (builder) => ({
    getallcategory: builder.query({
      query: () => ({
        url: "/category/all",
        methid: "GET",
        providesTags: ["Category"]
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
      invalidatesTags: ["Category"]
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/category/update/${data._id}`,
        method: "PUT",
        body: data.formData,
      }),
      invalidatesTags: ["Category"]
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
