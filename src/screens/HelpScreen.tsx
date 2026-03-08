import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  sectionLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  helpIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  helpTitle: {
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 4,
  },
  helpDescription: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactLabel: {
    color: '#6B7280',
    marginLeft: 12,
  },
  contactValue: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
});

export const HelpScreen: React.FC = () => {
  const openEmail = () => {
    Linking.openURL('mailto:support@utdallas.edu');
  };

  const openPhone = () => {
    Linking.openURL('tel:9728832545');
  };

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
      
      <View style={styles.card}>
        <View style={styles.helpItem}>
          <Ionicons name="help-circle" size={20} color="#4B5563" style={styles.helpIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.helpTitle}>How do I add courses to my schedule?</Text>
            <Text style={styles.helpDescription}>
              Go to the Activity Hub tab, search for your desired course, then tap "Add to Schedule" to add it to your current semester.
            </Text>
          </View>
        </View>
        
        <View style={styles.helpItem}>
          <Ionicons name="help-circle" size={20} color="#4B5563" style={styles.helpIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.helpTitle}>How is my GPA calculated?</Text>
            <Text style={styles.helpDescription}>
              Your GPA is calculated using all completed courses and their respective credit hours. The system updates automatically each semester.
            </Text>
          </View>
        </View>
        
        <View style={styles.helpItem}>
          <Ionicons name="help-circle" size={20} color="#4B5563" style={styles.helpIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.helpTitle}>What do the AI Assistant features do?</Text>
            <Text style={styles.helpDescription}>
              The AI Assistant can help with course planning, prerequisite checking, and academic advice. It's available 24/7 for your questions.
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Contact Support</Text>
      <View style={styles.card}>
        <Pressable style={styles.contactItem} onPress={openEmail}>
          <Ionicons name="mail" size={20} color="#4B5563" />
          <Text style={styles.contactLabel}>Email: </Text>
          <Text style={styles.contactValue}>support@utdallas.edu</Text>
        </Pressable>
        
        <Pressable style={styles.contactItem} onPress={openPhone}>
          <Ionicons name="call" size={20} color="#4B5563" />
          <Text style={styles.contactLabel}>Phone: </Text>
          <Text style={styles.contactValue}>(972) 883-2545</Text>
        </Pressable>
        
        <View style={styles.contactItem}>
          <Ionicons name="location" size={20} color="#4B5563" />
          <Text style={styles.contactLabel}>Office: </Text>
          <Text style={styles.contactValue}>Student Services Building, Room 2.200</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Ionicons name="time" size={20} color="#4B5563" />
          <Text style={styles.contactLabel}>Hours: </Text>
          <Text style={styles.contactValue}>Mon-Fri 8:00 AM - 5:00 PM</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Resources</Text>
      <View style={styles.card}>
        <View style={styles.helpItem}>
          <Ionicons name="book" size={20} color="#4B5563" style={styles.helpIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.helpTitle}>University Catalog</Text>
            <Text style={styles.helpDescription}>
              Complete course descriptions, requirements, and academic policies.
            </Text>
          </View>
        </View>
        
        <View style={styles.helpItem}>
          <Ionicons name="calendar" size={20} color="#4B5563" style={styles.helpIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.helpTitle}>Academic Calendar</Text>
            <Text style={styles.helpDescription}>
              Important dates, deadlines, and holidays for the current academic year.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
