import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '../types/navigation';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
});

interface TopBarProps extends NavigationProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  activeTab, 
  subScreen, 
  setActiveTab, 
  setSubScreen,
  onBack,
  showBackButton = false 
}) => {
  const getPageTitle = () => {
    if (subScreen) return subScreen;
    switch (activeTab) {
      case 'Home': return 'UTDCourses';
      case 'Schedule': return 'Schedule';
      case 'Chatbot': return 'AI Assistant';
      case 'Courses': return 'Courses';
      case 'More': return 'More';
      default: return 'UTDCourses';
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (subScreen) {
      setSubScreen(null);
    }
  };

  return (
    <View style={styles.topBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {showBackButton && (
          <Pressable onPress={handleBack} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="#4B5563" />
          </Pressable>
        )}
        <Text style={styles.pageTitle}>{getPageTitle()}</Text>
      </View>
      
      <Pressable onPress={() => setSubScreen('Profile')}>
        <Ionicons name="person-circle" size={24} color="#4B5563" />
      </Pressable>
    </View>
  );
};
