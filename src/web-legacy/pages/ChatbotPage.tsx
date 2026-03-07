import { Send } from 'lucide-react';
import { useState } from 'react';

export function ChatbotPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        
        {/* Bot Message */}
        <div className="flex gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-white border-2 border-gray-300 rounded-lg rounded-tl-none p-3">
              <p className="text-sm text-gray-700">Hi! I'm your course planning assistant. How can I help you today?</p>
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-2 mb-4 justify-end">
          <div className="flex-1">
            <div className="bg-gray-700 text-white rounded-lg rounded-tr-none p-3 ml-auto max-w-[80%]">
              <p className="text-sm">What courses should I take next semester?</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        </div>

        {/* Bot Message with suggestions */}
        <div className="flex gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-white border-2 border-gray-300 rounded-lg rounded-tl-none p-3 mb-2">
              <p className="text-sm text-gray-700">Based on your progress, I recommend these courses for next semester:</p>
            </div>
            
            {/* Suggested Actions */}
            <div className="flex flex-col gap-2">
              <button className="bg-white border-2 border-gray-300 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
                <p className="text-sm text-gray-700">View Core Requirements</p>
              </button>
              <button className="bg-white border-2 border-gray-300 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
                <p className="text-sm text-gray-700">Check Prerequisites</p>
              </button>
              <button className="bg-white border-2 border-gray-300 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
                <p className="text-sm text-gray-700">Plan 4-Year Schedule</p>
              </button>
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-2 mb-4 justify-end">
          <div className="flex-1">
            <div className="bg-gray-700 text-white rounded-lg rounded-tr-none p-3 ml-auto max-w-[80%]">
              <p className="text-sm">Show me core requirements</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        </div>

        {/* Bot Typing Indicator */}
        <div className="flex gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-white border-2 border-gray-300 rounded-lg rounded-tl-none p-3 w-16">
              <div className="flex gap-1 items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-gray-300 bg-white p-3">
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-100 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
          <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-gray-800 transition-colors">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
