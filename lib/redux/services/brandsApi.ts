import { api, ApiResponse } from './api';

export interface Brand {
  id: string;
  title: string;
  image: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface AddBrandRequest {
  title: string;
  image: File;
}

export interface UpdateBrandRequest {
  id: string;
  title?: string;
  image?: File;
}

export const brandsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => 'routes/brands',
      transformResponse: (response: ApiResponse<Brand[]>) => response.data,
      providesTags: ['Brands']
    }),

    getActiveBrands: builder.query<Brand[], void>({
      query: () => 'routes/brands',
      transformResponse: (response: ApiResponse<Brand[]>) => response.data,
      providesTags: ['Brands']
    }),
    
    getBrand: builder.query<Brand, string>({
      query: (id) => `routes/brands/${id}`,
      transformResponse: (response: ApiResponse<Brand>) => response.data,
      providesTags: ['Brands']
    }),
    
    addBrand: builder.mutation<Brand, FormData>({
      query: (formData) => ({
        url: 'routes/brands',
        method: 'POST',
        body: formData,
        formData: true
      }),
      transformResponse: (response: ApiResponse<Brand>) => response.data,
      invalidatesTags: ['Brands']
    }),
    
    updateBrand: builder.mutation<Brand, FormData>({
      query: (formData) => {
        const id = formData.get('id');
        return {
          url: `routes/brands/${id}`,
          method: 'PUT',
          body: formData,
          formData: true
        };
      },
      transformResponse: (response: ApiResponse<Brand>) => response.data,
      invalidatesTags: ['Brands']
    }),
    
    deleteBrand: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/brands/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Brands']
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetActiveBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi; 