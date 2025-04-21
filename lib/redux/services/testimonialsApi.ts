import { api, ApiResponse } from './api';

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export const testimonialsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query<Testimonial[], void>({
      query: () => 'routes/testimonials',
      transformResponse: (response: ApiResponse<Testimonial[]>) => response.data,
      providesTags: ['Testimonials']
    }),
    
    getTestimonial: builder.query<Testimonial, string>({
      query: (id) => `routes/testimonials/${id}`,
      transformResponse: (response: ApiResponse<Testimonial>) => response.data,
      providesTags: ['Testimonials']
    }),
    
    addTestimonial: builder.mutation<Testimonial, Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (testimonial) => ({
        url: 'routes/testimonials',
        method: 'POST',
        body: testimonial,
      }),
      transformResponse: (response: ApiResponse<Testimonial>) => response.data,
      invalidatesTags: ['Testimonials']
    }),
    
    updateTestimonial: builder.mutation<Testimonial, Partial<Testimonial> & { id: string }>({
      query: ({ id, ...testimonial }) => ({
        url: `routes/testimonials/${id}`,
        method: 'PUT',
        body: testimonial,
      }),
      transformResponse: (response: ApiResponse<Testimonial>) => response.data,
      invalidatesTags: ['Testimonials']
    }),
    
    deleteTestimonial: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonials']
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetTestimonialQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi; 