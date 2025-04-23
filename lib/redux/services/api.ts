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

const enhancedBaseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  prepareHeaders: (headers, { endpoint, type }) => {
    // Only skip Content-Type for mutations that handle file uploads
    if (type === 'mutation' && endpoint?.match(/(add|update)Brand/)) {
      // Let browser set multipart/form-data for file uploads
      return headers;
    }

    if (type === 'mutation' && endpoint?.match(/(add|update)Gallery/)) {
      // Let browser set multipart/form-data for file uploads
      return headers;
    }

    if (type === 'mutation' && endpoint?.match(/(add|update)Service/)) {
      // Let browser set multipart/form-data for file uploads
      return headers;
    }
    
    // For all other requests, use application/json
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: enhancedBaseQuery,
  tagTypes: ['Leads', 'Testimonials', 'Services', 'Brands', 'Gallery', 'Count'],
  endpoints: () => ({}),
}); 