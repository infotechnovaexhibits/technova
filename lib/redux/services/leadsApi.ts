import { api, ApiResponse } from './api';
import type { ApiResponse as ApiResponseType, ApiError } from './api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted";
  createdAt: string;
  updatedAt: string;
}

const transformErrorResponse = (error: FetchBaseQueryError) => {
  return error.data as ApiError;
};

export const leadsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], void>({
      query: () => 'routes/leads',
      transformResponse: (response: ApiResponse<Lead[]>) => response.data,
      providesTags: ['Leads']
    }),
    
    getLead: builder.query<Lead, string>({
      query: (id) => `routes/leads/${id}`,
      transformResponse: (response: ApiResponse<Lead>) => response.data,
      providesTags: ['Leads']
    }),
    
    addLead: builder.mutation<Lead, Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (lead) => ({
        url: 'routes/leads',
        method: 'POST',
        body: lead,
      }),
      transformResponse: (response: ApiResponse<Lead>) => response.data,
      invalidatesTags: ['Leads']
    }),
    
    updateLead: builder.mutation<Lead, Partial<Lead> & { id: string }>({
      query: ({ id, ...lead }) => ({
        url: `routes/leads/${id}`,
        method: 'PUT',
        body: lead,
      }),
      transformResponse: (response: ApiResponse<Lead>) => response.data,
      invalidatesTags: ['Leads']
    }),
    
    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/leads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Leads']
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadQuery,
  useAddLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApi;