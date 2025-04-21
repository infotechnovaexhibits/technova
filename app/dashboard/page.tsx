"use client";

import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      name: "Total Leads",
      value: "2,100",
      change: "+15%",
      changeType: "positive",
      icon: UserGroupIcon,
      link: "/dashboard/leads",
    },
    {
      name: "Active Leads",
      value: "450",
      change: "+12%",
      changeType: "positive",
      icon: PhoneIcon,
      link: "/dashboard/leads?status=active",
    },
    {
      name: "Testimonials",
      value: "48",
      change: "+8%",
      changeType: "positive",
      icon: ChatBubbleLeftRightIcon,
      link: "/dashboard/testimonials",
    },
    {
      name: "Conversion Rate",
      value: "24.5%",
      change: "+5.2%",
      changeType: "positive",
      icon: ArrowTrendingUpIcon,
      link: "/dashboard/analytics",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/dashboard/leads/new"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Add New Lead
          </Link>
          <Link
            href="/dashboard/testimonials/new"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Add Testimonial
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.link}>
              <Card className="p-6 hover:border-blue-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <span className="text-sm font-medium text-green-600">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
          {/* Recent leads table will go here */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Testimonials</h2>
          {/* Recent testimonials list will go here */}
        </Card>
      </div>
    </div>
  );
} 