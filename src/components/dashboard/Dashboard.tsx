import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TaskList from './TaskList';
import ProjectList from './ProjectList';
import ActivityTimeline from './ActivityTimeline';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    icon: BarChart3,
    label: 'Total Tasks',
    value: '24',
    trend: '+12%',
    trendUp: true
  },
  {
    icon: TrendingUp,
    label: 'Completed',
    value: '18',
    trend: '+8%',
    trendUp: true
  },
  {
    icon: Users,
    label: 'Team Members',
    value: '8',
    trend: '+2',
    trendUp: true
  }
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm ${
                    stat.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last month</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TaskList />
              <ProjectList />
            </div>
            <ActivityTimeline />
          </div>
        </main>
      </div>
    </div>
  );
}