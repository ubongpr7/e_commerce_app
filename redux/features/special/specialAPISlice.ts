import { apiSlice } from "@/redux/services/apiSlice";
import type { Special } from "@/types/special";

export const specialsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSpecials: builder.query<Special[], void>({
            query: () => "/specials",
        }),

        getSpecial: builder.query<Special, string>({
            query: (id) => `/specials/${id}`,
        }),

        getSpecialBySlug: builder.query<Special, string>({
            query: (slug) => `/specials/slug/${slug}`,
        }),

        createSpecial: builder.mutation<Special, Partial<Special>>({
            query: (special) => ({
                url: "/specials",
                method: "POST",
                body: special,
            }),
        }),

        updateSpecial: builder.mutation<Special, { id: string; special: Partial<Special> }>({
            query: ({ id, special }) => ({
                url: `/specials/${id}`,
                method: "PATCH",
                body: special,
            }),
        }),

        deleteSpecial: builder.mutation<void, string>({
            query: (id) => ({
                url: `/specials/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetSpecialsQuery,
    useGetSpecialQuery,
    useGetSpecialBySlugQuery,
    useCreateSpecialMutation,
    useUpdateSpecialMutation,
    useDeleteSpecialMutation,
} = specialsApi;
