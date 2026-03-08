import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ScheduleScreen: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <ScrollView contentContainerStyle={[styles.screenPad, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Week View</Text>
      <View style={styles.weekView}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
          <View 
            key={day} 
            style={[styles.dayButton, { backgroundColor: theme.colors.surface }, index === 1 && [styles.dayButtonActive, { backgroundColor: theme.colors.primary }]]}
          >
            <Text style={[styles.dayText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }, index === 1 && [styles.dayTextActive, { color: theme.colors.surface, fontFamily: theme.fonts.semiBold }]]}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Today's Schedule</Text>
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={[styles.timeSlot, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.timeLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>9:00 AM</Text>
          <View style={[styles.eventItem, { backgroundColor: theme.colors.background, borderLeftColor: theme.colors.primary, borderLeftWidth: 3 }]}>
            <Text style={[styles.eventText, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>CS 4341 - Machine Learning</Text>
            <Text style={[styles.eventText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Room: ECS 2.314</Text>
          </View>
        </View>
        <View style={[styles.timeSlot, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.timeLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>11:00 AM</Text>
          <View style={[styles.eventItem, { backgroundColor: theme.colors.background, borderLeftColor: theme.colors.primary, borderLeftWidth: 3 }]}>
            <Text style={[styles.eventText, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>CS 4365 - Programming Languages</Text>
            <Text style={[styles.eventText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Room: ECS 1.350</Text>
          </View>
        </View>
        <View style={[styles.timeSlot, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.timeLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>2:00 PM</Text>
          <View style={[styles.eventItem, { backgroundColor: theme.colors.background, borderLeftColor: theme.colors.primary, borderLeftWidth: 3 }]}>
            <Text style={[styles.eventText, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>MATH 3310 - Linear Algebra</Text>
            <Text style={[styles.eventText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Room: FO 2.402</Text>
          </View>
        </View>
        <View style={[styles.timeSlot, { borderBottomColor: 'transparent' }]}>
          <Text style={[styles.timeLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>4:00 PM</Text>
          <View style={[styles.eventItem, { backgroundColor: theme.colors.background, borderLeftColor: theme.colors.primary, borderLeftWidth: 3 }]}>
            <Text style={[styles.eventText, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>PHYS 2325 - Mechanics</Text>
            <Text style={[styles.eventText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Room: SCI 1.230</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionLabel: {
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
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  dayButtonActive: {
  },
  dayText: {
    fontSize: 12,
  },
  dayTextActive: {
  },
  timeSlot: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  timeLabel: {
    width: 60,
    fontSize: 14,
  },
  eventItem: {
    borderRadius: 4,
    padding: 8, // Increased padding
    marginBottom: 4,
    flex: 1,
  },
  eventText: {
    fontSize: 12,
  },
});

