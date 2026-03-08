import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponsiveButton as Pressable } from '../components/ResponsiveButton';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { STORAGE_KEYS } from '../context/storageKeys';

export const SettingsScreen: React.FC = () => {
  const { theme, isDark, setDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView contentContainerStyle={[styles.screenPad, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Preferences</Text>
      <View style={[styles.menuCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
          <Ionicons name="notifications-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          />
        </View>
        <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
          <Ionicons name="moon-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={setDarkMode}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.surface}
          />
        </View>
        <View style={[styles.menuItem, { borderBottomColor: 'transparent' }]}>
          <Ionicons name="globe-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Language</Text>
          <Text style={[styles.menuValue, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>English</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </View>
      </View>

      <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Academic</Text>
      <View style={[styles.menuCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
          <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Default Calendar View</Text>
          <Text style={[styles.menuValue, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Week</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </View>
        <View style={[styles.menuItem, { borderBottomColor: 'transparent' }]}>
          <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Time Format</Text>
          <Text style={[styles.menuValue, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>12-hour</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </View>
      </View>

      <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Privacy</Text>
      <View style={[styles.menuCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
          <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </View>
        <View style={[styles.menuItem, { borderBottomColor: 'transparent' }]}>
          <Ionicons name="download-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.menuLabel, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Download My Data</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  sectionLabel: {
    marginBottom: 12,
  },
  menuCard: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuLabel: {
    flex: 1,
    marginLeft: 12,
  },
  menuValue: {
  },
});

export const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED).then((v) => {
      setNotificationsEnabled(v !== 'false');
    }).catch(() => {});
  }, []);

  const onNotificationsChange = (value: boolean) => {
    setNotificationsEnabled(value);
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, value ? 'true' : 'false').catch(() => {});
  };

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>Preferences</Text>
      <View style={styles.menuCard}>
        <View style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Leave-now reminders</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={onNotificationsChange}
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
