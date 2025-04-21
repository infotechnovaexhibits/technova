import { api, ApiResponse } from './api';

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddBrandRequest {
  name: string;
  logo: File;
  website?: string;
  description?: string;
}

export interface UpdateBrandRequest {
  id: string;
  name?: string;
  logo?: File;
  website?: string;
  description?: string;
}

export const brandsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => 'routes/brands',
      transformResponse: (response: ApiResponse<Brand[]>) => response.data,
      providesTags: ['Brands']
    }),
    
    getBrand: builder.query<Brand, string>({
      query: (id) => `routes/brands/${id}`,
      transformResponse: (response: ApiResponse<Brand>) => response.data,
      providesTags: ['Brands']
    }),
    
    addBrand: builder.mutation<Brand, AddBrandRequest>({
      query: (brand) => {
        const formData = new FormData();
        formData.append('name', brand.name);
        formData.append('logo', brand.logo);
        if (brand.website) formData.append('website', brand.website);
        if (brand.description) formData.append('description', brand.description);

        return {
          url: 'routes/brands',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: ApiResponse<Brand>) => response.data,
      invalidatesTags: ['Brands']
    }),
    
    updateBrand: builder.mutation<Brand, UpdateBrandRequest>({
      query: ({ id, ...brand }) => {
        const formData = new FormData();
        if (brand.name) formData.append('name', brand.name);
        if (brand.logo) formData.append('logo', brand.logo);
        if (brand.website) formData.append('website', brand.website);
        if (brand.description) formData.append('description', brand.description);

        return {
          url: `routes/brands/${id}`,
          method: 'PUT',
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: ApiResponse<Brand>) => response.data,
      invalidatesTags: ['Brands']
    }),
    
    deleteBrand: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/brands/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brands']
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi; 