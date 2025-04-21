import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data: T;
}

export interface ApiError {
  statusCode: number;
  errorCode: string;
  errorMessage: string;
}

const validateStatus = (response: Response) => {
  return response.status >= 200 && response.status < 300;
};

const enhancedBaseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: enhancedBaseQuery,
  tagTypes: ['Leads', 'Testimonials', 'Services', 'Brands', 'Gallery'],
  endpoints: () => ({}),
}); 