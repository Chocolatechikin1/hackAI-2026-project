import { X, Home, Calendar, BookOpen, BarChart3, Settings, HelpCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="absolute inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`absolute top-0 left-0 bottom-0 w-64 bg-white border-r-2 border-gray-300 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
            <h2 className="text-lg font-medium text-gray-800">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* User Info */}
          <button 
            onClick={() => handleNavigate('/profile')}
            className="px-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </button>

          {/* Navigation Items */}
          <nav className="flex-1 px-2 py-4">
            <button 
              onClick={() => handleNavigate('/')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                isActive('/') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <Home className={`w-5 h-5 ${isActive('/') ? 'text-gray-700' : 'text-gray-500'}`} />
              <span className={isActive('/') ? 'text-gray-700' : 'text-gray-600'}>Home</span>
            </button>
            <button 
              onClick={() => handleNavigate('/schedule')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                isActive('/schedule') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <Calendar className={`w-5 h-5 ${isActive('/schedule') ? 'text-gray-700' : 'text-gray-500'}`} />
              <span className={isActive('/schedule') ? 'text-gray-700' : 'text-gray-600'}>Schedule</span>
            </button>
            <button 
              onClick={() => handleNavigate('/courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                isActive('/courses') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <BookOpen className={`w-5 h-5 ${isActive('/courses') ? 'text-gray-700' : 'text-gray-500'}`} />
              <span className={isActive('/courses') ? 'text-gray-700' : 'text-gray-600'}>Courses</span>
            </button>
            <button 
              onClick={() => handleNavigate('/chatbot')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                isActive('/chatbot') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <BarChart3 className={`w-5 h-5 ${isActive('/chatbot') ? 'text-gray-700' : 'text-gray-500'}`} />
              <span className={isActive('/chatbot') ? 'text-gray-700' : 'text-gray-600'}>AI Assistant</span>
            </button>
            
            <div className="h-px bg-gray-200 my-4"></div>
            
            <button 
              onClick={() => handleNavigate('/settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                isActive('/settings') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <Settings className={`w-5 h-5 ${isActive('/settings') ? 'text-gray-700' : 'text-gray-500'}`} />
              <span className={isActive('/settings') ? 'text-gray-700' : 'text-gray-600'}>Settings</span>
            </button>
            <button 
              onClick={() => handleNavigate('/help')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/help') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <HelpCircle className={`w-5 h-5 ${isActive('/help') ? 'text-gray-700' : 'text-gray-500'}`} />
              <span className={isActive('/help') ? 'text-gray-700' : 'text-gray-600'}>Help</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}