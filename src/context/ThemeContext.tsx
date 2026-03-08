import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  // Specific semantic colors mapped from old hardcodes
  tabBackground: string;
  headerBackground: string;
  headerText: string;
  tabActive: string;
  tabInactive: string;
  eventBubble: string;
  eventBubbleBorder: string;
  inputBorder: string;
};

export type ThemeFonts = {
  regular: string;
  medium: string;
  semiBold: string;
};

export type Theme = {
  colors: ThemeColors;
  fonts: ThemeFonts;
  isDark: boolean;
};

export type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  setDarkMode: (dark: boolean) => void;
};

const lightColors: ThemeColors = {
  background: '#F9FAFB', // App default bg implies this based on how screens are laid out
  surface: '#FFFFFF', // Card bg
  primary: '#C75B12', // Orange branding
  text: '#1F2937', // Default text
  textSecondary: '#6B7280', // Subbed text
  border: '#E5E7EB',
  error: '#EF4444',
  
  tabBackground: '#C75B12',
  headerBackground: '#154734',
  headerText: '#FFFFFF',
  tabActive: '#FFFFFF',
  tabInactive: '#FDE8D7',
  
  eventBubble: '#FDE8D7',
  eventBubbleBorder: '#C75B12',
  inputBorder: '#E5E7EB',
};

const darkColors: ThemeColors = {
  background: '#111827',
  surface: '#1F2937',
  primary: '#E27832', // Slightly lighter orange for dark mode contrast
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#374151',
  error: '#F87171',
  
  tabBackground: '#111827', // Match bottom to dark theme
  headerBackground: '#111827', // Match header to dark theme
  headerText: '#F9FAFB',
  tabActive: '#E27832',
  tabInactive: '#6B7280',
  
  eventBubble: '#374151',
  eventBubbleBorder: '#E27832',
  inputBorder: '#4B5563',
};

const fonts: ThemeFonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  // Allow system overrides but keep manual toggle
  useEffect(() => {
    // If you wanted it strictly tied to system, you'd sync it here
  }, [systemColorScheme]);

  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    fonts,
    isDark,
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setDarkMode: setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
