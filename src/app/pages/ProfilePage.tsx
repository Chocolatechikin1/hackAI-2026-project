import { Mail, Phone, MapPin, Calendar, Award, Edit } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="p-4">
      {/* Profile Header */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-4 text-center">
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border-2 border-white">
            <Edit className="w-4 h-4 text-white" />
          </button>
        </div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">Student Name</h2>
        <p className="text-sm text-gray-500">Computer Science</p>
        <p className="text-xs text-gray-400 mt-1">Class of 2027</p>
      </div>

      {/* Contact Information */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-700">student@utdallas.edu</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-700">(555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Campus</p>
              <p className="text-sm text-gray-700">Richardson, TX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Info */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Academic Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Enrollment Date</p>
              <p className="text-sm text-gray-700">Fall 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Current GPA</p>
              <p className="text-sm text-gray-700">3.75</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Credits Completed</p>
              <p className="text-sm text-gray-700">84 / 126</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button className="w-full bg-gray-700 text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors">
        Edit Profile
      </button>
    </div>
  );
}
