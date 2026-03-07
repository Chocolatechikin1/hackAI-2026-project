import { ViewStyle, TextStyle } from 'react-native';

export const commonStyles = {
  // Layout
  screenPad: 'p-4',
  container: 'flex-1 bg-white',
  content: 'flex-1',
  
  // Cards
  card: 'bg-white rounded-lg p-4 mb-4 border border-gray-200',
  cardLabel: 'text-gray-700 font-semibold mb-2',
  menuCard: 'bg-white rounded-lg border border-gray-200',
  menuItem: 'flex-row items-center p-4 border-b border-gray-100',
  menuLabel: 'flex-1 text-gray-700 ml-3',
  menuValue: 'text-gray-500',
  
  // Progress Bar
  progressBar: 'h-2 rounded-full',
  progressBarBg: 'bg-gray-200',
  progressBarFill: 'bg-blue-500',
  
  // Buttons
  editProfileBtn: 'bg-blue-500 p-3 rounded-lg',
  editProfileBtnText: 'text-white text-center font-semibold',
  
  // Toggle Switch
  toggle: 'w-12 h-6 bg-gray-300 rounded-full',
  toggleKnob: 'w-5 h-5 bg-white rounded-full m-0.5',
  
  // Bottom Navigation
  bottomNav: 'bg-white border-t border-gray-200',
  bottomNavInner: 'flex-row items-center justify-around py-2',
  navItem: 'items-center py-2',
  navLabel: 'text-xs text-gray-400 mt-1',
  navLabelActive: 'text-gray-700',
  navCenterBtn: 'bg-blue-500 w-14 h-14 rounded-full items-center justify-center -mt-4',
  
  // Top Bar
  topBar: 'flex-row items-center justify-between p-4 bg-white border-b border-gray-200',
  pageTitle: 'text-lg font-semibold text-gray-800',
  
  // Forms
  input: 'border border-gray-300 rounded-lg p-3 mb-3 text-gray-700',
  textArea: 'border border-gray-300 rounded-lg p-3 mb-3 text-gray-700 h-24',
  sendBtn: 'bg-blue-500 p-3 rounded-lg',
  sendBtnText: 'text-white font-semibold',
  
  // Lists
  courseItem: 'bg-white p-4 mb-2 rounded-lg border border-gray-200',
  courseName: 'text-gray-800 font-semibold',
  courseCode: 'text-gray-600 text-sm',
  
  // Schedule
  scheduleGrid: 'flex-1 p-4',
  timeSlot: 'border-b border-gray-100 py-2',
  eventItem: 'bg-blue-100 rounded p-2 mb-1',
  
  // Sections
  sectionLabel: 'text-gray-700 font-semibold mb-3',
  
  // Stats
  statCard: 'bg-white rounded-lg p-4 mb-3 border border-gray-200 flex-1',
  statValue: 'text-2xl font-bold text-gray-800',
  statLabel: 'text-gray-600 text-sm',
  
  // Quick Actions
  quickActionBtn: 'bg-gray-100 p-3 rounded-lg items-center',
  quickActionText: 'text-gray-700 text-sm mt-1',
} as const;

export type CommonStyles = typeof commonStyles;
