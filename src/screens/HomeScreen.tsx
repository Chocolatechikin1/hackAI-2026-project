import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressBarBg: {
    backgroundColor: '#E5E7EB',
  },
  progressBarFill: {
    backgroundColor: '#3B82F6',
  },
  sectionLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 12,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 500,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  monthlyButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  monthlyText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  timeGrid: {
    flex: 1,
    position: 'relative',
  },
  hourLine: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    minHeight: 60,
  },
  hourLabel: {
    width: 60,
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 8,
  },
  currentTimeLine: {
    position: 'absolute',
    left: 60,
    right: 0,
    height: 2,
    backgroundColor: '#EF4444',
    zIndex: 10,
  },
  currentTimeBubble: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 11,
  },
  currentTimeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  eventBlock: {
    position: 'absolute',
    left: 70,
    right: 16,
    backgroundColor: '#DBEAFE',
    borderRadius: 6,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  eventTitle: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 2,
  },
  eventLocation: {
    color: '#1E40AF',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#1F2937',
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
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cancelText: {
    color: '#6B7280',
  },
  saveText: {
    color: '#FFFFFF',
  },
  dayDetailModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayDetailContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  dayDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  dayDetailDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  dayDetailEvents: {
    marginBottom: 16,
  },
  dayDetailEvent: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  dayDetailEventTitle: {
    color: '#1F2937',
    fontWeight: '500',
    fontSize: 14,
  },
  dayDetailEventLocation: {
    color: '#6B7280',
    fontSize: 12,
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  monthGrid: {
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    paddingVertical: 8,
  borderRadius: 6,
  backgroundColor: '#F3F4F6',
  },
  weekDayCurrent: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
  },
  monthDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthDay: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: '1%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  monthDayToday: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  monthDayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  monthDayTodayText: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  monthDayEvent: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EF4444',
    marginTop: 2,
  },
});

// Mock database for events
interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  startHour: number;
  startMinute: number;
}

