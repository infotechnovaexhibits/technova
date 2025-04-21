"use client";

import { useState } from "react";
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
import { PlusIcon, PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid";

type Testimonial = {
  id: string;
  order: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  status: "active" | "inactive";
};

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    order: 1,
    name: "Jane Smith",
    email: "jane@techcorp.com",
    message: "Fantastic service, exceeded expectations!",
    rating: 5,
    status: "active",
  },
  {
    id: "2",
    order: 2,
    name: "Bob Johnson",
    email: "bob@innovate.co",
    message: "Great team, very professional.",
    rating: 4,
    status: "active",
  },
  {
    id: "3",
    order: 3,
    name: "Alice Brown",
    email: "alice@solutions.net",
    message: "Good value for the price.",
    rating: 4,
    status: "inactive",
  },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [filter, setFilter] = useState<Testimonial["status"] | "all">("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredTestimonials = testimonials
    .filter((testimonial) => filter === "all" ? true : testimonial.status === filter)
    .sort((a, b) => a.order - b.order);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const maxOrder = Math.max(...testimonials.map(t => t.order), 0);
      const newTestimonial: Testimonial = {
        id: Math.random().toString(36).substr(2, 9),
        order: maxOrder + 1,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        rating: Number(formData.get("rating")),
        status: "active",
      };
      setTestimonials([...testimonials, newTestimonial]);
      setIsAddDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (formData: FormData) => {
    if (!selectedTestimonial) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const updatedTestimonial: Testimonial = {
        ...selectedTestimonial,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        rating: Number(formData.get("rating")),
        status: formData.get("status") as Testimonial["status"],
      };
      setTestimonials(
        testimonials.map((t) =>
          t.id === selectedTestimonial.id ? updatedTestimonial : t
        )
      );
      setIsEditDialogOpen(false);
    } finally {
      setIsLoading(false);
      setSelectedTestimonial(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedTestimonial) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setTestimonials(testimonials.filter((t) => t.id !== selectedTestimonial.id));
      setIsDeleteDialogOpen(false);
    } finally {
      setIsLoading(false);
      setSelectedTestimonial(null);
    }
  };

  const TestimonialForm = ({ testimonial, onSubmit }: { 
    testimonial?: Testimonial; 
    onSubmit: (formData: FormData) => Promise<void> | void 
  }) => (
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await onSubmit(formData);
      }} 
      className="space-y-4"
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={testimonial?.name}
            placeholder="Enter name" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={testimonial?.email}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            defaultValue={testimonial?.message}
            placeholder="Enter testimonial message"
            className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue={testimonial?.rating || 5}
            required
          />
        </div>
        {testimonial && (
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={testimonial.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            testimonial ? 'Save Changes' : 'Add Testimonial'
          )}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Testimonials
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-500 w-full sm:w-auto">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Testimonial</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new testimonial.
                </DialogDescription>
              </DialogHeader>
              <TestimonialForm onSubmit={handleAdd} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTestimonials.map((testimonial) => (
              <tr key={testimonial.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{testimonial.name}</td>
                <td className="px-6 py-4">{testimonial.email}</td>
                <td className="px-6 py-4 max-w-xs truncate">{testimonial.message}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      testimonial.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {testimonial.status.charAt(0).toUpperCase() +
                      testimonial.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsEditDialogOpen(true);
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          <PencilIcon className="h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Testimonial</DialogTitle>
                          <DialogDescription>
                            Update the testimonial details below.
                          </DialogDescription>
                        </DialogHeader>
                        <TestimonialForm 
                          testimonial={testimonial} 
                          onSubmit={handleEdit} 
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white relative"
                          >
                            {isLoading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                <span>Deleting...</span>
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
