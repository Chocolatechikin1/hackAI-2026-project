import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  sectionLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLabel: {
    flex: 1,
    color: '#374151',
    marginLeft: 12,
  },
  menuValue: {
    color: '#6B7280',
  },
  toggle: {
    width: 48,
    height: 24,
    backgroundColor: '#D1D5DB',
    borderRadius: 12,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 2,
  },
});

export const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>Preferences</Text>
      <View style={styles.menuCard}>
        <View style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="moon-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="globe-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Language</Text>
          <Text style={styles.menuValue}>English</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      <Text style={styles.sectionLabel}>Academic</Text>
      <View style={styles.menuCard}>
        <View style={styles.menuItem}>
          <Ionicons name="calendar-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Default Calendar View</Text>
          <Text style={styles.menuValue}>Week</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="time-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Time Format</Text>
          <Text style={styles.menuValue}>12-hour</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      <Text style={styles.sectionLabel}>Privacy</Text>
      <View style={styles.menuCard}>
        <View style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="download-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Download My Data</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>
    </ScrollView>
  );
};
