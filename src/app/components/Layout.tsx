import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Menu, User, Home, Calendar, BookOpen, MoreHorizontal, MessageCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine page title based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'UTDCourses';
      case '/schedule': return 'Schedule';
      case '/chatbot': return 'AI Assistant';
      case '/courses': return 'Courses';
      case '/more': return 'More';
      case '/settings': return 'Settings';
      case '/profile': return 'Profile';
      case '/help': return 'Help';
      default: return 'UTDCourses';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl p-3">
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-medium text-gray-800">{getPageTitle()}</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <Outlet />
          </div>

          {/* Bottom Navigation */}
          <BottomNav />

          {/* Sidebar Overlay */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl"></div>
      </div>
    </div>
  );
}
