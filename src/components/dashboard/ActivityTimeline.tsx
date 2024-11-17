import React from 'react';
import { MessageSquare, FileText, CheckCircle, Users } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'comment',
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces'
    },
    content: 'Added comments on UI design task',
    time: '2 hours ago',
    icon: MessageSquare
  },
  {
    id: 2,
    type: 'file',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces'
    },
    content: 'Uploaded new design files',
    time: '4 hours ago',
    icon: FileText
  },
  {
    id: 3,
    type: 'task',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces'
    },
    content: 'Completed backend integration',
    time: '6 hours ago',
    icon: CheckCircle
  },
  {
    id: 4,
    type: 'team',
    user: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces'
    },
    content: 'Joined the project team',
    time: '1 day ago',
    icon: Users
  }
];

export default function ActivityTimeline() {
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      
      <div className="p-4">
        <div className="relative">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4 pb-8 last:pb-0">
              <div className="relative">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <activity.icon className="w-4 h-4 text-blue-600" />
                </div>
                {index !== activities.length - 1 && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200" />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{activity.user.name}</span>
                </div>
                <p className="text-gray-600 mb-1">{activity.content}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}