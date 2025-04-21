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
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type Brand = {
  id: string;
  order: number;
  name: string;
  logo: string;
  website?: string;
  status: "active" | "inactive";
};

const initialBrands: Brand[] = [
  {
    id: "1",
    order: 1,
    name: "TechCorp",
    logo: "/brands/brand1.png",
    website: "https://techcorp.com",
    status: "active",
  },
  {
    id: "2",
    order: 2,
    name: "InnovateLabs",
    logo: "/brands/brand2.png",
    website: "https://innovatelabs.com",
    status: "active",
  },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [filter, setFilter] = useState<Brand["status"] | "all">("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredBrands = brands
    .filter((brand) => filter === "all" ? true : brand.status === filter)
    .sort((a, b) => a.order - b.order);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const maxOrder = Math.max(...brands.map(b => b.order), 0);
      const newBrand: Brand = {
        id: Math.random().toString(36).substr(2, 9),
        order: maxOrder + 1,
        name: formData.get("name") as string,
        logo: formData.get("logo") as string,
        website: formData.get("website") as string,
        status: "active",
      };
      setBrands([...brands, newBrand]);
      setIsAddDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (formData: FormData) => {
    if (!selectedBrand) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const updatedBrand: Brand = {
        ...selectedBrand,
        name: formData.get("name") as string,
        logo: formData.get("logo") as string,
        website: formData.get("website") as string,
        status: formData.get("status") as Brand["status"],
      };
      setBrands(
        brands.map((brand) =>
          brand.id === selectedBrand.id ? updatedBrand : brand
        )
      );
      setIsEditDialogOpen(false);
    } finally {
      setIsLoading(false);
      setSelectedBrand(null);
    }
  };

  const BrandForm = ({ brand, onSubmit }: { 
    brand?: Brand; 
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
          <Label htmlFor="name">Brand Name</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={brand?.name}
            placeholder="Enter brand name" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            name="website"
            type="url"
            defaultValue={brand?.website}
            placeholder="https://example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="logo">Logo</Label>
          <div className="flex items-center gap-4">
            {brand?.logo && (
              <div className="relative w-20 h-20">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            )}
            <Input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              className="flex-1"
              required={!brand}
            />
          </div>
        </div>
        {brand && (
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={brand.status}>
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
            brand ? 'Save Changes' : 'Add Brand'
          )}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Brands Management
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
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Brand</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new brand.
                </DialogDescription>
              </DialogHeader>
              <BrandForm onSubmit={handleAdd} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {filteredBrands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-lg border p-4">
            <div className="relative h-32 w-full mb-4">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-center">{brand.name}</h3>
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-500 block text-center truncate"
                >
                  {new URL(brand.website).hostname}
                </a>
              )}
              <div className="flex items-center justify-between pt-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    brand.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                </span>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedBrand(brand);
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
                      <DialogTitle>Edit Brand</DialogTitle>
                      <DialogDescription>
                        Update the brand details below.
                      </DialogDescription>
                    </DialogHeader>
                    <BrandForm 
                      brand={brand} 
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