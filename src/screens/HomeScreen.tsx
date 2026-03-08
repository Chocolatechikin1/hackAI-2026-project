import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TextInput, Alert, ActivityIndicator, Platform } from 'react-native';
import { ResponsiveButton as Pressable } from '../components/ResponsiveButton';
import { Ionicons } from '@expo/vector-icons';
import { nebulaApi } from '../api';
import type { NebulaEvent } from '../api/nebula.types';
import { useTheme } from '../context/ThemeContext';

const createStyles = (theme: any) => StyleSheet.create({
  screenPad: { padding: 16 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardLabel: {
    color: theme.colors.text,
    fontFamily: theme.fonts.semiBold,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressBarBg: {
    backgroundColor: theme.colors.border,
  },
  progressBarFill: {
    backgroundColor: theme.colors.primary,
  },
  sectionLabel: {
    color: theme.colors.text,
    fontFamily: theme.fonts.semiBold,
    marginBottom: 12,
  },
  scheduleCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: '100%',
    ...(Platform.OS === 'web' ? { maxWidth: 400, alignSelf: 'center' as const } : {}),
  },
  dateNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  navArrow: {
    padding: 8,
    marginRight: 4,
  },
  dateNavLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  todayButton: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  todayButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewToggle: {
    marginRight: 8,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  monthlyButton: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  monthlyText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  timeGrid: {
    position: 'relative',
    ...(Platform.OS === 'web' ? { minHeight: 13 * 44 } : { minHeight: 13 * 52 }),
  },
  hourLine: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
    ...(Platform.OS === 'web' ? { height: 44 } : { height: 52 }),
  },
  hourLabel: {
    width: 48,
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontFamily: theme.fonts.medium,
    paddingTop: 6,
  },
  currentTimeLine: {
    position: 'absolute',
    left: 48,
    right: 10,
    height: 2,
    backgroundColor: theme.colors.error,
    zIndex: 10,
  },
  currentTimeBubble: {
    position: 'absolute',
    left: 0,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 11,
  },
  currentTimeText: {
    color: theme.colors.surface,
    fontSize: 10,
    fontFamily: theme.fonts.semiBold,
  },
  eventBlock: {
    position: 'absolute',
    left: 54,
    right: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 6,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
    overflow: 'hidden',
  },
  eventTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.semiBold,
    fontSize: 12,
    marginBottom: 2,
  },
  eventLocation: {
    color: theme.colors.text,
    fontSize: 10,
  },
  scheduleEmpty: {
    position: 'absolute',
    left: 54,
    right: 10,
    top: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleEmptyText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: theme.colors.text,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
  },
  cancelText: {
    color: theme.colors.textSecondary,
  },
  saveText: {
    color: theme.colors.surface,
  },
  dayDetailBelow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  dayDetailTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  dayDetailDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  dayDetailEvents: {
    marginBottom: 12,
  },
  dayDetailEvent: {
    backgroundColor: theme.colors.background,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  dayDetailEventTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
  },
  dayDetailEventTime: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  dayDetailEventLocation: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.surface,
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
  },
  monthGrid: {
    width: '100%',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekDay: {
    width: '14.28%',
    textAlign: 'center' as const,
    paddingVertical: Platform.OS === 'web' ? 4 : 6,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
  },
  weekDayText: {
    fontSize: Platform.OS === 'web' ? 10 : 11,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  weekDayCurrent: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.surface,
  },
  monthDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  monthDaySelected: {
    backgroundColor: theme.colors.border,
  },
  monthDayToday: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
  },
  monthDayText: {
    fontSize: Platform.OS === 'web' ? 12 : 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
  },
  monthDayTodayText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.semiBold,
  },
  monthDayEvent: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    marginLeft: -6,
    width: 12,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  monthDayHasEvents: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  dateDisplay: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  typeButtonInactive: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  typeButtonDisabled: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    opacity: 0.7,
  },
  typeButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  typeButtonText: { fontSize: 14, fontFamily: theme.fonts.semiBold },
  dateDropdownRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dateDropdownThird: {
    flex: 1,
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownPlaceholder: { color: theme.colors.textSecondary, fontSize: 14 },
  dropdownValue: { color: theme.colors.text, fontSize: 14 },
  dropdownModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  dropdownList: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: 320,
    paddingBottom: 24,
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  dropdownItemText: { fontSize: 14, color: theme.colors.text },
});

