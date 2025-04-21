import { api, ApiResponse } from './api';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AddGalleryItemRequest {
  title: string;
  description?: string;
  image: File;
  category: string;
  tags?: string[];
}

export interface UpdateGalleryItemRequest {
  id: string;
  title?: string;
  description?: string;
  image?: File;
  category?: string;
  tags?: string[];
}

export const galleryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryItems: builder.query<GalleryItem[], void>({
      query: () => 'routes/gallery',
      transformResponse: (response: ApiResponse<GalleryItem[]>) => response.data,
      providesTags: ['Gallery']
    }),
    
    getGalleryItem: builder.query<GalleryItem, string>({
      query: (id) => `routes/gallery/${id}`,
      transformResponse: (response: ApiResponse<GalleryItem>) => response.data,
      providesTags: ['Gallery']
    }),
    
    addGalleryItem: builder.mutation<GalleryItem, AddGalleryItemRequest>({
      query: (item) => {
        const formData = new FormData();
        formData.append('title', item.title);
        if (item.description) formData.append('description', item.description);
        formData.append('image', item.image);
        formData.append('category', item.category);
        if (item.tags) {
          formData.append('tags', JSON.stringify(item.tags));
        }

        return {
          url: 'routes/gallery',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: ApiResponse<GalleryItem>) => response.data,
      invalidatesTags: ['Gallery']
    }),
    
    updateGalleryItem: builder.mutation<GalleryItem, UpdateGalleryItemRequest>({
      query: ({ id, ...item }) => {
        const formData = new FormData();
        if (item.title) formData.append('title', item.title);
        if (item.description) formData.append('description', item.description);
        if (item.image) formData.append('image', item.image);
        if (item.category) formData.append('category', item.category);
        if (item.tags) formData.append('tags', JSON.stringify(item.tags));

        return {
          url: `routes/gallery/${id}`,
          method: 'PUT',
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: ApiResponse<GalleryItem>) => response.data,
      invalidatesTags: ['Gallery']
    }),
    
    deleteGalleryItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `routes/gallery/${id}`,
        method: 'DELETE',
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