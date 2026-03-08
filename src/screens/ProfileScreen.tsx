import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { ResponsiveButton as Pressable } from '../components/ResponsiveButton';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.screenPad, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="person" size={40} color={theme.colors.textSecondary} />
        </View>
        <Text style={[styles.profileName, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>John Doe</Text>
        <Text style={[styles.profileEmail, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>john.doe@utdallas.edu</Text>
        <Text style={[styles.profileId, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular, marginTop: 4 }]}>Student ID: 202123456</Text>
        <Text style={[styles.profileId, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>NetID: jxd210000</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Academic Information</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Major</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Computer Science</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Classification</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Freshman</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>GPA</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>3.89</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Credits Earned</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>19</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Expected Graduation</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Spring 2030</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.sectionLabel, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Phone</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>(972) 555-0123</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Advisor</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>Dr. Smith</Text>
        </View>
      </View>

      <Pressable style={[styles.editProfileBtn, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.editProfileBtnText, { color: theme.colors.surface, fontFamily: theme.fonts.semiBold }]}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    marginBottom: 4,
  },
  profileEmail: {
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionLabel: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
  },
  infoValue: {
  },
  editProfileBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileBtnText: {
  },
});
