"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../components/ui/dialog";
import { PlusIcon, PencilIcon, TrashIcon, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useGetBrandsQuery, useAddBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } from '../../../lib/redux/services/brandsApi';
import type { Brand } from '../../../lib/redux/services/brandsApi';

export default function BrandsPage() {
  const { data: brands = [], isLoading } = useGetBrandsQuery();
  const [addBrand, { isLoading: isAdding }] = useAddBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const resetImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget as HTMLFormElement & {
        title: HTMLInputElement;
        image: HTMLInputElement;
      };

      const title = form.title.value;
      const imageFile = form.image.files?.[0];

      if (!title?.trim()) {
        toast.error('Brand name is required');
        return;
      }

      if (!imageFile) {
        toast.error('Brand logo is required');
        return;
      }

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('image', imageFile);
      formData.append('status', 'active');

      await addBrand(formData);
      toast.success('Brand added successfully');
      setIsAddDialogOpen(false);
      setImagePreview(null);
      form.reset();
    } catch (error) {
      console.error('Failed to add brand:', error);
      toast.error('Failed to add brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedBrand?.id) {
        toast.error('No brand selected for update');
        return;
      }

      const form = e.currentTarget as HTMLFormElement & {
        title: HTMLInputElement;
        image: HTMLInputElement;
      };
      const formData = new FormData();

      formData.append('id', selectedBrand.id);
      formData.append('title', form.title.value.trim());

      const imageFile = form.image.files?.[0];
      if (imageFile) {
        formData.append('image', imageFile);
      }

      formData.append('status', 'active');

      await updateBrand(formData);
      toast.success('Brand updated successfully');
      setIsAddDialogOpen(false);
      setSelectedBrand(null);
      setImagePreview(null);
      form.reset();
    } catch (error) {
      console.error('Failed to update brand:', error);
      toast.error('Failed to update brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id);
      toast.success('Brand deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedBrand(null);
    } catch (error) {
      toast.error('Failed to delete brand');
    }
  };

  return (
    <div className="p-0 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Trusted Brands</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
              <DialogDescription>
                {selectedBrand ? 'Update brand details below.' : 'Add a new trusted brand to showcase on your website.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={selectedBrand ? handleUpdate : handleAdd} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Brand Name</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter brand name"
                    defaultValue={selectedBrand?.title}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Brand Logo</Label>
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
                    ) : selectedBrand?.image ? (
                      <div className="relative w-60 h-60 rounded-lg overflow-hidden">
                        <Image
                          src={selectedBrand.image}
                          alt="Current logo"
                          fill
                          className="object-contain"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Replace Logo
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-60 h-60 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                        <p className="text-sm text-gray-500">Click to upload logo</p>
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
                      required={!selectedBrand}
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
                  {selectedBrand ? 'Save Changes' : 'Add Brand'}
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
      ) : brands.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <ImageIcon className="h-8 w-8 text-gray-400" />
              <h3 className="font-semibold text-lg">No brands added yet</h3>
              <p className="text-sm text-gray-500">Add your first trusted brand to showcase on your website.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative w-full bg-white" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={brand.image}
                      alt={brand.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold text-center">{brand.title}</h3>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-2"
                        onClick={() => {
                          setSelectedBrand(brand);
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
                          setSelectedBrand(brand);
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
            <DialogTitle>Delete Brand</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedBrand?.title}? This action cannot be undone.
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
              onClick={() => selectedBrand && handleDelete(selectedBrand.id)}
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