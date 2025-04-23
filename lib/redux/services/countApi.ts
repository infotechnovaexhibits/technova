import { api, ApiResponse } from "./api";

export interface DashboardCounts {
    services: number;
    gallery: number;
    brands: number;
    testimonials: number;
    leads: number;
}

export const countApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardCounts: builder.query<DashboardCounts, void>({
            query: () => 'routes/count',
            transformResponse: (response: ApiResponse<DashboardCounts>) => response.data,
            providesTags: ['Count']
        }),
    }),
});

export const {
    useGetDashboardCountsQuery,
} = countApi;