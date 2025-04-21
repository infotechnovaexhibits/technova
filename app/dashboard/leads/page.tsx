"use client";

import { useState } from "react";
import { useGetLeadsQuery, useUpdateLeadMutation } from '../../../lib/redux/services/leadsApi';
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
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted";
  createdAt: string;
}

export default function LeadsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");

  // RTK Query hooks
  const { data: leads = [], isLoading, error } = useGetLeadsQuery();
  const [updateLead] = useUpdateLeadMutation();

  const filteredLeads = leads
    ?.filter((lead: Lead) => filter === "all" ? true : lead.status == filter)


  const handleStatusChange = async (formData: FormData) => {
    if (!selectedLead) return;
    
    try {
      const updatedLead = {
        id: selectedLead.id,
        status: formData.get("status") as Lead["status"],
      };
      
      await updateLead(updatedLead).unwrap();
      setIsEditDialogOpen(false);
      setSelectedLead(null);
      toast.success('Lead status updated successfully');
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading leads</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Leads Management
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredLeads.map((lead: Lead) => (
              <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{lead.name}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.phone}</td>
                <td className="px-6 py-4 max-w-xs truncate">{lead.message}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      lead.status === "new"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead);
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
                        <DialogTitle>Update Lead Status</DialogTitle>
                        <DialogDescription>
                          Change the status of this lead.
                        </DialogDescription>
                      </DialogHeader>
                      <form 
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          await handleStatusChange(formData);
                        }} 
                        className="space-y-4"
                      >
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" defaultValue={lead.status}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            disabled={isLoading}
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
