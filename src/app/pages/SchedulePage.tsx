export function SchedulePage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  return (
    <div className="p-4">
      {/* Week Selector */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {days.map((day, index) => (
          <button
            key={day}
            className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 ${
              index === 0 
                ? 'bg-gray-700 text-white border-gray-700' 
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            <div className="text-xs">{day}</div>
            <div className="text-sm font-medium">{10 + index}</div>
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="space-y-3">
        {timeSlots.map((time, index) => (
          <div key={time} className="flex gap-3">
            <div className="w-12 flex-shrink-0 text-xs text-gray-500 pt-1">{time}</div>
            <div className="flex-1">
              {index % 2 === 0 && (
                <div className="bg-white border-2 border-gray-700 rounded-lg p-3">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
