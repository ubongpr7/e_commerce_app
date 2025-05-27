import { apiSlice } from "@/redux/services/apiSlice";
import type { Service } from "@/types/service";

export const servicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => "/services",
    }),

    getService: builder.query<Service, string>({
      query: (id) => `/services/${id}`,
    }),

    getServiceBySlug: builder.query<Service, string>({
      query: (slug) => `/services/slug/${slug}`,
    }),

    createService: builder.mutation<Service, Partial<Service>>({
      query: (service) => ({
        url: "/services",
        method: "POST",
        body: service,
      }),
    }),

    updateService: builder.mutation<Service, { id: string; service: Partial<Service> }>({
      query: ({ id, service }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: service,
      }),
    }),

    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useGetServiceBySlugQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
