import { useNavigate } from 'react-router';
import { Settings, HelpCircle, FileText, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';

export function MorePage() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: 'Settings', path: '/settings', color: 'text-gray-600' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help', color: 'text-gray-600' },
    { icon: FileText, label: 'Academic Records', path: '#', color: 'text-gray-600' },
    { icon: Bell, label: 'Notifications', path: '#', color: 'text-gray-600' },
    { icon: Shield, label: 'Privacy & Security', path: '#', color: 'text-gray-600' },
  ];

  return (
    <div className="p-4">
      {/* Account Section */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-500 mb-3">Account</div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="flex-1 text-left text-gray-700">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-500 mb-3">About</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Version</span>
            <span className="text-sm text-gray-800">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Build</span>
            <span className="text-sm text-gray-800">2026.03.07</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors">
        <LogOut className="w-5 h-5 text-red-600" />
        <span className="text-red-600 font-medium">Log Out</span>
      </button>
    </div>
  );
}
