import { api, ApiResponse } from './api';

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface AddServiceRequest {
  title: string;
  shortDescription: string;
  longDescription: string;
  image: File;
}

export interface UpdateServiceRequest {
  id: string;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  image?: File;
}

export const servicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => 'routes/services',
      transformResponse: (response: ApiResponse<Service[]>) => response.data,
      providesTags: ['Services']
    }),

    getService: builder.query<Service, string>({
      query: (id) => `routes/services/${id}`,
      transformResponse: (response: ApiResponse<Service>) => response.data,
      providesTags: ['Services']
    }),
    
    addService: builder.mutation<Service, FormData>({
      query: (formData) => ({
        url: 'routes/services',
        method: 'POST',
        body: formData,
        formData: true
      }),
      transformResponse: (response: ApiResponse<Service>) => response.data,
      invalidatesTags: ['Services']
    }),
    
    updateService: builder.mutation<Service, FormData>({
      query: (formData) => {
        const id = formData.get('id');
        return {
          url: `routes/services/${id}`,
          method: 'PUT',
          body: formData,
          formData: true
        };
      },
      transformResponse: (response: ApiResponse<Service>) => response.data,
      invalidatesTags: ['Services']
    }),
    
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/services/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Services']
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi; 