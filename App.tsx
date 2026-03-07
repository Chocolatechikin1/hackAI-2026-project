import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

type Tab = 'Home' | 'Schedule' | 'Chatbot' | 'Courses' | 'More';
type SubScreen = 'Profile' | 'Settings' | 'Help' | null;

// Wireframe colors
const GRAY_100 = '#F3F4F6';
const GRAY_200 = '#E5E7EB';
const GRAY_300 = '#D1D5DB';
const GRAY_400 = '#9CA3AF';
const GRAY_500 = '#6B7280';
const GRAY_600 = '#4B5563';
const GRAY_700 = '#374151';
const GRAY_800 = '#1F2937';
const WHITE = '#FFFFFF';

function getPageTitle(tab: Tab, sub: SubScreen): string {
  if (sub) return sub;
  switch (tab) {
    case 'Home': return 'UTDCourses';
    case 'Schedule': return 'Schedule';
    case 'Chatbot': return 'AI Assistant';
    case 'Courses': return 'Courses';
    case 'More': return 'More';
    default: return 'UTDCourses';
  }
}

// --- Home (wireframe) ---
function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Overall Progress</Text>
        <View style={[styles.progressBar, styles.progressBarBg]}>
          <View style={[styles.progressBar, styles.progressBarFill, { width: '66%' }]} />
        </View>
        <Text style={styles.cardSubtext}>67% Complete</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabelBold}>Spring 2026</Text>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.courseRow}>
            <View style={styles.checkbox} />
            <View style={styles.coursePlaceholder}>
              <View style={[styles.placeholder, { width: '75%', height: 16, marginBottom: 4 }]} />
              <View style={[styles.placeholder, { width: '50%', height: 12 }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatCard}>
          <View style={[styles.placeholder, { width: 40, height: 40, borderRadius: 8, marginBottom: 8 }]} />
          <View style={[styles.placeholder, { width: '66%', height: 12, marginBottom: 8 }]} />
          <View style={[styles.placeholder, { width: '50%', height: 16, backgroundColor: GRAY_400 }]} />
        </View>
        <View style={styles.quickStatCard}>
          <View style={[styles.placeholder, { width: 40, height: 40, borderRadius: 8, marginBottom: 8 }]} />
          <View style={[styles.placeholder, { width: '66%', height: 12, marginBottom: 8 }]} />
          <View style={[styles.placeholder, { width: '50%', height: 16, backgroundColor: GRAY_400 }]} />
        </View>
      </View>
    </ScrollView>
  );
}

