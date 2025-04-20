import { apiSlice } from "@/redux/services/apiSlice";
import type { Product } from "@/types/product"

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/slug/${slug}`,
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),

    updateProduct: builder.mutation<Product, { id: string; product: Partial<Product> }>({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: product,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi
