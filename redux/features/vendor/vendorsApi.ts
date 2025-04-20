import { apiSlice } from "@/redux/services/apiSlice"

interface Vendor {
  id: string
  name: string
  slug: string
  logo: string
  coverImage: string
  description: string
  productCount: number
  rating: number
  address?: string
  phone?: string
  email?: string
  website?: string
  joinedDate?: string
  reviewCount?: number
}

export const vendorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<Vendor[], void>({
      query: () => "/vendors",
    }),

    getVendor: builder.query<Vendor, string>({
      query: (id) => `/vendors/${id}`,
    }),

    getVendorBySlug: builder.query<Vendor, string>({
      query: (slug) => `/vendors/slug/${slug}`,
    }),

    createVendor: builder.mutation<Vendor, Partial<Vendor>>({
      query: (vendor) => ({
        url: "/vendors",
        method: "POST",
        body: vendor,
      }),
    }),

    updateVendor: builder.mutation<Vendor, { id: string; vendor: Partial<Vendor> }>({
      query: ({ id, vendor }) => ({
        url: `/vendors/${id}`,
        method: "PATCH",
        body: vendor,
      }),
    }),
  }),
})

export const {
  useGetVendorsQuery,
  useGetVendorQuery,
  useGetVendorBySlugQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
} = vendorsApi