// --- Schedule (wireframe) ---
function ScheduleScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const times = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.weekSelector}>
          <View style={[styles.placeholder, { width: 128, height: 16 }]} />
          <View style={styles.weekArrows}>
            <View style={[styles.placeholder, { width: 32, height: 32 }]} />
            <View style={[styles.placeholder, { width: 32, height: 32 }]} />
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabsScroll}>
        {days.map((day, i) => (
          <Pressable key={day} style={[styles.dayTab, i === 0 && styles.dayTabActive]}>
            <Text style={[styles.dayTabText, i === 0 && styles.dayTabTextActive]}>{day}</Text>
            <Text style={[styles.dayTabNum, i === 0 && styles.dayTabNumActive]}>{10 + i}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.scheduleGrid}>
        {times.map((time, i) => (
          <View key={time} style={styles.scheduleRow}>
            <Text style={styles.timeLabel}>{time}</Text>
            <View style={styles.scheduleSlot}>
              {i % 2 === 0 && (
                <View style={styles.scheduleBlock}>
                  <View style={[styles.placeholder, { width: '75%', height: 12, marginBottom: 8 }]} />
                  <View style={[styles.placeholder, { width: '50%', height: 12, marginBottom: 8 }]} />
                  <View style={[styles.placeholder, { width: '33%', height: 8 }]} />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// --- Courses (wireframe) ---
function CoursesScreen() {
  const courses = [
    { code: 'CS 1337', name: 'Computer Science I', credits: 3, status: 'completed' },
    { code: 'CS 2336', name: 'Computer Science II', credits: 3, status: 'completed' },
    { code: 'CS 3345', name: 'Data Structures', credits: 3, status: 'in-progress' },
    { code: 'CS 3340', name: 'Computer Architecture', credits: 3, status: 'in-progress' },
    { code: 'CS 4349', name: 'Advanced Algorithm', credits: 3, status: 'planned' },
    { code: 'CS 4384', name: 'Machine Learning', credits: 3, status: 'planned' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={16} color={GRAY_400} style={styles.searchIcon} />
          <TextInput placeholder="Search courses..." placeholderTextColor={GRAY_400} style={styles.searchText} />
        </View>
        <Pressable style={styles.filterBtn}>
          <Ionicons name="filter" size={20} color={GRAY_600} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusTabsScroll}>
        <Pressable style={[styles.statusTab, styles.statusTabActive]}><Text style={styles.statusTabTextActive}>All</Text></Pressable>
        <Pressable style={styles.statusTab}><Text style={styles.statusTabText}>Completed</Text></Pressable>
        <Pressable style={styles.statusTab}><Text style={styles.statusTabText}>In Progress</Text></Pressable>
        <Pressable style={styles.statusTab}><Text style={styles.statusTabText}>Planned</Text></Pressable>
      </ScrollView>

      {courses.map((c) => (
        <View key={c.code} style={styles.courseCard}>
          <View style={styles.courseCardTop}>
            <View>
              <Text style={styles.courseCode}>{c.code}</Text>
              <Text style={styles.courseName}>{c.name}</Text>
            </View>
            <View style={styles.courseCardRight}>
              <Text style={styles.courseCredits}>{c.credits} credits</Text>
              <View style={[styles.badge, c.status === 'completed' && styles.badgeGreen, c.status === 'in-progress' && styles.badgeBlue]}>
                <Text style={[styles.badgeText, c.status === 'completed' && styles.badgeTextGreen, c.status === 'in-progress' && styles.badgeTextBlue]}>
                  {c.status === 'completed' ? 'Completed' : c.status === 'in-progress' ? 'Current' : 'Planned'}
                </Text>
              </View>
            </View>
          </View>
          {c.status === 'in-progress' && (
            <View style={styles.courseProgress}>
              <View style={styles.courseProgressHeader}>
                <Text style={styles.courseProgressLabel}>Progress</Text>
                <Text style={styles.courseProgressLabel}>65%</Text>
              </View>
              <View style={[styles.progressBar, styles.progressBarBg]}>
                <View style={[styles.progressBar, { backgroundColor: '#3B82F6', width: '65%' }]} />
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

// --- Chatbot (wireframe) ---
function ChatbotScreen() {
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
      <ScrollView contentContainerStyle={[styles.screenPad, { paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.chatRow}>
          <View style={styles.avatar} />
          <View style={[styles.chatBubble, styles.chatBubbleBot]}>
            <Text style={styles.chatBubbleText}>Hi! I'm your course planning assistant. How can I help you today?</Text>
          </View>
        </View>

        <View style={[styles.chatRow, styles.chatRowUser]}>
          <View style={[styles.chatBubble, styles.chatBubbleUser]}>
            <Text style={styles.chatBubbleTextUser}>What courses should I take next semester?</Text>
          </View>
          <View style={[styles.avatar, styles.avatarRight]} />
        </View>

        <View style={styles.chatRow}>
          <View style={styles.avatar} />
          <View style={styles.chatBotContent}>
            <View style={[styles.chatBubble, styles.chatBubbleBot, { marginBottom: 8 }]}>
              <Text style={styles.chatBubbleText}>Based on your progress, I recommend these courses for next semester:</Text>
            </View>
            <Pressable style={[styles.chatBubble, styles.chatBubbleBot, styles.suggestionBtn]}><Text style={styles.chatBubbleText}>View Core Requirements</Text></Pressable>
            <Pressable style={[styles.chatBubble, styles.chatBubbleBot, styles.suggestionBtn]}><Text style={styles.chatBubbleText}>Check Prerequisites</Text></Pressable>
            <Pressable style={[styles.chatBubble, styles.chatBubbleBot, styles.suggestionBtn]}><Text style={styles.chatBubbleText}>Plan 4-Year Schedule</Text></Pressable>
          </View>
        </View>

        <View style={[styles.chatRow, styles.chatRowUser]}>
          <View style={[styles.chatBubble, styles.chatBubbleUser]}>
            <Text style={styles.chatBubbleTextUser}>Show me core requirements</Text>
          </View>
          <View style={[styles.avatar, styles.avatarRight]} />
        </View>

        <View style={styles.chatRow}>
          <View style={styles.avatar} />
          <View style={[styles.chatBubble, styles.chatBubbleBot, { width: 64, alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.typingDots}>
              <View style={[styles.typingDot, styles.typingDot1]} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.chatInputBar}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Ask me anything..."
          placeholderTextColor={GRAY_400}
          style={styles.chatInput}
        />
        <Pressable style={styles.sendBtn}>
          <Ionicons name="send" size={20} color={WHITE} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// --- More (wireframe) ---
function MoreScreen({ onNavigate }: { onNavigate: (s: SubScreen) => void }) {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Account</Text>
        <View style={styles.accountRow}>
          <View style={[styles.placeholder, { width: 48, height: 48, borderRadius: 24 }]} />
          <View style={styles.accountInfo}>
            <View style={[styles.placeholder, { width: '66%', height: 16, marginBottom: 8 }]} />
            <View style={[styles.placeholder, { width: '50%', height: 12 }]} />
          </View>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </View>
      </View>

      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem} onPress={() => onNavigate('Settings')}>
          <Ionicons name="settings-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem} onPress={() => onNavigate('Help')}>
          <Ionicons name="help-circle-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="document-text-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Academic Records</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="shield-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>About</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Build</Text>
          <Text style={styles.aboutValue}>2026.03.07</Text>
        </View>
      </View>

      <Pressable style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
}

// --- Profile (wireframe) ---
function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.profileAvatarWrap}>
          <View style={[styles.placeholder, { width: 96, height: 96, borderRadius: 48 }]} />
          <Pressable style={styles.editAvatarBtn}>
            <Ionicons name="pencil" size={16} color={WHITE} />
          </Pressable>
        </View>
        <Text style={styles.profileName}>Student Name</Text>
        <Text style={styles.profileMajor}>Computer Science</Text>
        <Text style={styles.profileClass}>Class of 2027</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabelBold}>Contact Information</Text>
        <View style={styles.contactRow}>
          <Ionicons name="mail-outline" size={20} color={GRAY_400} />
          <View><Text style={styles.contactLabel}>Email</Text><Text style={styles.contactValue}>student@utdallas.edu</Text></View>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={20} color={GRAY_400} />
          <View><Text style={styles.contactLabel}>Phone</Text><Text style={styles.contactValue}>(555) 123-4567</Text></View>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="location-outline" size={20} color={GRAY_400} />
          <View><Text style={styles.contactLabel}>Campus</Text><Text style={styles.contactValue}>Richardson, TX</Text></View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabelBold}>Academic Information</Text>
        <View style={styles.contactRow}>
          <Ionicons name="calendar-outline" size={20} color={GRAY_400} />
          <View><Text style={styles.contactLabel}>Enrollment Date</Text><Text style={styles.contactValue}>Fall 2023</Text></View>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="trophy-outline" size={20} color={GRAY_400} />
          <View><Text style={styles.contactLabel}>Current GPA</Text><Text style={styles.contactValue}>3.75</Text></View>
        </View>
        <View style={styles.contactRow}>
          <View style={[styles.placeholder, { width: 12, height: 12, borderRadius: 2 }]} />
          <View><Text style={styles.contactLabel}>Credits Completed</Text><Text style={styles.contactValue}>84 / 126</Text></View>
        </View>
      </View>

      <Pressable style={styles.editProfileBtn}><Text style={styles.editProfileBtnText}>Edit Profile</Text></Pressable>
    </ScrollView>
  );
}

// --- Settings (wireframe) ---
function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>Preferences</Text>
      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Notifications</Text>
          <Text style={styles.menuValue}>On</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="moon-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Dark Mode</Text>
          <View style={styles.toggle}><View style={styles.toggleKnob} /></View>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="globe-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Language</Text>
          <Text style={styles.menuValue}>English</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Security</Text>
      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <View style={[styles.placeholder, { width: 12, height: 12, borderRadius: 2, backgroundColor: GRAY_600 }]} />
          <Text style={styles.menuLabel}>Two-Factor Auth</Text>
          <View style={[styles.toggle, styles.toggleOn]}><View style={[styles.toggleKnob, styles.toggleKnobOn]} /></View>
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Data & Storage</Text>
      <View style={styles.card}>
        <View style={styles.dataRow}>
          <Text style={styles.menuLabel}>Cache Size</Text>
          <Text style={styles.menuValue}>124 MB</Text>
        </View>
        <Pressable style={styles.clearCacheBtn}><Text style={styles.clearCacheText}>Clear Cache</Text></Pressable>
      </View>
    </ScrollView>
  );
}

// --- Help (wireframe) ---
function HelpScreen() {
  const faqs = ['How do I add a course?', 'Can I change my major?', 'How do I view my transcript?', 'What are the graduation requirements?'];

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.searchInputFull}>
        <Ionicons name="search" size={16} color={GRAY_400} style={styles.searchIcon} />
        <TextInput placeholder="Search for help..." placeholderTextColor={GRAY_400} style={styles.searchText} />
      </View>

      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="chatbubble-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Chat with Support</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="mail-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Email Support</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="call-outline" size={20} color={GRAY_600} />
          <Text style={styles.menuLabel}>Call Support</Text>
          <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
      <View style={styles.menuCard}>
        {faqs.map((faq, i) => (
          <Pressable key={i} style={[styles.menuItem, i < faqs.length - 1 && styles.menuItemBorder]}>
            <Text style={styles.menuLabel}>{faq}</Text>
            <Ionicons name="chevron-forward" size={20} color={GRAY_400} />
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Resources</Text>
      <View style={styles.resourceCard}><Text style={styles.resourceTitle}>User Guide</Text><Text style={styles.resourceSub}>Learn how to use all features</Text></View>
      <View style={styles.resourceCard}><Text style={styles.resourceTitle}>Video Tutorials</Text><Text style={styles.resourceSub}>Watch step-by-step guides</Text></View>
      <View style={styles.resourceCard}><Text style={styles.resourceTitle}>Community Forum</Text><Text style={styles.resourceSub}>Connect with other students</Text></View>
    </ScrollView>
  );
}

// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [subScreen, setSubScreen] = useState<SubScreen>(null);

  const renderContent = () => {
    if (subScreen === 'Profile') return <ProfileScreen />;
    if (subScreen === 'Settings') return <SettingsScreen />;
    if (subScreen === 'Help') return <HelpScreen />;
    switch (activeTab) {
      case 'Home': return <HomeScreen />;
      case 'Schedule': return <ScheduleScreen />;
      case 'Chatbot': return <ChatbotScreen />;
      case 'Courses': return <CoursesScreen />;
      case 'More': return <MoreScreen onNavigate={setSubScreen} />;
      default: return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.app} edges={['top', 'left', 'right']}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Pressable style={styles.topBarBtn} onPress={() => { if (subScreen) setSubScreen(null); }}>
            <Ionicons name={subScreen ? 'arrow-back' : 'menu'} size={24} color={GRAY_700} />
          </Pressable>
          <Text style={styles.topBarTitle}>{getPageTitle(activeTab, subScreen)}</Text>
          <Pressable style={styles.topBarBtn} onPress={() => setSubScreen('Profile')}>
            <Ionicons name="person" size={24} color={GRAY_700} />
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>{renderContent()}</View>

        {/* Bottom Nav (wireframe: Home, Schedule, [Raised AI], Courses, More) */}
        <View style={styles.bottomNav}>
          <View style={styles.bottomNavInner}>
            <Pressable style={styles.navItem} onPress={() => { setActiveTab('Home'); setSubScreen(null); }}>
              <Ionicons name="home" size={24} color={activeTab === 'Home' ? GRAY_700 : GRAY_400} />
              <Text style={[styles.navLabel, activeTab === 'Home' && styles.navLabelActive]}>Home</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => { setActiveTab('Schedule'); setSubScreen(null); }}>
              <Ionicons name="calendar" size={24} color={activeTab === 'Schedule' ? GRAY_700 : GRAY_400} />
              <Text style={[styles.navLabel, activeTab === 'Schedule' && styles.navLabelActive]}>Schedule</Text>
            </Pressable>
            <Pressable style={styles.navCenterBtn} onPress={() => { setActiveTab('Chatbot'); setSubScreen(null); }}>
              <Ionicons name="chatbubbles" size={28} color={WHITE} />
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => { setActiveTab('Courses'); setSubScreen(null); }}>
              <Ionicons name="book" size={24} color={activeTab === 'Courses' ? GRAY_700 : GRAY_400} />
              <Text style={[styles.navLabel, activeTab === 'Courses' && styles.navLabelActive]}>Courses</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => { setActiveTab('More'); setSubScreen(null); }}>
              <Ionicons name="ellipsis-horizontal" size={24} color={activeTab === 'More' ? GRAY_700 : GRAY_400} />
              <Text style={[styles.navLabel, activeTab === 'More' && styles.navLabelActive]}>More</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: GRAY_100 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: WHITE, borderBottomWidth: 2, borderBottomColor: GRAY_300 },
  topBarBtn: { padding: 8 },
  topBarTitle: { fontSize: 18, fontWeight: '500', color: GRAY_800 },
  content: { flex: 1, backgroundColor: '#F9FAFB' },
  screenPad: { padding: 16, paddingBottom: 24 },

  card: { backgroundColor: WHITE, borderRadius: 8, padding: 16, borderWidth: 2, borderColor: GRAY_300, marginBottom: 16 },
  cardLabel: { fontSize: 14, color: GRAY_500, marginBottom: 8 },
  cardLabelBold: { fontSize: 14, fontWeight: '500', color: GRAY_700, marginBottom: 12 },
  cardSubtext: { fontSize: 12, color: GRAY_600 },
  placeholder: { backgroundColor: GRAY_200, borderRadius: 4 },

  progressBar: { height: 8, borderRadius: 999 },
  progressBarBg: { backgroundColor: GRAY_200, overflow: 'hidden', marginBottom: 8, flexDirection: 'row' },
  progressBarFill: { backgroundColor: GRAY_400 },

  courseRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  checkbox: { width: 12, height: 12, borderRadius: 2, borderWidth: 2, borderColor: GRAY_400, marginRight: 12 },
  coursePlaceholder: { flex: 1 },

  quickStatsRow: { flexDirection: 'row', gap: 12 },
  quickStatCard: { flex: 1, backgroundColor: WHITE, borderRadius: 8, padding: 16, borderWidth: 2, borderColor: GRAY_300 },

  weekSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  weekArrows: { flexDirection: 'row', gap: 8 },
  dayTabsScroll: { marginBottom: 16 },
  dayTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 2, borderColor: GRAY_300, backgroundColor: WHITE, marginRight: 8, minWidth: 56, alignItems: 'center' },
  dayTabActive: { backgroundColor: GRAY_700, borderColor: GRAY_700 },
  dayTabText: { fontSize: 12, color: GRAY_600 },
  dayTabTextActive: { color: WHITE },
  dayTabNum: { fontSize: 14, fontWeight: '500', color: GRAY_600 },
  dayTabNumActive: { color: WHITE },
  scheduleGrid: {},
  scheduleRow: { flexDirection: 'row', marginBottom: 12 },
  timeLabel: { width: 48, fontSize: 12, color: GRAY_500, paddingTop: 4 },
  scheduleSlot: { flex: 1 },
  scheduleBlock: { backgroundColor: WHITE, borderRadius: 8, padding: 12, borderWidth: 2, borderColor: GRAY_700 },

  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  searchInput: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderWidth: 2, borderColor: GRAY_300, borderRadius: 8, paddingHorizontal: 12 },
  searchInputFull: { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderWidth: 2, borderColor: GRAY_300, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
  searchIcon: { marginRight: 8 },
  searchText: { flex: 1, paddingVertical: 12, fontSize: 14, color: GRAY_800 },
  filterBtn: { padding: 12, backgroundColor: WHITE, borderWidth: 2, borderColor: GRAY_300, borderRadius: 8 },

  statusTabsScroll: { marginBottom: 16 },
  statusTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 2, borderColor: GRAY_300, backgroundColor: WHITE, marginRight: 8 },
  statusTabActive: { backgroundColor: GRAY_700, borderColor: GRAY_700 },
  statusTabText: { fontSize: 14, color: GRAY_600 },
  statusTabTextActive: { fontSize: 14, fontWeight: '500', color: WHITE },

  courseCard: { backgroundColor: WHITE, borderRadius: 8, padding: 16, borderWidth: 2, borderColor: GRAY_300, marginBottom: 12 },
  courseCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  courseCardRight: { alignItems: 'flex-end' },
  courseCode: { fontSize: 14, fontWeight: '500', color: GRAY_800 },
  courseName: { fontSize: 14, color: GRAY_600 },
  courseCredits: { fontSize: 12, color: GRAY_500 },
  badge: { marginTop: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: GRAY_100 },
  badgeGreen: { backgroundColor: '#D1FAE5' },
  badgeBlue: { backgroundColor: '#DBEAFE' },
  badgeText: { fontSize: 12, color: GRAY_600 },
  badgeTextGreen: { color: '#047857' },
  badgeTextBlue: { color: '#1D4ED8' },
  courseProgress: { marginTop: 12 },
  courseProgressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  courseProgressLabel: { fontSize: 12, color: GRAY_500 },

  chatRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
  chatRowUser: { justifyContent: 'flex-end' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: GRAY_300, marginRight: 8 },
  avatarRight: { marginRight: 0, marginLeft: 8 },
  chatBotContent: { flex: 1 },
  chatBubble: { maxWidth: '80%', padding: 12, borderRadius: 8 },
  chatBubbleBot: { backgroundColor: WHITE, borderWidth: 2, borderColor: GRAY_300, borderTopLeftRadius: 0 },
  chatBubbleUser: { backgroundColor: GRAY_700, borderTopRightRadius: 0, marginLeft: 8 },
  chatBubbleText: { fontSize: 14, color: GRAY_700 },
  chatBubbleTextUser: { fontSize: 14, color: WHITE },
  suggestionBtn: { marginTop: 8 },
  typingDots: { flexDirection: 'row', gap: 4 },
  typingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: GRAY_300 },
  typingDot1: { opacity: 0.5 },
  typingDot2: { opacity: 0.75 },
  typingDot3: { opacity: 1 },
  chatInputBar: { flexDirection: 'row', gap: 8, padding: 12, backgroundColor: WHITE, borderTopWidth: 2, borderTopColor: GRAY_300, alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: GRAY_100, borderWidth: 2, borderColor: GRAY_300, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  sendBtn: { width: 40, height: 40, backgroundColor: GRAY_700, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },

  accountRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  accountInfo: { flex: 1 },
  menuCard: { backgroundColor: WHITE, borderRadius: 8, borderWidth: 2, borderColor: GRAY_300, marginBottom: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: GRAY_200 },
  menuLabel: { flex: 1, fontSize: 14, color: GRAY_700, textAlign: 'left' },
  menuValue: { fontSize: 14, color: GRAY_400 },
  toggle: { width: 48, height: 24, borderRadius: 12, backgroundColor: GRAY_200, justifyContent: 'center', paddingLeft: 2 },
  toggleOn: { backgroundColor: GRAY_700, paddingLeft: 0, paddingRight: 2, alignItems: 'flex-end' },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: WHITE },
  toggleKnobOn: {},
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  aboutLabel: { fontSize: 14, color: GRAY_600 },
  aboutValue: { fontSize: 14, color: GRAY_800 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: WHITE, borderWidth: 2, borderColor: GRAY_300, borderRadius: 8, padding: 12 },
  logoutText: { fontSize: 14, fontWeight: '500', color: '#DC2626' },

  profileHeader: { backgroundColor: WHITE, borderRadius: 8, padding: 24, borderWidth: 2, borderColor: GRAY_300, marginBottom: 16, alignItems: 'center' },
  profileAvatarWrap: { position: 'relative', marginBottom: 12 },
  editAvatarBtn: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: GRAY_700, borderWidth: 2, borderColor: WHITE, alignItems: 'center', justifyContent: 'center' },
  profileName: { fontSize: 18, fontWeight: '500', color: GRAY_800, marginBottom: 4 },
  profileMajor: { fontSize: 14, color: GRAY_500 },
  profileClass: { fontSize: 12, color: GRAY_400, marginTop: 4 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  contactLabel: { fontSize: 12, color: GRAY_500 },
  contactValue: { fontSize: 14, color: GRAY_700 },
  editProfileBtn: { backgroundColor: GRAY_700, borderRadius: 8, padding: 12, alignItems: 'center' },
  editProfileBtnText: { fontSize: 14, fontWeight: '500', color: WHITE },

  sectionLabel: { fontSize: 14, color: GRAY_500, marginBottom: 8, paddingHorizontal: 2 },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  clearCacheBtn: { padding: 8, backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_300, borderRadius: 8, alignItems: 'center' },
  clearCacheText: { fontSize: 14, color: GRAY_700 },
  resourceCard: { backgroundColor: WHITE, borderRadius: 8, padding: 16, borderWidth: 2, borderColor: GRAY_300, marginBottom: 8 },
  resourceTitle: { fontSize: 14, fontWeight: '500', color: GRAY_800, marginBottom: 4 },
  resourceSub: { fontSize: 12, color: GRAY_500 },

  bottomNav: { backgroundColor: WHITE, borderTopWidth: 2, borderTopColor: GRAY_300, paddingHorizontal: 8, paddingVertical: 8 },
  bottomNavInner: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 8, paddingTop: 8 },
  navLabel: { fontSize: 12, color: GRAY_400, marginTop: 4 },
  navLabelActive: { color: GRAY_700 },
  navCenterBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: GRAY_700, alignItems: 'center', justifyContent: 'center', marginTop: -28, borderWidth: 4, borderColor: WHITE, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
});
