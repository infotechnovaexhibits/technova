import { api, ApiResponse } from './api';

export interface Service {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  features: string[];
  price?: number;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddServiceRequest {
  title: string;
  description: string;
  icon: File;
  features: string[];
  price?: number;
  duration?: string;
}

export interface UpdateServiceRequest {
  id: string;
  title?: string;
  description?: string;
  icon?: File;
  features?: string[];
  price?: number;
  duration?: string;
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
    
    addService: builder.mutation<Service, AddServiceRequest>({
      query: (service) => {
        const formData = new FormData();
        formData.append('title', service.title);
        formData.append('description', service.description);
        formData.append('icon', service.icon);
        formData.append('features', JSON.stringify(service.features));
        if (service.price) formData.append('price', service.price.toString());
        if (service.duration) formData.append('duration', service.duration);

        return {
          url: 'routes/services',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: ApiResponse<Service>) => response.data,
      invalidatesTags: ['Services']
    }),
    
    updateService: builder.mutation<Service, UpdateServiceRequest>({
      query: ({ id, ...service }) => {
        const formData = new FormData();
        if (service.title) formData.append('title', service.title);
        if (service.description) formData.append('description', service.description);
        if (service.icon) formData.append('icon', service.icon);
        if (service.features) formData.append('features', JSON.stringify(service.features));
        if (service.price) formData.append('price', service.price.toString());
        if (service.duration) formData.append('duration', service.duration);

        return {
          url: `routes/services/${id}`,
          method: 'PUT',
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: ApiResponse<Service>) => response.data,
      invalidatesTags: ['Services']
    }),
    
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/services/${id}`,
        method: 'DELETE',
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