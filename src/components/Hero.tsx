import React from 'react';
import { ArrowRight, Brain, Calendar, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Manage Tasks with
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> AI-Powered </span>
              Intelligence
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your project management with AI assistance, smart scheduling, and automated document generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-3 rounded-2xl">
                <Brain className="h-6 w-6" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Team Meeting</h3>
                      <p className="text-sm text-gray-500">10:00 AM - 11:00 AM</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    In Progress
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">Review project timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">Update task assignments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    <span className="text-gray-600">Prepare presentation deck</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}