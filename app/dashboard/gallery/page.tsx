"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Loader2, Plus as PlusIcon, Pencil as PencilIcon, Trash2 as TrashIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useGetGalleryItemsQuery, useAddGalleryItemMutation, useUpdateGalleryItemMutation, useDeleteGalleryItemMutation } from "../../../lib/redux/services/galleryApi";
import { Card, CardContent } from "../../../components/ui/card";

export default function GalleryPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: galleryItems = [], isLoading } = useGetGalleryItemsQuery();
  const [addGalleryItem, { isLoading: isAdding }] = useAddGalleryItemMutation();
  const [updateGalleryItem, { isLoading: isUpdating }] = useUpdateGalleryItemMutation();
  const [deleteGalleryItem, { isLoading: isDeleting }] = useDeleteGalleryItemMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form); // Use the form directly to create FormData

      // Validate required fields
      const title = formData.get('title') as string;
      const image = formData.get('image') as File;

      if (!title?.trim()) {
        toast.error('Brand name is required');
        return;
      }

      if (!image || !(image instanceof File)) {
        toast.error('Brand logo is required');
        return;
      }

      formData.append('title', title.trim());
      formData.append('image', image);
      formData.append('status', 'active');

      // Clear any previous data
      const cleanFormData = new FormData();
      cleanFormData.append('title', title.trim());
      cleanFormData.append('image', image);

      await addGalleryItem(cleanFormData);
      toast.success('Gallery item added successfully');
      setIsAddDialogOpen(false);
      setImagePreview(null);
      form.reset();
    } catch (error) {
      console.error('Failed to add gallery item:', error);
      toast.error('Failed to add gallery item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedItem?.id) {
        toast.error('No item selected for update');
        return;
      }

      const form = e.currentTarget as HTMLFormElement & {
        title: HTMLInputElement;
        image: HTMLInputElement;
      };
      const formData = new FormData();

      formData.append('id', selectedItem.id);
      formData.append('title', form.title.value.trim());

      const imageFile = form.image.files?.[0];
      if (imageFile) {
        formData.append('image', imageFile);
      }

      formData.append('status', selectedItem.status || 'active');

      await updateGalleryItem(formData);
      toast.success('Gallery item updated successfully');
      setIsAddDialogOpen(false);
      setSelectedItem(null);
      setImagePreview(null);
      form.reset();
    } catch (error) {
      console.error('Failed to update gallery item:', error);
      toast.error('Failed to update gallery item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await deleteGalleryItem(id);
        toast.success('Gallery item deleted successfully');
      } catch (error) {
        console.error('Failed to delete gallery item:', error);
        toast.error('Failed to delete gallery item');
      }
    }
  };

  const resetImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedItem ? 'Edit Image' : 'Add New Image'}</DialogTitle>
              <DialogDescription>
                {selectedItem ? 'Update image details below.' : 'Add a new image to showcase on your website.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={selectedItem ? handleUpdate : handleAdd} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Image Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter image title"
                    defaultValue={selectedItem?.title}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="flex flex-col items-center gap-4">
                    {imagePreview ? (
                      <div className="relative w-60 h-60 rounded-lg overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="New preview"
                          fill
                          className="object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={resetImage}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : selectedItem?.image ? (
                      <div className="relative w-60 h-60 rounded-lg overflow-hidden">
                        <Image
                          src={selectedItem.image}
                          alt="Current image"
                          fill
                          className="object-contain"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Replace Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-60 h-60 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                        <p className="text-sm text-gray-500">Click to upload image</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      required={!selectedItem}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isAdding || isUpdating || isSubmitting}
                  className="inline-flex items-center gap-2"
                >
                  {(isAdding || isUpdating) && <Loader2 className="h-4 w-4 animate-spin" />}
                  {selectedItem ? 'Save Changes' : 'Add Image'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : galleryItems.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <ImageIcon className="h-8 w-8 text-gray-400" />
              <h3 className="font-semibold text-lg">No images added yet</h3>
              <p className="text-sm text-gray-500">Add your first image to showcase on your website.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold text-center">{item.title}</h3>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-2"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsAddDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="inline-flex items-center gap-2"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedItem?.title}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedItem && handleDelete(selectedItem.id)}
              disabled={isDeleting}
              className="inline-flex items-center gap-2"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}