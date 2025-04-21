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

type Service = {
  id: string;
  order: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
  features: string[];
  status: "active" | "inactive";
};

const initialServices: Service[] = [
  {
    id: "1",
    order: 1,
    name: "Exhibition Stand Design",
    slug: "exhibition-stand-design",
    description: "Custom exhibition stand design and build services",
    fullDescription: "We create stunning exhibition stands that help you stand out...",
    image: "/services/exhibition1.jpg",
    features: [
      "Custom Design",
      "3D Visualization",
      "Project Management",
      "Installation"
    ],
    status: "active",
  },
  {
    id: "2",
    order: 2,
    name: "Event Management",
    slug: "event-management",
    description: "Full-service event planning and management",
    fullDescription: "End-to-end event management services for corporate events...",
    image: "/services/event1.jpg",
    features: [
      "Venue Selection",
      "Logistics Management",
      "On-site Coordination",
      "Post-event Analysis"
    ],
    status: "active",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filter, setFilter] = useState<Service["status"] | "all">("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredServices = services
    .filter((service) => filter === "all" ? true : service.status === filter)
    .sort((a, b) => a.order - b.order);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const maxOrder = Math.max(...services.map(s => s.order), 0);
      const name = formData.get("name") as string;
      const newService: Service = {
        id: Math.random().toString(36).substr(2, 9),
        order: maxOrder + 1,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.get("description") as string,
        fullDescription: formData.get("fullDescription") as string,
        image: formData.get("image") as string,
        features: (formData.get("features") as string).split('\n').filter(Boolean),
        status: "active",
      };
      setServices([...services, newService]);
      setIsAddDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (formData: FormData) => {
    if (!selectedService) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const name = formData.get("name") as string;
      const updatedService: Service = {
        ...selectedService,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.get("description") as string,
        fullDescription: formData.get("fullDescription") as string,
        image: formData.get("image") as string,
        features: (formData.get("features") as string).split('\n').filter(Boolean),
        status: formData.get("status") as Service["status"],
      };
      setServices(
        services.map((service) =>
          service.id === selectedService.id ? updatedService : service
        )
      );
      setIsEditDialogOpen(false);
    } finally {
      setIsLoading(false);
      setSelectedService(null);
    }
  };

  const ServiceForm = ({ service, onSubmit }: { 
    service?: Service; 
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
            defaultValue={service?.name}
            placeholder="Enter service name" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Short Description</Label>
          <Input
            id="description"
            name="description"
            defaultValue={service?.description}
            placeholder="Enter short description"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fullDescription">Full Description</Label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            defaultValue={service?.fullDescription}
            placeholder="Enter full description"
            className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="features">Features (one per line)</Label>
          <textarea
            id="features"
            name="features"
            defaultValue={service?.features.join('\n')}
            placeholder="Enter features (one per line)"
            className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Image</Label>
          <div className="flex items-center gap-4">
            {service?.image && (
              <div className="relative w-20 h-20">
                <Image
                  src={service.image}
                  alt={service.name}
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
              required={!service}
            />
          </div>
        </div>
        {service && (
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={service.status}>
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
            service ? 'Save Changes' : 'Add Service'
          )}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Services Management
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
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new service.
                </DialogDescription>
              </DialogHeader>
              <ServiceForm onSubmit={handleAdd} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg border overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{service.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{service.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Features:</h4>
                <ul className="text-sm text-gray-500 list-disc pl-4">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                  {service.features.length > 3 && (
                    <li>+{service.features.length - 3} more</li>
                  )}
                </ul>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    service.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </span>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service);
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
                      <DialogTitle>Edit Service</DialogTitle>
                      <DialogDescription>
                        Update the service details below.
                      </DialogDescription>
                    </DialogHeader>
                    <ServiceForm 
                      service={service} 
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