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
      query: (data = {}) => {
        const minPrice = data.price?.min ?? '';
        const maxPrice = data.price?.max ?? '';
    
        const params = new URLSearchParams();
    
        if (minPrice !== '') params.append('minPrice', minPrice);
        if (maxPrice !== '') params.append('maxPrice', maxPrice);
        if (data.page) params.append('page', data.page);
        if (data.category) params.append('category', data.category);
        if (data.limit !== undefined) params.append('limit', data.limit); 
        
        return {
          url: `/product/all?${params.toString()}`,
          method: "GET",
        };
      },
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
