export function HomePage() {
  return (
    <div className="p-4">
      {/* Progress Card */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-500 mb-2">Overall Progress</div>
        <div className="w-full h-8 bg-gray-200 rounded-full mb-2">
          <div className="h-full w-2/3 bg-gray-400 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-600">67% Complete</div>
      </div>

      {/* Current Semester */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <div className="text-sm font-medium text-gray-700 mb-3">Spring 2026</div>
        
        {/* Course Items */}
        {[1, 2, 3, 4].map((course) => (
          <div key={course} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className="w-3 h-3 border-2 border-gray-400 rounded-sm flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
          <div className="h-10 w-10 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
          <div className="h-10 w-10 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
