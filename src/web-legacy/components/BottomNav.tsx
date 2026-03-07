import { useNavigate, useLocation } from 'react-router';
import { Home, Calendar, BookOpen, MoreHorizontal, MessageCircle } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="border-t-2 border-gray-300 bg-white px-2 py-2 relative">
      <div className="flex items-end justify-around">
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
            isActive('/') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Home className={`w-6 h-6 ${isActive('/') ? 'text-gray-700' : 'text-gray-400'}`} />
          <span className={`text-xs ${isActive('/') ? 'text-gray-700' : 'text-gray-400'}`}>Home</span>
        </button>
        <button 
          onClick={() => navigate('/schedule')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
            isActive('/schedule') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Calendar className={`w-6 h-6 ${isActive('/schedule') ? 'text-gray-700' : 'text-gray-400'}`} />
          <span className={`text-xs ${isActive('/schedule') ? 'text-gray-700' : 'text-gray-400'}`}>Schedule</span>
        </button>
        
        {/* Circular AI Chat Button */}
        <button 
          onClick={() => navigate('/chatbot')}
          className="w-14 h-14 -mt-7 bg-gray-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
        
        <button 
          onClick={() => navigate('/courses')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
            isActive('/courses') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <BookOpen className={`w-6 h-6 ${isActive('/courses') ? 'text-gray-700' : 'text-gray-400'}`} />
          <span className={`text-xs ${isActive('/courses') ? 'text-gray-700' : 'text-gray-400'}`}>Courses</span>
        </button>
        <button 
          onClick={() => navigate('/more')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
            isActive('/more') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <MoreHorizontal className={`w-6 h-6 ${isActive('/more') ? 'text-gray-700' : 'text-gray-400'}`} />
          <span className={`text-xs ${isActive('/more') ? 'text-gray-700' : 'text-gray-400'}`}>More</span>
        </button>
      </div>
    </div>
  );
}
