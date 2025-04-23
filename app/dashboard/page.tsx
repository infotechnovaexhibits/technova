"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Building2, 
  Briefcase,
  TrendingUp,
  Star,
  Mail,
  Loader2,
  Users,
  Activity,
  CheckCircle,
  LogOut
} from 'lucide-react';
import { useGetDashboardCountsQuery } from '../../lib/redux/services/countApi';
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement
);

// Chart Data Types
interface LineChartData extends ChartData<'line'> {}
interface BarChartData extends ChartData<'bar'> {}
interface DoughnutChartData extends ChartData<'doughnut'> {}

// Dummy Data
const lineChartData: LineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Monthly Leads',
      data: [25, 35, 45, 40, 55, 75],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.3,
    },
  ],
};

const barChartData: BarChartData = {
  labels: ['Web Dev', 'Mobile Apps', 'UI/UX', 'Branding', 'Marketing', 'SEO'],
  datasets: [
    {
      label: 'Projects by Category',
      data: [15, 12, 8, 10, 7, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)', // blue
        'rgba(168, 85, 247, 0.6)', // purple
        'rgba(16, 185, 129, 0.6)', // emerald
        'rgba(245, 158, 11, 0.6)', // amber
        'rgba(239, 68, 68, 0.6)',  // red
        'rgba(14, 165, 233, 0.6)', // sky
      ],
    },
  ],
};

const doughnutChartData: DoughnutChartData = {
  labels: ['Approved', 'Pending', 'Rejected'],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        'rgba(16, 185, 129, 0.7)', // emerald
        'rgba(245, 158, 11, 0.7)', // amber
        'rgba(239, 68, 68, 0.7)',  // red
      ],
      borderColor: [
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 1,
    },
  ],
};

// Separate options for each chart type
const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const lineChartOptions: ChartOptions<'line'> = {
  ...baseChartOptions,
};

const barChartOptions: ChartOptions<'bar'> = {
  ...baseChartOptions,
};

const doughnutChartOptions: ChartOptions<'doughnut'> = {
  ...baseChartOptions,
  plugins: {
    ...baseChartOptions.plugins,
    legend: {
      position: 'right' as const,
    },
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: counts, isLoading, error } = useGetDashboardCountsQuery();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    router.push("/auth/logout");
  };

  const stats = [
    {
      title: "Services",
      value: counts?.services ?? 0,
      icon: Briefcase,
      description: "Total services offered",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Gallery",
      value: counts?.gallery ?? 0,
      icon: ImageIcon,
      description: "Portfolio items",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Brands",
      value: counts?.brands ?? 0,
      icon: Building2,
      description: "Trusted brands",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Testimonials",
      value: counts?.testimonials ?? 0,
      icon: MessageSquare,
      description: "Client testimonials",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Leads",
      value: counts?.leads ?? 0,
      icon: Users,
      description: "Total leads received",
      color: "text-rose-500",
      bgColor: "bg-rose-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-sm text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's a summary of your website activity.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className="hover:shadow-lg transition-shadow duration-200 border-l-4" 
              style={{ borderLeftColor: stat.color.startsWith('text-') ? `var(--${stat.color.replace('text-', '')})` : stat.color }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                    <h2 className="text-2xl font-bold">{stat.value}</h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Line Chart */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Lead Generation Trend
            </CardTitle>
            <CardDescription>Monthly leads acquisition overview</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line options={lineChartOptions} data={lineChartData} />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Service Distribution
            </CardTitle>
            <CardDescription>Projects by service category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Bar options={barChartOptions} data={barChartData} />
          </CardContent>
        </Card>

        {/* Doughnut Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              Testimonials Status
            </CardTitle>
            <CardDescription>Distribution of testimonial approval status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex justify-center">
            <div className="w-full max-w-[400px]">
              <Doughnut options={doughnutChartOptions} data={doughnutChartData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 