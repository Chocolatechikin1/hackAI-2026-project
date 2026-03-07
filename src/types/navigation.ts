export type Tab = 'Home' | 'Schedule' | 'Chatbot' | 'Courses' | 'More';
export type SubScreen = 'Profile' | 'Settings' | 'Help' | null;

export interface NavigationProps {
  activeTab: Tab;
  subScreen: SubScreen;
  setActiveTab: (tab: Tab) => void;
  setSubScreen: (screen: SubScreen) => void;
}

export interface ScreenProps {
  navigation: NavigationProps;
}
