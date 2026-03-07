import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#4B5563',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterBtn: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    color: '#6B7280',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  courseItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  courseName: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 16,
  },
  courseCode: {
    color: '#6B7280',
    fontSize: 14,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  creditsText: {
    color: '#6B7280',
    fontSize: 12,
  },
  prereqText: {
    color: '#6B7280',
    fontSize: 12,
  },
});

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  prerequisites?: string;
  offered: string;
}

export const CoursesScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const courses: Course[] = [
    { id: 1, code: 'CS 4341', name: 'Machine Learning', credits: 3, prerequisites: 'CS 3305', offered: 'Fall, Spring' },
    { id: 2, code: 'CS 4365', name: 'Programming Languages', credits: 3, prerequisites: 'CS 3305', offered: 'Fall' },
    { id: 3, code: 'CS 4384', name: 'Automata Theory', credits: 3, prerequisites: 'CS 3305', offered: 'Spring' },
    { id: 4, code: 'CS 4390', name: 'Senior Design', credits: 3, prerequisites: 'Senior Standing', offered: 'Fall, Spring' },
    { id: 5, code: 'MATH 3310', name: 'Linear Algebra', credits: 3, prerequisites: 'MATH 2417', offered: 'Fall, Spring' },
    { id: 6, code: 'PHYS 2325', name: 'Mechanics', credits: 3, prerequisites: 'PHYS 2326', offered: 'Fall, Spring' },
  ];

  const filters = ['All', 'CS', 'MATH', 'PHYS', 'Available'];
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                         (activeFilter === 'Available' && course.offered.includes('Spring')) ||
                         course.code.startsWith(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search courses..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterBtn,
              activeFilter === filter && styles.filterBtnActive
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Course List */}
      {filteredCourses.map((course) => (
        <Pressable key={course.id} style={styles.courseItem}>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.courseCode}>{course.code}</Text>
          <View style={styles.courseMeta}>
            <Text style={styles.creditsText}>{course.credits} credits</Text>
            <Text style={styles.prereqText}>Offered: {course.offered}</Text>
          </View>
          {course.prerequisites && (
            <Text style={styles.prereqText}>Prereq: {course.prerequisites}</Text>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
};
