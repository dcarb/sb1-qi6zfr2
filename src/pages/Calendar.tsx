import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTaskStore } from '../stores/taskStore';

export default function Calendar() {
  const tasks = useTaskStore((state) => state.tasks);
  
  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.dueDate,
    backgroundColor: task.priority === 'high' ? '#EF4444' : 
                    task.priority === 'medium' ? '#F59E0B' : '#10B981'
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}