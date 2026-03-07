import { Search, MessageCircle, Mail, Phone, ChevronRight } from 'lucide-react';

export function HelpPage() {
  const faqs = [
    'How do I add a course?',
    'Can I change my major?',
    'How do I view my transcript?',
    'What are the graduation requirements?',
  ];

  return (
    <div className="p-4">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
        <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <span className="flex-1 text-left text-gray-700">Chat with Support</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
          <Mail className="w-5 h-5 text-gray-600" />
          <span className="flex-1 text-left text-gray-700">Email Support</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
          <Phone className="w-5 h-5 text-gray-600" />
          <span className="flex-1 text-left text-gray-700">Call Support</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* FAQs */}
      <div className="mb-4">
        <h2 className="text-sm font-medium text-gray-700 mb-3 px-2">Frequently Asked Questions</h2>
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${
                index !== faqs.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <span className="text-left text-sm text-gray-700">{faq}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-3 px-2">Resources</h2>
        <div className="space-y-2">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-1">User Guide</h3>
            <p className="text-xs text-gray-500">Learn how to use all features</p>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-1">Video Tutorials</h3>
            <p className="text-xs text-gray-500">Watch step-by-step guides</p>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-1">Community Forum</h3>
            <p className="text-xs text-gray-500">Connect with other students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
