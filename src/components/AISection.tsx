import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

export default function AISection() {
  return (
    <section id="ai" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 bg-blue-600/10 w-full h-full rounded-2xl" />
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <span className="text-xl font-semibold">AI Assistant</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Analyze project timeline and suggest optimizations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Generate meeting summary and action items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-6">
              Powered by Advanced
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> AI Technology</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our AI assistant helps you work smarter by automating routine tasks, providing intelligent insights, and optimizing your workflow.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <span>Smart task prioritization and scheduling</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <span>Automated document generation and formatting</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <span>Real-time productivity insights and suggestions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}