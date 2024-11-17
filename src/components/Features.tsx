import React from 'react';
import { 
  Calendar, 
  GanttChart, 
  FileText, 
  Brain, 
  MessageSquare, 
  Users 
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Smart Calendar',
    description: 'AI-powered scheduling that automatically optimizes your time and suggests the best slots for meetings and tasks.'
  },
  {
    icon: GanttChart,
    title: 'Gantt & Kanban',
    description: 'Visualize project timelines and track progress with interactive Gantt charts and Kanban boards.'
  },
  {
    icon: FileText,
    title: 'Document Generation',
    description: 'Automatically generate professional presentations, reports, and emails based on your project data.'
  },
  {
    icon: Brain,
    title: 'AI Assistant',
    description: 'Get intelligent suggestions and insights to optimize your workflow and improve productivity.'
  },
  {
    icon: MessageSquare,
    title: 'OCR Integration',
    description: 'Convert handwritten notes and sketches into digital tasks and diagrams instantly.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share projects, assign tasks, and collaborate seamlessly with team members in real-time.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage projects efficiently and boost productivity with AI-powered tools.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}