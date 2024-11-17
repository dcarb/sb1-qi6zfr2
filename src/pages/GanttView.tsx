import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import GanttChart from '../components/dashboard/GanttChart';

export default function GanttView() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Gantt Chart</h1>
            <GanttChart />
          </div>
        </main>
      </div>
    </div>
  );
}