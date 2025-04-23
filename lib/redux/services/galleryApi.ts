import { api, ApiResponse } from './api';

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface AddGalleryItemRequest {
  title: string;
  image: File;
}

export interface UpdateGalleryItemRequest {
  id: string;
  title?: string;
  image?: File;
}

export const galleryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryItems: builder.query<GalleryItem[], void>({
      query: () => 'routes/portfolio',
      transformResponse: (response: ApiResponse<GalleryItem[]>) => response.data,
      providesTags: ['Gallery']
    }),
    
    getGalleryItem: builder.query<GalleryItem, string>({
      query: (id) => `routes/portfolio/${id}`,
      transformResponse: (response: ApiResponse<GalleryItem>) => response.data,
      providesTags: ['Gallery']
    }),
    
    addGalleryItem: builder.mutation<GalleryItem, FormData>({
      query: (formData) => ({
        url: 'routes/portfolio',
        method: 'POST',
        body: formData,
        formData: true
      }),
      transformResponse: (response: ApiResponse<GalleryItem>) => response.data,
      invalidatesTags: ['Gallery']
    }),
    
    updateGalleryItem: builder.mutation<GalleryItem, FormData>({
      query: (formData) => {
        const id = formData.get('id');
        return {
          url: `routes/portfolio/${id}`,
          method: 'PUT',
          body: formData,
          formData: true
        };
      },
      transformResponse: (response: ApiResponse<GalleryItem>) => response.data,
      invalidatesTags: ['Gallery']
    }),
    
    deleteGalleryItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/portfolio/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Gallery']
    }),
  }),
});

export const {
  useGetGalleryItemsQuery,
  useGetGalleryItemQuery,
  useAddGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} = galleryApi; 