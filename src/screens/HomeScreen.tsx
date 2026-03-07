import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenProps } from '../types/navigation';

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
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  quickActionBtn: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  quickActionText: {
    color: '#4B5563',
    fontSize: 14,
    marginTop: 4,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  courseText: {
    marginLeft: 8,
    color: '#4B5563',
  },
  flexRow: {
    flexDirection: 'row',
  },
  spaceX: {
    justifyContent: 'space-between',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
});

export const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      {/* Overall Progress */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Overall Progress</Text>
        <View style={[styles.progressBar, styles.progressBarBg, { marginBottom: 12 }]}>
          <View style={[styles.progressBar, styles.progressBarFill, { width: '66%' }]} />
        </View>
        <Text style={{ color: '#6B7280', fontSize: 14 }}>66% Complete • 2 years remaining</Text>
      </View>

      {/* Current Semester */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Spring 2024</Text>
        <Text style={{ color: '#6B7280', marginBottom: 12 }}>12 credits • 4 courses</Text>
        <View>
          <View style={styles.courseRow}>
            <Ionicons name="book" size={16} color="#6B7280" />
            <Text style={styles.courseText}>CS 4341 - Machine Learning</Text>
          </View>
          <View style={styles.courseRow}>
            <Ionicons name="book" size={16} color="#6B7280" />
            <Text style={styles.courseText}>CS 4365 - Programming Languages</Text>
          </View>
          <View style={styles.courseRow}>
            <Ionicons name="book" size={16} color="#6B7280" />
            <Text style={styles.courseText}>MATH 3310 - Linear Algebra</Text>
          </View>
          <View style={styles.courseRow}>
            <Ionicons name="book" size={16} color="#6B7280" />
            <Text style={styles.courseText}>PHYS 2325 - Mechanics</Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <Text style={styles.sectionLabel}>Quick Stats</Text>
      <View style={[styles.flexRow, styles.spaceX, { marginBottom: 16 }]}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>84</Text>
          <Text style={styles.statLabel}>Credits Earned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3.2</Text>
          <Text style={styles.statLabel}>GPA</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>36</Text>
          <Text style={styles.statLabel}>Credits Left</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionLabel}>Quick Actions</Text>
      <View style={[styles.flexRow, styles.flexWrap, styles.spaceX]}>
        <Pressable style={styles.quickActionBtn}>
          <Ionicons name="calendar" size={24} color="#4B5563" />
          <Text style={styles.quickActionText}>View Schedule</Text>
        </Pressable>
        <Pressable style={styles.quickActionBtn}>
          <Ionicons name="search" size={24} color="#4B5563" />
          <Text style={styles.quickActionText}>Search Courses</Text>
        </Pressable>
        <Pressable style={styles.quickActionBtn}>
          <Ionicons name="chatbubbles" size={24} color="#4B5563" />
          <Text style={styles.quickActionText}>AI Assistant</Text>
        </Pressable>
        <Pressable style={styles.quickActionBtn}>
          <Ionicons name="document-text" size={24} color="#4B5563" />
          <Text style={styles.quickActionText}>Transcript</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
