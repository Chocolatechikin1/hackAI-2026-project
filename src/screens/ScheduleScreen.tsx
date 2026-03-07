import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

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
  sectionLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 12,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  dayButtonActive: {
    backgroundColor: '#3B82F6',
  },
  dayText: {
    fontSize: 12,
    color: '#6B7280',
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  timeSlot: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 8,
    flexDirection: 'row',
  },
  timeLabel: {
    width: 60,
    color: '#6B7280',
    fontSize: 14,
  },
  eventItem: {
    backgroundColor: '#DBEAFE',
    borderRadius: 4,
    padding: 4,
    marginBottom: 4,
    flex: 1,
  },
  eventText: {
    fontSize: 12,
    color: '#1E40AF',
  },
});

export const ScheduleScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>Week View</Text>
      <View style={styles.weekView}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
          <View 
            key={day} 
            style={[styles.dayButton, index === 1 && styles.dayButtonActive]}
          >
            <Text style={[styles.dayText, index === 1 && styles.dayTextActive]}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Today's Schedule</Text>
      <View style={styles.card}>
        <View style={styles.timeSlot}>
          <Text style={styles.timeLabel}>9:00 AM</Text>
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>CS 4341 - Machine Learning</Text>
            <Text style={styles.eventText}>Room: ECS 2.314</Text>
          </View>
        </View>
        <View style={styles.timeSlot}>
          <Text style={styles.timeLabel}>11:00 AM</Text>
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>CS 4365 - Programming Languages</Text>
            <Text style={styles.eventText}>Room: ECS 1.350</Text>
          </View>
        </View>
        <View style={styles.timeSlot}>
          <Text style={styles.timeLabel}>2:00 PM</Text>
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>MATH 3310 - Linear Algebra</Text>
            <Text style={styles.eventText}>Room: FO 2.402</Text>
          </View>
        </View>
        <View style={styles.timeSlot}>
          <Text style={styles.timeLabel}>4:00 PM</Text>
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>PHYS 2325 - Mechanics</Text>
            <Text style={styles.eventText}>Room: SCI 1.230</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