// --- Date helpers (real date) ---
function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function getTodayDisplay(): string {
  const d = new Date();
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
function getCurrentMonthYear(): { month: number; year: number; monthName: string } {
  const d = new Date();
  return {
    month: d.getMonth(),
    year: d.getFullYear(),
    monthName: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };
}
function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Flattened campus event for dropdown
interface FlattenedCampusEvent {
  id: string;
  summary: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  building: string;
  room: string;
}

// Mock database for events
interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  startHour: number;
  startMinute: number;
}

type AddEventType = 'event' | 'course' | null;
type RecurrenceType = 'none' | 'daily' | 'weekly';

// UTD class levels for course dropdown (Nebula API uses these strings)
const CLASS_LEVELS = ['Undergraduate', 'Graduate'];

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getYears(): number[] {
  const y = new Date().getFullYear();
  return [y - 2, y - 1, y, y + 1];
}

function toDateString(day: number, month: number, year: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const todayDate = getTodayDateString();
  const [viewMode, setViewMode] = useState<'today' | 'month'>('today');
  const [showAddModal, setShowAddModal] = useState(false);

  // Daily view: which day we're viewing (default today)
  const [dailyViewDate, setDailyViewDate] = useState(() => getTodayDateString());
  // Monthly view: which month/year we're viewing (default current)
  const [viewingMonth, setViewingMonth] = useState(() => new Date().getMonth());
  const [viewingYear, setViewingYear] = useState(() => new Date().getFullYear());
  const [addEventType, setAddEventType] = useState<AddEventType>(null);
  const [recurrence, setRecurrence] = useState<RecurrenceType>('none');

  // Campus event path
  const [campusEvents, setCampusEvents] = useState<FlattenedCampusEvent[]>([]);
  const [campusEventsLoading, setCampusEventsLoading] = useState(false);
  const [selectedCampusEvent, setSelectedCampusEvent] = useState<FlattenedCampusEvent | null>(null);

  // Course path
  const [subjectPrefixes, setSubjectPrefixes] = useState<{ label: string; value: string }[]>([]);
  const [subjectPrefixesLoading, setSubjectPrefixesLoading] = useState(false);
  const [selectedSubjectPrefix, setSelectedSubjectPrefix] = useState<string | null>(null);
  const [selectedClassLevel, setSelectedClassLevel] = useState<string | null>(null);
  const [courses, setCourses] = useState<{ _id?: string; subject_prefix?: string; course_number?: string; title?: string }[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ _id?: string; subject_prefix?: string; course_number?: string; title?: string } | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState<'day' | 'month' | 'year' | 'campus' | 'subject' | 'class' | 'course' | null>(null);

  // Add-event date (day/month/year); when modal opens, init from today
  const [addEventDay, setAddEventDay] = useState(() => new Date().getDate());
  const [addEventMonth, setAddEventMonth] = useState(() => new Date().getMonth());
  const [addEventYear, setAddEventYear] = useState(() => new Date().getFullYear());
  const addEventDate = toDateString(
    Math.min(addEventDay, getDaysInMonth(addEventMonth, addEventYear)),
    addEventMonth,
    addEventYear
  );

  // Events (no static placeholders – clean schedule)
  const [events, setEvents] = useState<Event[]>([]);
  
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // When opening add modal, set date to today
  useEffect(() => {
    if (showAddModal) {
      const d = new Date();
      setAddEventDay(d.getDate());
      setAddEventMonth(d.getMonth());
      setAddEventYear(d.getFullYear());
    }
  }, [showAddModal]);

  // Clamp day when month/year change so date stays valid
  useEffect(() => {
    const maxDay = getDaysInMonth(addEventMonth, addEventYear);
    if (addEventDay > maxDay) setAddEventDay(maxDay);
  }, [addEventMonth, addEventYear]);

  // Fetch campus events for selected date when Add Event type is "event"
  // API returns { date, buildings: [{ building, rooms: [{ room, events: [...] }] }] }
  useEffect(() => {
    if (!showAddModal || addEventType !== 'event') return;
    let cancelled = false;
    setCampusEventsLoading(true);
    setCampusEvents([]);
    setSelectedCampusEvent(null);
    nebulaApi.cometCalendarEvents(addEventDate)
      .then(({ data }) => {
        if (cancelled) return;
        const flat: FlattenedCampusEvent[] = [];
        const buildings = (data as { buildings?: Array<{ building?: string; rooms?: Array<{ room?: string; events?: NebulaEvent[] }> }> })?.buildings;
        if (Array.isArray(buildings)) {
          for (const bldg of buildings) {
            const buildingName = bldg.building ?? '';
            const roomsList = bldg.rooms ?? [];
            for (const r of roomsList) {
              const roomName = r.room ?? '';
              const evts = r.events ?? [];
              evts.forEach((e: NebulaEvent, i: number) => {
                flat.push({
                  id: `${buildingName}-${roomName}-${i}-${e._id ?? ''}`,
                  summary: e.summary ?? 'Untitled',
                  start_time: e.start_time,
                  end_time: e.end_time,
                  location: e.location,
                  building: buildingName,
                  room: roomName,
                });
              });
            }
          }
        }
        setCampusEvents(flat);
      })
      .catch(() => {
        if (!cancelled) setCampusEvents([]);
      })
      .finally(() => {
        if (!cancelled) setCampusEventsLoading(false);
      });
    return () => { cancelled = true; };
  }, [showAddModal, addEventType, addEventDate]);

  // Fetch subject prefixes (for course path) when Add Event type is "course"
  useEffect(() => {
    if (!showAddModal || addEventType !== 'course') return;
    let cancelled = false;
    setSubjectPrefixesLoading(true);
    nebulaApi.autocompleteDAG()
      .then(({ data }) => {
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data
            .map((a: { subject_prefix?: string }) => a.subject_prefix)
            .filter((s): s is string => typeof s === 'string' && s.length > 0)
            .sort()
            .map((s) => ({ label: s, value: s }))
          : [];
        setSubjectPrefixes(list);
      })
      .catch(() => {
        if (!cancelled) setSubjectPrefixes([]);
      })
      .finally(() => {
        if (!cancelled) setSubjectPrefixesLoading(false);
      });
    return () => { cancelled = true; };
  }, [showAddModal, addEventType]);

  // Fetch courses when subject + class level selected (course path)
  useEffect(() => {
    if (addEventType !== 'course' || !selectedSubjectPrefix || !selectedClassLevel) {
      setCourses([]);
      setSelectedCourse(null);
      return;
    }
    let cancelled = false;
    setCoursesLoading(true);
    nebulaApi.courseSearch({ subject_prefix: selectedSubjectPrefix, class_level: selectedClassLevel })
      .then(({ data }) => {
        if (cancelled) return;
        setCourses(Array.isArray(data) ? data : []);
        setSelectedCourse(null);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      })
      .finally(() => {
        if (!cancelled) setCoursesLoading(false);
      });
    return () => { cancelled = true; };
  }, [addEventType, selectedSubjectPrefix, selectedClassLevel]);

  // Get current time for positioning
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    return {
      hours,
      minutes,
      totalMinutes,
      displayTime: `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`
    };
  };
  
  const currentTime = getCurrentTime();

  // Generate hours from 8 AM to 8 PM
  const generateHours = () => {
    const hours = [];
    for (let h = 8; h <= 20; h++) {
      hours.push(h);
    }
    return hours;
  };

  // Month view: use viewing month/year
  const daysInMonth = getDaysInMonth(viewingMonth, viewingYear);
  const viewingMonthName = new Date(viewingYear, viewingMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const generateMonthDays = () => {
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  };
  const isToday = (day: number) => {
    const d = new Date();
    return d.getDate() === day && d.getMonth() === viewingMonth && d.getFullYear() === viewingYear;
  };

  // Get events for specific day (in viewed month when in month view)
  const getEventsForDay = (day: number) => {
    const targetDate = `${viewingYear}-${String(viewingMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event) => event.date === targetDate);
  };

  function goToPresent() {
    const d = new Date();
    setDailyViewDate(getTodayDateString());
    setViewingMonth(d.getMonth());
    setViewingYear(d.getFullYear());
  }

  function changeDailyViewDay(delta: number) {
    const d = new Date(dailyViewDate + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    setDailyViewDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }

  function changeMonth(delta: number) {
    let m = viewingMonth + delta;
    let y = viewingYear;
    if (m > 11) { m = 0; y += 1; }
    if (m < 0) { m = 11; y -= 1; }
    setViewingMonth(m);
    setViewingYear(y);
  }

  function dailyViewDisplayDate(): string {
    const d = new Date(dailyViewDate + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  const HOUR_HEIGHT = Platform.OS === 'web' ? 44 : 52;
  const calculateEventPosition = (startHour: number, startMinute: number) => {
    const startMinutes = (startHour - 8) * 60 + startMinute;
    const top = startMinutes * (HOUR_HEIGHT / 60);
    const height = HOUR_HEIGHT;
    return { top, height };
  };

  function parseStartTime(start_time?: string): { hour: number; minute: number } {
    if (!start_time) return { hour: 9, minute: 0 };
    const match = start_time.match(/(\d{1,2}):(\d{2})/);
    if (match) return { hour: parseInt(match[1], 10), minute: parseInt(match[2], 10) };
    return { hour: 9, minute: 0 };
  }

  const generateRecurrenceDates = (baseDate: string, rec: RecurrenceType): string[] => {
    if (rec === 'none') return [baseDate];
    const dates = [];
    const base = new Date(baseDate + 'T12:00:00');
    
    // Create 30 days for daily, 15 weeks for weekly
    const count = rec === 'daily' ? 30 : 15;
    const increment = rec === 'daily' ? 1 : 7;
    
    for (let i = 0; i < count; i++) {
      const d = new Date(base.getTime());
      d.setDate(d.getDate() + (i * increment));
      dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
    }
    return dates;
  };

  const addNewEvent = () => {
    const datesToSchedule = generateRecurrenceDates(addEventDate, recurrence);
    let newEvents: Event[] = [];
    let nextId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;

    if (addEventType === 'event' && selectedCampusEvent) {
      const { hour, minute } = parseStartTime(selectedCampusEvent.start_time);
      const loc = selectedCampusEvent.location ?? `${selectedCampusEvent.building} ${selectedCampusEvent.room}`;
      
      datesToSchedule.forEach((dateStr) => {
        newEvents.push({
          id: nextId++,
          title: selectedCampusEvent.summary,
          location: loc,
          date: dateStr,
          startHour: hour,
          startMinute: minute,
        });
      });
      
      setEvents([...events, ...newEvents]);
      resetAddModal();
      Alert.alert('Success', `${datesToSchedule.length} campus event(s) added to your schedule!`);
      return;
    }
    if (addEventType === 'course' && selectedCourse) {
      const title = [selectedCourse.subject_prefix, selectedCourse.course_number].filter(Boolean).join(' ') + (selectedCourse.title ? ` - ${selectedCourse.title}` : '');
      
      datesToSchedule.forEach((dateStr) => {
        newEvents.push({
          id: nextId++,
          title: title.trim(),
          location: 'TBD',
          date: dateStr,
          startHour: 9,
          startMinute: 0,
        });
      });
      
      setEvents([...events, ...newEvents]);
      resetAddModal();
      Alert.alert('Success', `${datesToSchedule.length} course event(s) added to your schedule!`);
      return;
    }
    Alert.alert('Select an option', addEventType === 'event' ? 'Please select a campus event.' : 'Please select subject, class level, and course.');
  };

  function resetAddModal() {
    setShowAddModal(false);
    setAddEventType(null);
    setRecurrence('none');
    setSelectedCampusEvent(null);
    setSelectedSubjectPrefix(null);
    setSelectedClassLevel(null);
    setSelectedCourse(null);
    setDropdownOpen(null);
    const d = new Date();
    setAddEventDay(d.getDate());
    setAddEventMonth(d.getMonth());
    setAddEventYear(d.getFullYear());
  }

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      {/* Interactive Daily Schedule Grid */}
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.cardLabel}>
              {viewMode === 'today' ? 'Daily Schedule' : viewingMonthName}
            </Text>
            <Text style={styles.dateDisplay}>
              {viewMode === 'today' ? dailyViewDisplayDate() : 'Tap a day for details'}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              style={[styles.monthlyButton, styles.viewToggle, viewMode === 'today' && styles.viewButtonActive]}
              onPress={() => setViewMode('today')}
            >
              <Text style={[styles.monthlyText, viewMode === 'today' && { color: '#FFF' }]}>Daily</Text>
            </Pressable>
            <Pressable
              style={[styles.monthlyButton, styles.viewToggle, viewMode === 'month' && styles.viewButtonActive]}
              onPress={() => setViewMode('month')}
            >
              <Text style={[styles.monthlyText, viewMode === 'month' && { color: '#FFF' }]}>Monthly</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={() => setShowAddModal(true)}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
        
        {viewMode === 'today' ? (
          <>
            <View style={styles.dateNavRow}>
              <Pressable style={styles.navArrow} onPress={() => changeDailyViewDay(-1)}>
                <Ionicons name="chevron-back" size={24} color="#374151" />
              </Pressable>
              <Text style={styles.dateNavLabel} numberOfLines={1}>{dailyViewDisplayDate()}</Text>
              <Pressable style={styles.navArrow} onPress={() => changeDailyViewDay(1)}>
                <Ionicons name="chevron-forward" size={24} color="#374151" />
              </Pressable>
              <Pressable style={styles.todayButton} onPress={goToPresent}>
                <Text style={styles.todayButtonText}>Today</Text>
              </Pressable>
            </View>
            <View style={styles.timeGrid}>
              {dailyViewDate === todayDate && (() => {
                const minutesFrom8AM = (currentTime.hours - 8) * 60 + currentTime.minutes;
                const maxTop = 13 * HOUR_HEIGHT;
                const naturalTop = minutesFrom8AM * (HOUR_HEIGHT / 60);
                const top = Math.min(naturalTop, maxTop);
                const bubbleTop = Math.max(0, Math.min(top - 12, maxTop - 12));
                return (
                  <>
                    <View style={[styles.currentTimeLine, { top }]} />
                    <View style={[styles.currentTimeBubble, { top: bubbleTop }]}>
                      <Text style={styles.currentTimeText}>{currentTime.displayTime}</Text>
                    </View>
                  </>
                );
              })()}
              {generateHours().map((hour) => (
                <View key={hour} style={styles.hourLine}>
                  <Text style={styles.hourLabel}>
                    {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                  </Text>
                </View>
              ))}
              {events.filter((event) => event.date === dailyViewDate).map((event) => {
                const position = calculateEventPosition(event.startHour, event.startMinute);
                return (
                  <View
                    key={event.id}
                    style={[styles.eventBlock, { top: position.top, height: position.height }]}
                  >
                    <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.eventLocation} numberOfLines={1}>{event.location}</Text>
                  </View>
                );
              })}
              {events.filter((e) => e.date === dailyViewDate).length === 0 && (
                <View style={styles.scheduleEmpty}>
                  <Text style={styles.scheduleEmptyText}>No events this day. Tap + to add one.</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.dateNavRow}>
              <Pressable style={styles.navArrow} onPress={() => changeMonth(-1)}>
                <Ionicons name="chevron-back" size={24} color="#374151" />
              </Pressable>
              <Text style={styles.dateNavLabel} numberOfLines={1}>{viewingMonthName}</Text>
              <Pressable style={styles.navArrow} onPress={() => changeMonth(1)}>
                <Ionicons name="chevron-forward" size={24} color="#374151" />
              </Pressable>
              <Pressable style={styles.todayButton} onPress={goToPresent}>
                <Text style={styles.todayButtonText}>Today</Text>
              </Pressable>
            </View>
            <View style={styles.monthGrid}>
              <View style={styles.weekDays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, index) => (
                  <View key={d} style={[styles.weekDay, index === new Date().getDay() && styles.weekDayCurrent]}>
                    <Text style={[styles.weekDayText, index === new Date().getDay() && styles.weekDayCurrent]}>
                      {d}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.monthDays}>
              {generateMonthDays().map((day) => {
                const dayEvents = getEventsForDay(day);
                const todayFlag = isToday(day);
                
                return (
                  <Pressable
                    key={day}
                    style={[
                      styles.monthDay,
                      selectedDay === day && styles.monthDaySelected,
                      todayFlag && styles.monthDayToday,
                      dayEvents.length > 0 && styles.monthDayHasEvents,
                    ]}
                    onPress={() => setSelectedDay(selectedDay === day ? null : day)}
                  >
                    <Text style={[styles.monthDayText, todayFlag && styles.monthDayTodayText]}>
                      {day}
                    </Text>
                    {dayEvents.length > 0 && (
                      <View style={styles.monthDayEvent} />
                    )}
                  </Pressable>
                );
              })}
              </View>
            </View>
            {selectedDay != null && (
              <View style={styles.dayDetailBelow}>
                <Text style={styles.dayDetailTitle}>
                  {new Date(viewingYear, viewingMonth, selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </Text>
                <View style={styles.dayDetailEvents}>
                  {getEventsForDay(selectedDay).length === 0 ? (
                    <Text style={styles.scheduleEmptyText}>No events this day.</Text>
                  ) : (
                    getEventsForDay(selectedDay).map((event) => (
                      <View key={event.id} style={styles.dayDetailEvent}>
                        <Text style={styles.dayDetailEventTitle}>{event.title}</Text>
                        <Text style={styles.dayDetailEventTime}>{event.startHour}:{event.startMinute.toString().padStart(2, '0')} {event.startHour >= 12 ? 'PM' : 'AM'}</Text>
                        <Text style={styles.dayDetailEventLocation}>{event.location}</Text>
                      </View>
                    ))
                  )}
                </View>
                <Pressable style={styles.todayButton} onPress={() => setSelectedDay(null)}>
                  <Text style={styles.todayButtonText}>Clear selection</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </View>

      {/* Add Event Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={resetAddModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>

            {/* Day / Month / Year dropdowns – must be set before choosing type */}
            <Text style={{ marginBottom: 8, color: theme.colors.textSecondary, fontSize: 14 }}>Date</Text>
            <View style={styles.dateDropdownRow}>
              <View style={styles.dateDropdownThird}>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setDropdownOpen((o) => (o === 'day' ? null : 'day'))}
                >
                  <Text style={styles.dropdownValue}>{addEventDay}</Text>
                  <Ionicons name="chevron-down" size={18} color="#6B7280" />
                </Pressable>
              </View>
              <View style={styles.dateDropdownThird}>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setDropdownOpen((o) => (o === 'month' ? null : 'month'))}
                >
                  <Text style={styles.dropdownValue} numberOfLines={1}>{MONTH_NAMES[addEventMonth]}</Text>
                  <Ionicons name="chevron-down" size={18} color="#6B7280" />
                </Pressable>
              </View>
              <View style={styles.dateDropdownThird}>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setDropdownOpen((o) => (o === 'year' ? null : 'year'))}
                >
                  <Text style={styles.dropdownValue}>{addEventYear}</Text>
                  <Ionicons name="chevron-down" size={18} color="#6B7280" />
                </Pressable>
              </View>
            </View>

            {/* Day dropdown modal */}
            {dropdownOpen === 'day' && (() => {
              const daysInSelectedMonth = getDaysInMonth(addEventMonth, addEventYear);
              return (
                <Modal visible transparent animationType="fade">
                  <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                    <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                      <ScrollView style={{ maxHeight: 280 }}>
                        {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => (
                          <Pressable key={d} style={styles.dropdownItem} onPress={() => { setAddEventDay(d); setDropdownOpen(null); }}>
                            <Text style={styles.dropdownItemText}>{d}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </Pressable>
                  </Pressable>
                </Modal>
              );
            })()}
            {dropdownOpen === 'month' && (
              <Modal visible transparent animationType="fade">
                <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                  <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                    <ScrollView style={{ maxHeight: 280 }}>
                      {MONTH_NAMES.map((name, i) => (
                        <Pressable key={name} style={styles.dropdownItem} onPress={() => { setAddEventMonth(i); setDropdownOpen(null); }}>
                          <Text style={styles.dropdownItemText}>{name}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </Pressable>
                </Pressable>
              </Modal>
            )}
            {dropdownOpen === 'year' && (
              <Modal visible transparent animationType="fade">
                <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                  <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                    <ScrollView style={{ maxHeight: 280 }}>
                      {getYears().map((y) => (
                        <Pressable key={y} style={styles.dropdownItem} onPress={() => { setAddEventYear(y); setDropdownOpen(null); }}>
                          <Text style={styles.dropdownItemText}>{y}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </Pressable>
                </Pressable>
              </Modal>
            )}

            <Text style={{ marginBottom: 8, color: theme.colors.textSecondary, fontSize: 14 }}>Recurrence</Text>
            <View style={styles.typeSelectorRow}>
              <Pressable
                style={[styles.typeButton, recurrence === 'none' ? styles.typeButtonActive : styles.typeButtonInactive, { paddingVertical: 8 }]}
                onPress={() => setRecurrence('none')}
              >
                <Text style={[styles.typeButtonText, { color: recurrence === 'none' ? theme.colors.primary : theme.colors.textSecondary }]}>None</Text>
              </Pressable>
              <Pressable
                style={[styles.typeButton, recurrence === 'daily' ? styles.typeButtonActive : styles.typeButtonInactive, { paddingVertical: 8 }]}
                onPress={() => setRecurrence('daily')}
              >
                <Text style={[styles.typeButtonText, { color: recurrence === 'daily' ? theme.colors.primary : theme.colors.textSecondary }]}>Daily</Text>
              </Pressable>
              <Pressable
                style={[styles.typeButton, recurrence === 'weekly' ? styles.typeButtonActive : styles.typeButtonInactive, { paddingVertical: 8 }]}
                onPress={() => setRecurrence('weekly')}
              >
                <Text style={[styles.typeButtonText, { color: recurrence === 'weekly' ? theme.colors.primary : theme.colors.textSecondary }]}>Weekly</Text>
              </Pressable>
            </View>

            {(() => {
              const daysInSelected = getDaysInMonth(addEventMonth, addEventYear);
              const dateReady = addEventDay >= 1 && addEventDay <= daysInSelected;
              return addEventType === null ? (
                <>
                  <Text style={{ marginBottom: 12, color: theme.colors.textSecondary, fontSize: 14 }}>What would you like to add?</Text>
                  <View style={styles.typeSelectorRow}>
                    <Pressable
                      style={[styles.typeButton, dateReady ? styles.typeButtonInactive : styles.typeButtonDisabled]}
                      onPress={() => dateReady && setAddEventType('event')}
                      disabled={!dateReady}
                    >
                      <Text style={[styles.typeButtonText, { color: dateReady ? theme.colors.text : theme.colors.textSecondary }]}>Campus Event</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.typeButton, dateReady ? styles.typeButtonInactive : styles.typeButtonDisabled]}
                      onPress={() => dateReady && setAddEventType('course')}
                      disabled={!dateReady}
                    >
                      <Text style={[styles.typeButtonText, { color: dateReady ? theme.colors.text : theme.colors.textSecondary }]}>Course</Text>
                    </Pressable>
                  </View>
                </>
              ) : null;
            })()}

            {addEventType === 'event' ? (
              <>
                <Pressable onPress={() => setAddEventType(null)} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 13, color: theme.colors.primary }}>← Back (change type)</Text>
                </Pressable>
                <Text style={{ marginBottom: 12, color: theme.colors.textSecondary, fontSize: 14 }}>Events on this date (from Nebula)</Text>
                {campusEventsLoading ? (
                  <ActivityIndicator size="small" color="#C75B12" style={{ marginVertical: 16 }} />
                ) : (
                  <Pressable
                    style={styles.dropdownTrigger}
                    onPress={() => setDropdownOpen((o) => (o === 'campus' ? null : 'campus'))}
                  >
                    <Text style={selectedCampusEvent ? styles.dropdownValue : styles.dropdownPlaceholder}>
                      {selectedCampusEvent ? `${selectedCampusEvent.summary}${selectedCampusEvent.start_time ? ` (${selectedCampusEvent.start_time})` : ''}` : 'Select an event'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#6B7280" />
                  </Pressable>
                )}
                {dropdownOpen === 'campus' && (
                  <Modal visible transparent animationType="fade">
                    <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                      <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                        <ScrollView style={{ maxHeight: 300 }}>
                          {campusEvents.length === 0 && !campusEventsLoading && (
                            <View style={styles.dropdownItem}>
                              <Text style={styles.dropdownItemText}>No events on this date</Text>
                            </View>
                          )}
                          {campusEvents.map((ev) => (
                            <Pressable
                              key={ev.id}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setSelectedCampusEvent(ev);
                                setDropdownOpen(null);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>{ev.summary}</Text>
                              <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 }}>
                                {ev.start_time ?? ''} {ev.building} {ev.room}
                              </Text>
                            </Pressable>
                          ))}
                        </ScrollView>
                      </Pressable>
                    </Pressable>
                  </Modal>
                )}
              </>
            ) : (
              <>
                <Pressable onPress={() => setAddEventType(null)} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 13, color: theme.colors.primary }}>← Back (change type)</Text>
                </Pressable>
                <Text style={{ marginBottom: 12, color: theme.colors.textSecondary, fontSize: 14 }}>Narrow down by subject and level, then pick a course</Text>
                {subjectPrefixesLoading ? (
                  <View style={{ marginVertical: 16, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#C75B12" />
                    <Text style={{ marginTop: 8, fontSize: 13, color: theme.colors.textSecondary }}>Loading options…</Text>
                  </View>
                ) : (
                  <>
                    <Pressable
                      style={styles.dropdownTrigger}
                      onPress={() => setDropdownOpen((o) => (o === 'subject' ? null : 'subject'))}
                    >
                      <Text style={selectedSubjectPrefix ? styles.dropdownValue : styles.dropdownPlaceholder}>
                        {selectedSubjectPrefix ?? 'Subject prefix'}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </Pressable>
                    <Pressable
                      style={styles.dropdownTrigger}
                      onPress={() => setDropdownOpen((o) => (o === 'class' ? null : 'class'))}
                    >
                      <Text style={selectedClassLevel ? styles.dropdownValue : styles.dropdownPlaceholder}>
                        {selectedClassLevel ?? 'Class level'}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </Pressable>
                  </>
                )}
                {!subjectPrefixesLoading && selectedSubjectPrefix && selectedClassLevel && (
                  coursesLoading ? (
                    <View style={{ marginVertical: 16, alignItems: 'center' }}>
                      <ActivityIndicator size="small" color="#C75B12" />
                      <Text style={{ marginTop: 8, fontSize: 13, color: theme.colors.textSecondary }}>Loading courses…</Text>
                    </View>
                  ) : courses.length === 0 ? (
                    <Text style={{ marginVertical: 12, fontSize: 14, color: theme.colors.textSecondary }}>No courses found for this subject and level.</Text>
                  ) : (
                    <Pressable
                      style={styles.dropdownTrigger}
                      onPress={() => setDropdownOpen((o) => (o === 'course' ? null : 'course'))}
                    >
                      <Text style={selectedCourse ? styles.dropdownValue : styles.dropdownPlaceholder}>
                        {selectedCourse ? `${selectedCourse.subject_prefix} ${selectedCourse.course_number} – ${selectedCourse.title ?? ''}` : 'Select course'}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </Pressable>
                  )
                )}
                {dropdownOpen === 'subject' && (
                  <Modal visible transparent animationType="fade">
                    <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                      <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                        <ScrollView style={{ maxHeight: 300 }}>
                          {subjectPrefixes.map((p) => (
                            <Pressable
                              key={p.value}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setSelectedSubjectPrefix(p.value);
                                setDropdownOpen(null);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>{p.label}</Text>
                            </Pressable>
                          ))}
                        </ScrollView>
                      </Pressable>
                    </Pressable>
                  </Modal>
                )}
                {dropdownOpen === 'class' && (
                  <Modal visible transparent animationType="fade">
                    <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                      <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                        <ScrollView style={{ maxHeight: 300 }}>
                          {CLASS_LEVELS.map((l) => (
                            <Pressable
                              key={l}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setSelectedClassLevel(l);
                                setDropdownOpen(null);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>{l}</Text>
                            </Pressable>
                          ))}
                        </ScrollView>
                      </Pressable>
                    </Pressable>
                  </Modal>
                )}
                {dropdownOpen === 'course' && (
                  <Modal visible transparent animationType="fade">
                    <Pressable style={styles.dropdownModal} onPress={() => setDropdownOpen(null)}>
                      <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                        <ScrollView style={{ maxHeight: 300 }}>
                          {courses.map((c) => (
                            <Pressable
                              key={c._id ?? `${c.subject_prefix}-${c.course_number}`}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setSelectedCourse(c);
                                setDropdownOpen(null);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>
                                {c.subject_prefix} {c.course_number} – {c.title ?? ''}
                              </Text>
                            </Pressable>
                          ))}
                        </ScrollView>
                      </Pressable>
                    </Pressable>
                  </Modal>
                )}
              </>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={resetAddModal}>
                <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
              </Pressable>
              {addEventType !== null && (
                <Pressable style={[styles.modalButton, styles.saveButton]} onPress={addNewEvent}>
                  <Text style={[styles.buttonText, styles.saveText]}>Add Event</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
