import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import GanttChart from '../components/dashboard/GanttChart';
import KanbanBoard from '../components/dashboard/KanbanBoard';

export default function Projects() {
  const [view, setView] = React.useState<'kanban' | 'gantt'>('kanban');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Projects</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('kanban')}
                className={`px-4 py-2 rounded-lg ${
                  view === 'kanban'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setView('gantt')}
                className={`px-4 py-2 rounded-lg ${
                  view === 'gantt'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                Gantt
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            {view === 'kanban' ? <KanbanBoard /> : <GanttChart />}
          </div>
        </main>
      </div>
    </div>
  );
}