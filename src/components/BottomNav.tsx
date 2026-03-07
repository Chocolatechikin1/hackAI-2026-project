import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { NavigationProps } from '../types/navigation';

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bottomNavInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navLabelActive: {
    color: '#374151',
  },
  navCenterBtn: {
    backgroundColor: '#3B82F6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
});

export const BottomNav: React.FC<NavigationProps> = ({ 
  activeTab, 
  subScreen, 
  setActiveTab, 
  setSubScreen 
}) => {
  const handleTabPress = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSubScreen(null);
  };

  return (
    <View style={styles.bottomNav}>
      <View style={styles.bottomNavInner}>
        <Pressable 
          style={styles.navItem} 
          onPress={() => handleTabPress('Home')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={activeTab === 'Home' ? '#374151' : '#9CA3AF'} 
          />
          <Text style={[
            styles.navLabel, 
            activeTab === 'Home' && styles.navLabelActive
          ]}>
            Home
          </Text>
        </Pressable>
        
        <Pressable 
          style={styles.navItem} 
          onPress={() => handleTabPress('Schedule')}
        >
          <Ionicons 
            name="calendar" 
            size={24} 
            color={activeTab === 'Schedule' ? '#374151' : '#9CA3AF'} 
          />
          <Text style={[
            styles.navLabel, 
            activeTab === 'Schedule' && styles.navLabelActive
          ]}>
            Schedule
          </Text>
        </Pressable>
        
        <Pressable 
          style={styles.navCenterBtn} 
          onPress={() => handleTabPress('Chatbot')}
        >
          <Ionicons name="chatbubbles" size={28} color="#FFFFFF" />
        </Pressable>
        
        <Pressable 
          style={styles.navItem} 
          onPress={() => handleTabPress('Courses')}
        >
          <Ionicons 
            name="book" 
            size={24} 
            color={activeTab === 'Courses' ? '#374151' : '#9CA3AF'} 
          />
          <Text style={[
            styles.navLabel, 
            activeTab === 'Courses' && styles.navLabelActive
          ]}>
            Courses
          </Text>
        </Pressable>
        
        <Pressable 
          style={styles.navItem} 
          onPress={() => handleTabPress('More')}
        >
          <Ionicons 
            name="ellipsis-horizontal" 
            size={24} 
            color={activeTab === 'More' ? '#374151' : '#9CA3AF'} 
          />
          <Text style={[
            styles.navLabel, 
            activeTab === 'More' && styles.navLabelActive
          ]}>
            More
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
