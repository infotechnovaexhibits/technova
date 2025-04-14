import React from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity 
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">$45,678</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Growth</p>
              <h3 className="text-2xl font-bold">+12.5%</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Users</p>
              <h3 className="text-2xl font-bold">789</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Activity className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Add your recent activity items here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 