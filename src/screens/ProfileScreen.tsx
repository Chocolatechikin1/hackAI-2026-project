import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#6B7280',
    marginBottom: 4,
  },
  profileId: {
    color: '#9CA3AF',
    fontSize: 14,
  },
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#6B7280',
  },
  infoValue: {
    color: '#1F2937',
    fontWeight: '500',
  },
  editProfileBtn: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#6B7280" />
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@utdallas.edu</Text>
        <Text style={styles.profileId}>Student ID: 202123456</Text>
        <Text style={styles.profileId}>NetID: jxd210000</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Academic Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Major</Text>
          <Text style={styles.infoValue}>Computer Science</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Classification</Text>
          <Text style={styles.infoValue}>Freshman</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>GPA</Text>
          <Text style={styles.infoValue}>3.89</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Credits Earned</Text>
          <Text style={styles.infoValue}>19</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Expected Graduation</Text>
          <Text style={styles.infoValue}>Spring 2030</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>(972) 555-0123</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Advisor</Text>
          <Text style={styles.infoValue}>Dr. Smith</Text>
        </View>
      </View>

      <Pressable style={styles.editProfileBtn}>
        <Text style={styles.editProfileBtnText}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
};