export const HomeScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'today' | 'month'>('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventHour, setNewEventHour] = useState('9');
  const [newEventMinute, setNewEventMinute] = useState('0');
  const [newEventDay, setNewEventDay] = useState('1');
  
  // Mock database for events
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'CS 4341 - Machine Learning', location: 'ECS 2.314', date: '2024-03-07', startHour: 9, startMinute: 0 },
    { id: 2, title: 'CS 4365 - Programming Languages', location: 'ECS 1.350', date: '2024-03-07', startHour: 11, startMinute: 0 },
    { id: 3, title: 'MATH 3310 - Linear Algebra', location: 'FO 2.402', date: '2024-03-07', startHour: 14, startMinute: 0 },
    { id: 4, title: 'PHYS 2325 - Mechanics', location: 'SCI 1.230', date: '2024-03-07', startHour: 16, startMinute: 0 },
    { id: 5, title: 'Team Meeting', location: 'Student Union', date: '2024-03-10', startHour: 10, startMinute: 0 },
    { id: 6, title: 'Study Group', location: 'Library', date: '2024-03-15', startHour: 15, startMinute: 0 },
  ]);
  
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);
  
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

  // Generate month days
  const generateMonthDays = () => {
    const days = [];
    const daysInMonth = 31; // March 2024
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  };

  // Get events for specific day
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDay = parseInt(event.date.split('-')[2]);
      return eventDay === day;
    });
  };

  const calculateEventPosition = (startHour: number, startMinute: number) => {
    const startMinutes = (startHour - 8) * 60 + startMinute;
    const top = startMinutes * (60 / 60); // 60px per hour
    const height = 75; // 1 hour 15 minutes = 75px
    return { top, height };
  };

  const addNewEvent = () => {
    if (newEventTitle.trim() && newEventLocation.trim()) {
      const today = new Date().toISOString().split('T')[0];
      const newClass: Event = {
        id: events.length + 1,
        title: newEventTitle,
        location: newEventLocation,
        date: today,
        startHour: parseInt(newEventHour),
        startMinute: parseInt(newEventMinute),
      };
      setEvents([...events, newClass]);
      
      // Reset form
      setNewEventTitle('');
      setNewEventLocation('');
      setNewEventHour('9');
      setNewEventMinute('0');
      setNewEventDay('1');
      setShowAddModal(false);
      
      Alert.alert('Success', 'Event added successfully!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      {/* Interactive Daily Schedule Grid */}
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.cardLabel}>Today's Schedule</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable 
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable 
              style={styles.monthlyButton}
              onPress={() => setViewMode('month')}
            >
              <Text style={styles.monthlyText}>Monthly View</Text>
            </Pressable>
          </View>
        </View>
        
        {viewMode === 'today' ? (
          <View style={styles.timeGrid}>
            {/* Current time indicator */}
            <View 
              style={[
                styles.currentTimeLine, 
                { top: ((currentTime.hours - 8) * 60 + currentTime.minutes) * (60 / 60) }
              ]} 
            />
            <View 
              style={[
                styles.currentTimeBubble,
                { top: ((currentTime.hours - 8) * 60 + currentTime.minutes) * (60 / 60) - 12 }
              ]}
            >
              <Text style={styles.currentTimeText}>{currentTime.displayTime}</Text>
            </View>
            
            {/* Hour lines */}
            {generateHours().map((hour) => (
              <View key={hour} style={styles.hourLine}>
                <Text style={styles.hourLabel}>
                  {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                </Text>
              </View>
            ))}
            
            {/* Today's events */}
            {events.filter(event => event.date === new Date().toISOString().split('T')[0]).map((event) => {
              const position = calculateEventPosition(event.startHour, event.startMinute);
              return (
                <View
                  key={event.id}
                  style={[
                    styles.eventBlock,
                    { top: position.top, height: position.height }
                  ]}
                >
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.monthGrid}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>March 2024</Text>
              <Pressable 
                style={styles.addButton}
                onPress={() => setShowAddModal(true)}
              >
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
            
            {/* Week days header */}
            <View style={styles.weekDays}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <View key={day} style={[styles.weekDay, index === new Date().getDay() && styles.weekDayCurrent]}>
                  <Text style={[styles.weekDay, index === new Date().getDay() && styles.weekDayCurrent]}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            
            {/* Month days grid */}
            <View style={styles.monthDays}>
              {generateMonthDays().map((day) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === new Date().getDate();
                
                return (
                  <Pressable key={day} style={[styles.monthDay, isToday && styles.monthDayToday]} onPress={() => {
                    setSelectedDay(day);
                    setShowDayDetail(true);
                  }}>
                    <Text style={[styles.monthDayText, isToday && styles.monthDayTodayText]}>
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
        )}
      </View>

      {/* Day Detail Modal */}
      <Modal
        visible={showDayDetail}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowDayDetail(false);
          setSelectedDay(null);
        }}
      >
        <View style={styles.dayDetailModal}>
          <View style={styles.dayDetailContent}>
            <Text style={styles.dayDetailTitle}>Day {selectedDay}</Text>
            <Text style={styles.dayDetailDate}>March 2024</Text>
            
            <View style={styles.dayDetailEvents}>
              {getEventsForDay(selectedDay || 1).map((event, index) => (
                <View key={index} style={styles.dayDetailEvent}>
                  <Text style={styles.dayDetailEventTitle}>{event.title}</Text>
                  <Text style={styles.dayDetailEventTime}>{event.startHour}:{event.startMinute.toString().padStart(2, '0')} {event.startHour >= 12 ? 'PM' : 'AM'}</Text>
                  <Text style={styles.dayDetailEventLocation}>{event.location}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.closeButton}>
              <Pressable onPress={() => {
                setShowDayDetail(false);
                setSelectedDay(null);
              }}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newEventLocation}
              onChangeText={setNewEventLocation}
            />
            
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="Hour"
                value={newEventHour}
                onChangeText={setNewEventHour}
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Minute"
                value={newEventMinute}
                onChangeText={setNewEventMinute}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            
            {viewMode === 'month' && (
              <TextInput
                style={styles.input}
                placeholder="Day (1-31)"
                value={newEventDay}
                onChangeText={setNewEventDay}
                keyboardType="numeric"
                maxLength={2}
              />
            )}
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#F3F4F6', marginRight: 8 }]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7280' }}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#3B82F6', marginLeft: 8 }]}
                onPress={addNewEvent}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Add Event</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
