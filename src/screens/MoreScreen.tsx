import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
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
  sectionLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 12,
  },
});

export const MoreScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const openSubScreen = (screen: 'Profile' | 'Settings' | 'Help') => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>Account</Text>
      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem} onPress={() => openSubScreen('Profile')}>
          <Ionicons name="person" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>
        <Pressable style={styles.menuItem} onPress={() => openSubScreen('Settings')}>
          <Ionicons name="settings" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Support</Text>
      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem} onPress={() => openSubScreen('Help')}>
          <Ionicons name="help-circle" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="document-text" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="shield" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>About</Text>
      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="information-circle" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>App Version</Text>
          <Text style={styles.menuValue}>1.0.0</Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="school" size={20} color="#4B5563" />
          <Text style={styles.menuLabel}>University</Text>
          <Text style={styles.menuValue}>UT Dallas</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
