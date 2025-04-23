"use client";

import { useState } from "react";
import { useGetTestimonialsQuery, useUpdateTestimonialMutation, useDeleteTestimonialMutation, useAddTestimonialMutation } from '../../../lib/redux/services/testimonialsApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { PencilIcon, TrashIcon, StarIcon, PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
  createdOn?: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const formatFirestoreTimestamp = (timestamp: { _seconds: number; _nanoseconds: number }) => {
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function TestimonialsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [editingTestimonial, setEditingTestimonial] = useState<{ id: string; isOpen: boolean; data: Testimonial | null; rating: number }>({
    id: '',
    isOpen: false,
    data: null,
    rating: 0
  });

  // RTK Query hooks
  const { data: testimonials = [], isLoading, error } = useGetTestimonialsQuery();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial, { isLoading: isDeleting }] = useDeleteTestimonialMutation();
  const [addTestimonial, { isLoading: isAdding }] = useAddTestimonialMutation();

  const handleUpdate = async (formData: FormData) => {
    if (!editingTestimonial.data) return;
    
    try {
      const updatedTestimonial = {
        id: editingTestimonial.data.id,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        rating: Number(formData.get("rating")),
        message: formData.get("message") as string,
        status: formData.get("status") as "pending" | "approved",
      };
      
      await updateTestimonial(updatedTestimonial).unwrap();
      setEditingTestimonial({ id: '', isOpen: false, data: null, rating: 0 });
      toast.success('Testimonial updated successfully');
    } catch (error) {
      toast.error('Failed to update testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id).unwrap();
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleAdd = async (formData: FormData) => {
    try {
      const newTestimonial = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        rating: Number(formData.get("rating")),
        status: "pending" as const
      };
      
      await addTestimonial(newTestimonial);
      setIsAddDialogOpen(false);
      toast.success('Testimonial added successfully');
    } catch (error) {
      toast.error('Failed to add testimonial');
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading testimonials</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Testimonials Management
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Add a new testimonial from your client.
              </DialogDescription>
            </DialogHeader>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await handleAdd(formData);
              }} 
              className="space-y-4"
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Client name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="client@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <input type="hidden" name="rating" value={newRating} />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewRating(rating)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                      >
                        <StarIcon
                          className={`h-6 w-6 ${
                            rating <= newRating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({newRating} Star{newRating !== 1 ? 's' : ''})
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Client's testimonial message"
                    className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Add Testimonial'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : testimonials.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <StarIcon className="h-12 w-12 text-gray-200" />
                    <div className="text-lg font-medium text-gray-900">No testimonials yet</div>
                    <p className="text-sm text-gray-500">Testimonials from your clients will appear here.</p>
                  </div>
                </td>
              </tr>
            ) : testimonials.map((testimonial: Testimonial) => (
              <tr key={testimonial.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{testimonial.name}</td>
                <td className="px-6 py-4">{testimonial.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-4 w-4 ${
                            index < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({testimonial.rating}/5)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{testimonial.message}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    testimonial.status === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : testimonial.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {testimonial.createdOn ? 
                    formatFirestoreTimestamp(testimonial.createdOn)
                    : testimonial.createdAt ? 
                      new Date(testimonial.createdAt).toLocaleDateString()
                      : 'No date'
                  }
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Dialog 
                      open={editingTestimonial.id === testimonial.id && editingTestimonial.isOpen} 
                      onOpenChange={(open) => {
                        if (!open) {
                          setEditingTestimonial({ id: '', isOpen: false, data: null, rating: 0 });
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingTestimonial({
                              id: testimonial.id,
                              isOpen: true,
                              data: testimonial,
                              rating: testimonial.rating
                            });
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          <PencilIcon className="h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      {editingTestimonial.data && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Testimonial</DialogTitle>
                            <DialogDescription>
                              Update the testimonial details below.
                            </DialogDescription>
                          </DialogHeader>
                          <form 
                            onSubmit={async (e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              await handleUpdate(formData);
                            }} 
                            className="space-y-4"
                          >
                            <div className="grid gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  defaultValue={editingTestimonial.data?.name}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  defaultValue={editingTestimonial.data?.email}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <input 
                                  type="hidden" 
                                  name="rating" 
                                  value={editingTestimonial.rating || editingTestimonial.data?.rating || 5} 
                                />
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                      key={rating}
                                      type="button"
                                      onClick={() => setEditingTestimonial({
                                        ...editingTestimonial,
                                        rating: rating
                                      })}
                                      className="p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                                    >
                                      <StarIcon
                                        className={`h-6 w-6 ${
                                          rating <= (editingTestimonial.rating || editingTestimonial.data?.rating || 5)
                                            ? "text-yellow-400"
                                            : "text-gray-200"
                                        }`}
                                      />
                                    </button>
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600">
                                    ({editingTestimonial.rating || editingTestimonial.data?.rating || 5} Star
                                    {(editingTestimonial.rating || editingTestimonial.data?.rating || 5) !== 1 ? 's' : ''})
                                  </span>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                  id="message"
                                  name="message"
                                  defaultValue={editingTestimonial.data?.message}
                                  className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                  name="status" 
                                  defaultValue={editingTestimonial.data?.status}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                type="submit" 
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                  </>
                                ) : (
                                  'Save Changes'
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      )}
                    </Dialog>
                    <Dialog open={isDeleteDialogOpen && deletingId === testimonial.id} onOpenChange={(open) => {
                      setIsDeleteDialogOpen(open);
                      if (!open) setDeletingId(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeletingId(testimonial.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Testimonial</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this testimonial? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2 sm:gap-0">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsDeleteDialogOpen(false);
                              setDeletingId(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(testimonial.id)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              'Delete'
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
