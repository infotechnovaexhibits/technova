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
import { useGetServicesQuery, useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } from '../../../lib/redux/services/servicesApi';
import type { Service } from '../../../lib/redux/services/servicesApi';
import { Textarea } from "../../../components/ui/textarea";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useGetServicesQuery();
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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
        shortDescription: HTMLTextAreaElement;
        longDescription: HTMLTextAreaElement;
        image: HTMLInputElement;
      };

      const title = form.title.value;
      const shortDescription = form.shortDescription.value;
      const longDescription = form.longDescription.value;
      const imageFile = form.image.files?.[0];

      if (!title?.trim()) {
        toast.error('Service title is required');
        return;
      }

      if (!shortDescription?.trim()) {
        toast.error('Short description is required');
        return;
      }

      if (!longDescription?.trim()) {
        toast.error('Long description is required');
        return;
      }

      if (!imageFile) {
        toast.error('Service image is required');
        return;
      }

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('shortDescription', shortDescription.trim());
      formData.append('longDescription', longDescription.trim());
      formData.append('image', imageFile);

      await addService(formData);
      toast.success('Service added successfully');
      setIsAddDialogOpen(false);
      setImagePreview(null);
      form.reset();
    } catch (error) {
      console.error('Failed to add service:', error);
      toast.error('Failed to add service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedService?.id) {
        toast.error('No service selected for update');
        return;
      }

      const form = e.currentTarget as HTMLFormElement & {
        title: HTMLInputElement;
        shortDescription: HTMLTextAreaElement;
        longDescription: HTMLTextAreaElement;
        image: HTMLInputElement;
      };

      const formData = new FormData();
      formData.append('id', selectedService.id);
      formData.append('title', form.title.value.trim());
      formData.append('shortDescription', form.shortDescription.value.trim());
      formData.append('longDescription', form.longDescription.value.trim());

      const imageFile = form.image.files?.[0];
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await updateService(formData);
      toast.success('Service updated successfully');
      setIsAddDialogOpen(false);
      setSelectedService(null);
      setImagePreview(null);
      form.reset();
    } catch (error) {
      console.error('Failed to update service:', error);
      toast.error('Failed to update service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      toast.success('Service deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedService(null);
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="p-0 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] grid grid-rows-[auto,1fr,auto]">
            <DialogHeader>
              <DialogTitle>{selectedService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                {selectedService ? 'Update service details below.' : 'Add a new service to showcase on your website.'}
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto pr-2">
              <form id="service-form" onSubmit={selectedService ? handleUpdate : handleAdd} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Service Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter service title"
                        defaultValue={selectedService?.title}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="shortDescription">Short Description</Label>
                      <Textarea
                        id="shortDescription"
                        name="shortDescription"
                        placeholder="Enter a brief description"
                        defaultValue={selectedService?.shortDescription}
                        required
                        className="h-20 resize-none"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="longDescription">Long Description</Label>
                      <Textarea
                        id="longDescription"
                        name="longDescription"
                        placeholder="Enter detailed description"
                        defaultValue={selectedService?.longDescription}
                        required
                        className="h-[280px] resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="image">Service Image</Label>
                      <div className="flex flex-col items-center gap-4">
                        {imagePreview ? (
                          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                            <Image
                              src={imagePreview}
                              alt="New preview"
                              fill
                              className="object-cover rounded-lg"
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
                        ) : selectedService?.image ? (
                          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                            <Image
                              src={selectedService.image}
                              alt="Current image"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
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
                            className="w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition-colors"
                            style={{ aspectRatio: '16/9' }}
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
                          required={!selectedService}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <DialogFooter className="mt-6">
              <Button 
                type="submit" 
                form="service-form"
                disabled={isAdding || isUpdating || isSubmitting}
                className="inline-flex items-center gap-2"
              >
                {(isAdding || isUpdating) && <Loader2 className="h-4 w-4 animate-spin" />}
                {selectedService ? 'Save Changes' : 'Add Service'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <ImageIcon className="h-8 w-8 text-gray-400" />
              <h3 className="font-semibold text-lg">No services added yet</h3>
              <p className="text-sm text-gray-500">Add your first service to showcase on your website.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{service.shortDescription}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-2"
                        onClick={() => {
                          setSelectedService(service);
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
                          setSelectedService(service);
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
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedService?.title}? This action cannot be undone.
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
              onClick={() => selectedService && handleDelete(selectedService.id)}
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