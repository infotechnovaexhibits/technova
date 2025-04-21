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
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type GalleryItem = {
  id: string;
  order: number;
  title: string;
  description: string;
  image: string;
  category: string;
  status: "active" | "inactive";
};

const initialGallery: GalleryItem[] = [
  {
    id: "1",
    order: 1,
    title: "Exhibition Design",
    description: "Modern exhibition stand design",
    image: "/gallery/exhibition1.jpg",
    category: "Exhibition",
    status: "active",
  },
  {
    id: "2",
    order: 2,
    title: "Event Setup",
    description: "Corporate event setup",
    image: "/gallery/event1.jpg",
    category: "Event",
    status: "active",
  },
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<GalleryItem["status"] | "all">("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredGallery = gallery
    .filter((item) => filter === "all" ? true : item.status === filter)
    .sort((a, b) => a.order - b.order);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const maxOrder = Math.max(...gallery.map(t => t.order), 0);
      const newItem: GalleryItem = {
        id: Math.random().toString(36).substr(2, 9),
        order: maxOrder + 1,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string,
        category: formData.get("category") as string,
        status: "active",
      };
      setGallery([...gallery, newItem]);
      setIsAddDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (formData: FormData) => {
    if (!selectedItem) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const updatedItem: GalleryItem = {
        ...selectedItem,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string,
        category: formData.get("category") as string,
        status: formData.get("status") as GalleryItem["status"],
      };
      setGallery(
        gallery.map((item) =>
          item.id === selectedItem.id ? updatedItem : item
        )
      );
      setIsEditDialogOpen(false);
    } finally {
      setIsLoading(false);
      setSelectedItem(null);
    }
  };

  const GalleryForm = ({ item, onSubmit }: { 
    item?: GalleryItem; 
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
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={item?.title}
            placeholder="Enter title" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            defaultValue={item?.description}
            placeholder="Enter description"
            className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={item?.category}
            placeholder="Enter category"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Image</Label>
          <div className="flex items-center gap-4">
            {item?.image && (
              <div className="relative w-20 h-20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="flex-1"
              required={!item}
            />
          </div>
        </div>
        {item && (
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={item.status}>
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
            item ? 'Save Changes' : 'Add Item'
          )}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Gallery Management
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
                Add Gallery Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Gallery Item</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new gallery item.
                </DialogDescription>
              </DialogHeader>
              <GalleryForm onSubmit={handleAdd} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGallery.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">{item.category}</span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    item.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 border-t pt-4">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditDialogOpen(true);
                      }}
                      className="flex-1"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Gallery Item</DialogTitle>
                      <DialogDescription>
                        Update the gallery item details below.
                      </DialogDescription>
                    </DialogHeader>
                    <GalleryForm 
                      item={item} 
                      onSubmit={handleEdit} 
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}