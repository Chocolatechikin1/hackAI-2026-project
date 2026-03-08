import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

import { Platform } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';
import { MapScreen as MapScreenWeb } from './src/screens/MapScreen.web';
import { ChatbotScreen } from './src/screens/ChatbotScreen';
import { CoursesScreen } from './src/screens/CoursesScreen';
import { MoreScreen } from './src/screens/MoreScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { LeaveNowNotificationService } from './src/context/LeaveNowNotificationService';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main Tab Navigator
function TabNavigator() {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Chatbot') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
          } else {
            iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBackground,
          borderTopWidth: 1,
          borderTopColor: theme.colors.tabBackground,
        },
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.headerText,
        headerTitleStyle: {
          fontWeight: '600',
          fontFamily: theme.fonts.semiBold,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.medium,
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'HOME' }} 
      />
      <Tab.Screen 
        name="Schedule" 
        component={Platform.OS === 'web' ? MapScreenWeb : MapScreen} 
        options={{ title: 'Map' }} 
      />
      <Tab.Screen 
        name="Chatbot" 
        component={ChatbotScreen} 
        options={{ title: 'AI Assistant' }} 
      />
      <Tab.Screen 
        name="Courses" 
        component={CoursesScreen} 
        options={{ title: 'Activity Hub' }} 
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen} 
        options={{ title: 'More' }} 
      />
    </Tab.Navigator>
  );
}

// Stack Navigator for sub-screens
function AppNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.headerText,
        headerTitleStyle: {
          fontWeight: '600',
          fontFamily: theme.fonts.semiBold,
        },
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }} 
      />
      <Stack.Screen 
        name="Help" 
        component={HelpScreen} 
        options={{ title: 'Help & Support' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web') return;
    try {
      const Location = require('expo-location').default;
      Location.requestForegroundPermissionsAsync().catch(() => {});
    } catch {
      // expo-location not available
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
      <LeaveNowNotificationService />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
