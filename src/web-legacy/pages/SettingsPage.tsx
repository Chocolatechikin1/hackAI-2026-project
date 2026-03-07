import { ChevronRight, Bell, Moon, Globe, Lock } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="p-4">
      {/* Preferences Section */}
      <div className="mb-6">
        <h2 className="text-sm text-gray-500 mb-3 px-2">Preferences</h2>
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-gray-700">Notifications</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">On</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
            <Moon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-gray-700">Dark Mode</span>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
            <Globe className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-gray-700">Language</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">English</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="mb-6">
        <h2 className="text-sm text-gray-500 mb-3 px-2">Security</h2>
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
            <Lock className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-gray-700">Change Password</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
            </div>
            <span className="flex-1 text-left text-gray-700">Two-Factor Auth</span>
            <div className="w-12 h-6 bg-gray-700 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Data & Storage Section */}
      <div className="mb-6">
        <h2 className="text-sm text-gray-500 mb-3 px-2">Data & Storage</h2>
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Cache Size</span>
            <span className="text-sm text-gray-800">124 MB</span>
          </div>
          <button className="w-full mt-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
}
