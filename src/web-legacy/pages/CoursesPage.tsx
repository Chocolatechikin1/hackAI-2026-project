import { Search, Filter } from 'lucide-react';

export function CoursesPage() {
  const courses = [
    { code: 'CS 1337', name: 'Computer Science I', credits: 3, status: 'completed' },
    { code: 'CS 2336', name: 'Computer Science II', credits: 3, status: 'completed' },
    { code: 'CS 3345', name: 'Data Structures', credits: 3, status: 'in-progress' },
    { code: 'CS 3340', name: 'Computer Architecture', credits: 3, status: 'in-progress' },
    { code: 'CS 4349', name: 'Advanced Algorithm', credits: 3, status: 'planned' },
    { code: 'CS 4384', name: 'Machine Learning', credits: 3, status: 'planned' },
  ];

  return (
    <div className="p-4">
      {/* Search and Filter */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <button className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium">
          All
        </button>
        <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-600 rounded-lg text-sm">
          Completed
        </button>
        <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-600 rounded-lg text-sm">
          In Progress
        </button>
        <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-600 rounded-lg text-sm">
          Planned
        </button>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div key={course.code} className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-800">{course.code}</h3>
                <p className="text-sm text-gray-600">{course.name}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">{course.credits} credits</span>
                <span className={`mt-1 px-2 py-1 rounded text-xs ${
                  course.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : course.status === 'in-progress'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {course.status === 'completed' ? 'Completed' : course.status === 'in-progress' ? 'Current' : 'Planned'}
                </span>
              </div>
            </div>
            {course.status === 'in-progress' && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
