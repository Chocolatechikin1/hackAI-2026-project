import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ResponsiveButton as Pressable } from '../components/ResponsiveButton';
import { Ionicons } from '@expo/vector-icons';

// ─── DATA ────────────────────────────────────────────────────────────────────
const SEMESTERS = [
  {
    label: 'Semester 1 & 2',
    courses: [
      { id: 'CS1436',   code: 'CS 1436',       name: 'Programming Fundamentals',              credits: 3, type: 'major',    prereqs: [] },
      { id: 'CS1337',   code: 'CS 1337',        name: 'Computer Science I',                   credits: 3, type: 'major',    prereqs: ['CS1436'] },
      { id: 'MATH2417', code: 'MATH 2413/2417', name: 'Calculus I',                           credits: 4, type: 'major',    prereqs: [] },
      { id: 'MATH2419', code: 'MATH 2414/2419', name: 'Calculus II',                          credits: 4, type: 'major',    prereqs: ['MATH2417'] },
      { id: 'ECS1100',  code: 'ECS 1100',       name: 'Intro to ENGR & CS',                   credits: 2, type: 'major',    prereqs: [] },
      { id: 'CS1200',   code: 'CS 1200',        name: 'Introduction to CS and SE',             credits: 2, type: 'major',    prereqs: [] },
      { id: 'PHYS2325', code: 'PHYS 2325/2125', name: 'Mechanics and Lab',                    credits: 4, type: 'major',    prereqs: ['MATH2417'] },
      { id: 'CS2305',   code: 'CS 2305',        name: 'Discrete Mathematics',                 credits: 3, type: 'major',    prereqs: ['MATH2417'] },
      { id: 'CORE1',    code: 'CORE',           name: 'Core Curriculum (1)',                  credits: 3, type: 'core',     prereqs: [] },
      { id: 'CORE2',    code: 'CORE',           name: 'Core Curriculum (2)',                  credits: 3, type: 'core',     prereqs: [] },
    ],
  },
  {
    label: 'Semester 3 & 4',
    courses: [
      { id: 'CS2336',   code: 'CS 2336/2337',   name: 'Computer Science II',                  credits: 3, type: 'major',    prereqs: ['CS1337'] },
      { id: 'CS2340',   code: 'CS 2340',         name: 'Computer Architecture',                credits: 3, type: 'major',    prereqs: ['CS1337', 'CS2305', 'MATH2417'] },
      { id: 'PHYS2326', code: 'PHYS 2326/2126',  name: 'Electricity & Magnetism and Lab',      credits: 4, type: 'major',    prereqs: ['PHYS2325', 'MATH2419'] },
      { id: 'MATH2418', code: 'MATH 2418',        name: 'Linear Algebra',                      credits: 3, type: 'major',    prereqs: ['MATH2417'] },
      { id: 'ECS2390',  code: 'ECS 2390',         name: 'Professional and Technical Comm.',    credits: 3, type: 'major',    prereqs: ['CORE1'] },
      { id: 'CS3341',   code: 'CS 3341',          name: 'Probability & Statistics in CS & SE', credits: 3, type: 'major',    prereqs: ['MATH2419', 'CS2305', 'MATH2418'] },
      { id: 'CS3345',   code: 'CS 3345',          name: 'Data Structures & Algorithms',        credits: 3, type: 'major',    prereqs: ['CS2305', 'CS2336'] },
      { id: 'CS3377',   code: 'CS 3377',          name: 'Systems Programming',                 credits: 3, type: 'major',    prereqs: ['CS2336'] },
      { id: 'CORE3',    code: 'CORE',             name: 'Core Curriculum (3)',                 credits: 3, type: 'core',     prereqs: [] },
      { id: 'CORE4',    code: 'CORE',             name: 'Core Curriculum (4)',                 credits: 3, type: 'core',     prereqs: [] },
    ],
  },
  {
    label: 'Semester 5 & 6',
    courses: [
      { id: 'CS4337',   code: 'CS 4337',          name: 'Programming Language Paradigms',      credits: 3, type: 'major',    prereqs: ['CS2336', 'CS2340'] },
      { id: 'CS4349',   code: 'CS 4349',          name: 'Advanced Algorithm Design & Analysis',credits: 3, type: 'major',    prereqs: ['CS2305', 'CS3345'] },
      { id: 'CS4341',   code: 'CS 4341/4141',     name: 'Digital Logic Computer Design & Lab', credits: 4, type: 'major',    prereqs: ['PHYS2326', 'CS2340'] },
      { id: 'CS3162',   code: 'CS 3162',          name: 'Professional Responsibility',         credits: 2, type: 'major',    prereqs: ['ECS2390', 'CORE1'] },
      { id: 'CS3354',   code: 'CS 3354',          name: 'Software Engineering',                credits: 3, type: 'major',    prereqs: ['CS2336', 'CS2305', 'ECS2390'] },
      { id: 'CS4348',   code: 'CS 4348',          name: 'Operating Systems Concepts',          credits: 3, type: 'major',    prereqs: ['CS2340', 'CS3377', 'CS3345'] },
      { id: 'TECH1',    code: 'TECH ELEC',        name: 'Technical Elective (1)',              credits: 3, type: 'elective', prereqs: [] },
      { id: 'CORE5',    code: 'CORE',             name: 'Core Curriculum (5)',                 credits: 3, type: 'core',     prereqs: [] },
      { id: 'FREE1',    code: 'FREE ELEC',        name: 'Free Elective (1)',                   credits: 3, type: 'elective', prereqs: [] },
    ],
  },
  {
    label: 'Semester 7 & 8',
    courses: [
      { id: 'CS4384',   code: 'CS 4384',          name: 'Automata Theory',                     credits: 3, type: 'major',    prereqs: ['CS2305'] },
      { id: 'CS4485',   code: 'CS 4485',          name: 'Computer Science Project',            credits: 3, type: 'major',    prereqs: ['CS3345', 'CS3354', 'TECH1', 'TECH2', 'TECH3'] },
      { id: 'CS4347',   code: 'CS 4347',          name: 'Database Systems',                    credits: 3, type: 'major',    prereqs: ['CS3345'] },
      { id: 'TECH2',    code: 'TECH ELEC',        name: 'Technical Elective (2)',              credits: 3, type: 'elective', prereqs: [] },
      { id: 'TECH3',    code: 'TECH ELEC',        name: 'Technical Elective (3)',              credits: 3, type: 'elective', prereqs: [] },
      { id: 'TECH4',    code: 'TECH ELEC',        name: 'Technical Elective (4)',              credits: 3, type: 'elective', prereqs: [] },
      { id: 'FREE2',    code: 'FREE ELEC',        name: 'Free Elective (2)',                   credits: 3, type: 'elective', prereqs: [] },
      { id: 'FREE3',    code: 'FREE ELEC',        name: 'Free Elective (1 SCH)',               credits: 1, type: 'elective', prereqs: [] },
      { id: 'CORE6',    code: 'CORE',             name: 'Core Curriculum (6)',                 credits: 3, type: 'core',     prereqs: [] },
    ],
  },
];

const TOTAL_CREDITS = SEMESTERS.flatMap(s => s.courses).reduce((sum, c) => sum + c.credits, 0);
const allCoursesFlat = SEMESTERS.flatMap(s => s.courses);
const courseById = Object.fromEntries(allCoursesFlat.map(c => [c.id, c]));

const TYPE_COLORS = {
  major:    { bg: '#E8F4EC', border: '#BFDBFE', badge: '#2563EB', badgeText: '#154734' },
  core:     { bg: '#F0FDF4', border: '#BBF7D0', badge: '#16A34A', badgeText: '#166534' },
  elective: { bg: '#FFF7ED', border: '#FED7AA', badge: '#EA580C', badgeText: '#9A3412' },
};
const TYPE_LABEL = { major: 'Major', core: 'Core', elective: 'Elective' };

const MOCK_GRADES = [
  {
    term: 'Fall 2025',
    gpa: '3.80',
    courses: [
      { id: 'CS2336', code: 'CS 2336/2337', name: 'Computer Science II', grade: 'A' },
      { id: 'CS2340', code: 'CS 2340', name: 'Computer Architecture', grade: 'B+' },
      { id: 'MATH2418', code: 'MATH 2418', name: 'Linear Algebra', grade: 'A-' },
    ]
  },
  {
    term: 'Fall 2024',
    gpa: '4.00',
    courses: [
      { id: 'CS1337', code: 'CS 1337', name: 'Computer Science I', grade: 'A' },
      { id: 'MATH2417', code: 'MATH 2413/2417', name: 'Calculus I', grade: 'A' },
      { id: 'ECS1100', code: 'ECS 1100', name: 'Intro to ENGR & CS', grade: 'A' },
    ]
  },
  {
    term: 'Spring 2024',
    gpa: '3.90',
    courses: [
      { id: 'CS1436', code: 'CS 1436', name: 'Programming Fundamentals', grade: 'A' },
      { id: 'PHYS2325', code: 'PHYS 2325/2125', name: 'Mechanics and Lab', grade: 'A-' },
      { id: 'CORE1', code: 'CORE', name: 'Core Curriculum (1)', grade: 'A' },
    ]
  }
];


// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // shared
  root:         { flex: 1, backgroundColor: '#F3F4F6' },
  safeArea:     { flex: 1, backgroundColor: '#FFFFFF' },

  // ── Home screen
  homeHeader:   { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  homeSubtitle: { fontSize: 10, letterSpacing: 2, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 4 },
  homeTitle:    { fontSize: 24, fontWeight: '900', color: '#111827' },
  homeBody:     { padding: 16 },

  // Course Tracker card
  card:         { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, padding: 18 },
  cardTop:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  cardIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#E8F4EC', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle:    { fontSize: 13, fontWeight: '600', color: '#111827' },
  cardSub:      { fontSize: 10, color: '#6B7280', marginTop: 1 },
  barLabel:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barLabelText: { fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1.5 },
  barLabelPct:  { fontSize: 10, color: '#2563EB', fontWeight: '600' },
  barTrack:     { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden' },
  barFill:      { height: 6, backgroundColor: '#2563EB', borderRadius: 3 },
  creditRow:    { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  creditEarned: { fontSize: 10, color: '#2563EB' },
  creditLeft:   { fontSize: 10, color: '#9CA3AF' },

  // ── GradTracker screen
  gtHeader:     { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backBtn:      { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText:     { fontSize: 12, color: '#6B7280', letterSpacing: 1.5, marginLeft: 4 },
  gtSchool:     { fontSize: 10, letterSpacing: 2, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 4 },
  gtTitle:      { fontSize: 26, fontWeight: '900', color: '#111827', lineHeight: 30, marginBottom: 2 },
  gtYear:       { fontSize: 11, color: '#6B7280', letterSpacing: 1 },
  pctLabel:     { fontSize: 10, letterSpacing: 2, color: '#6B7280', textTransform: 'uppercase' },
  pctNum:       { fontSize: 42, fontWeight: '900', color: '#2563EB', lineHeight: 48, marginTop: 2 },
  pctSuffix:    { fontSize: 18, color: '#E29A6B' },
  credNum:      { fontSize: 20, fontWeight: '600', color: '#111827', textAlign: 'right' },
  credTotal:    { fontSize: 10, color: '#9CA3AF', letterSpacing: 1.5, textAlign: 'right' },
  bigBarTrack:  { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5, overflow: 'hidden', marginTop: 10 },
  bigBarFill:   { height: 10, backgroundColor: '#2563EB', borderRadius: 5 },
  statsRow:     { flexDirection: 'row', gap: 10, marginTop: 18 },
  statBox:      { flex: 1, backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12, alignItems: 'center' },
  statNum:      { fontSize: 22, fontWeight: '700' },
  statLabel:    { fontSize: 9, color: '#6B7280', marginTop: 2, letterSpacing: 1.5, textTransform: 'uppercase' },

  // Semester cards
  hint:         { fontSize: 9, color: '#9CA3AF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 },
  semCard:      { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, marginBottom: 10, overflow: 'hidden' },
  semHeader:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  semName:      { fontSize: 13, fontWeight: '600', color: '#111827' },
  semCredits:   { fontSize: 11, color: '#6B7280', marginTop: 2 },
  semPct:       { fontSize: 11, color: '#6B7280', textAlign: 'right' },
  miniBarTrack: { width: 56, height: 3, backgroundColor: '#E5E7EB', borderRadius: 2, overflow: 'hidden', marginTop: 3 },
  miniBarFill:  { height: 3, backgroundColor: '#2563EB', borderRadius: 2 },
  divider:      { height: 1, backgroundColor: '#F3F4F6', marginBottom: 10 },

  // Course row
  courseRow:    { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 8, marginBottom: 5, borderWidth: 1 },
  checkCircle:  { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginRight: 10, flexShrink: 0 },
  courseName:   { fontSize: 12, fontWeight: '500' },
  courseCode:   { fontSize: 10, marginTop: 1 },
  prereqRow:    { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 5 },
  prereqChip:   { fontSize: 9, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3, borderWidth: 1, overflow: 'hidden' },
  tagBadge:     { fontSize: 9, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, overflow: 'hidden', textTransform: 'uppercase', letterSpacing: 1 },
  crText:       { fontSize: 10, color: '#9CA3AF', minWidth: 26, textAlign: 'right' },

  // Legend
  legend:       { flexDirection: 'row', justifyContent: 'center', gap: 16, paddingTop: 4, paddingBottom: 32 },
  legendDot:    { width: 7, height: 7, borderRadius: 2, marginRight: 5 },
  legendText:   { fontSize: 9, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase' },

  // ── Grades screen
  gradeCard:       { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, padding: 16, marginBottom: 16 },
  gradeTerm:       { fontSize: 14, fontWeight: '700', color: '#111827' },
  gradeGpa:        { fontSize: 11, color: '#6B7280', marginTop: 2, marginBottom: 12 },
  gradeRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  gradeCourseCode: { fontSize: 13, fontWeight: '600', color: '#111827' },
  gradeCourseName: { fontSize: 11, color: '#6B7280', marginTop: 2, maxWidth: 220 },
  gradeLetterWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#E8F4EC', alignItems: 'center', justifyContent: 'center' },
  gradeLetter:     { fontSize: 14, fontWeight: '700', color: '#2563EB' },
});

// ─── GRAD TRACKER SCREEN ─────────────────────────────────────────────────────
function GradTrackerScreen({ completed, setCompleted, onBack }: {
  completed: Set<string>;
  setCompleted: React.Dispatch<React.SetStateAction<Set<string>>>;
  onBack: () => void;
}) {
  const [expandedSem, setExpandedSem] = useState<number | null>(null);

  const isLocked = (course: any, comp: Set<string>) =>
    course.prereqs.some((pid: string) => !comp.has(pid));

  const toggle = (id: string) => {
    const course = courseById[id];
    setCompleted(prev => {
      if (isLocked(course, prev)) return prev;
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const earned = allCoursesFlat.filter(c => completed.has(c.id)).reduce((sum, c) => sum + c.credits, 0);
  const pct = Math.round((earned / TOTAL_CREDITS) * 100);

  const semProg = (sem: any) => {
    const total = sem.courses.reduce((s: number, c: any) => s + c.credits, 0);
    const done  = sem.courses.filter((c: any) => completed.has(c.id)).reduce((s: number, c: any) => s + c.credits, 0);
    return { total, done, pct: Math.round((done / total) * 100) };
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.root} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.gtHeader}>
          <Pressable style={s.backBtn} onPress={onBack}>
            <Ionicons name="chevron-back" size={16} color="#6B7280" />
            <Text style={s.backText}>BACK</Text>
          </Pressable>

          <Text style={s.gtSchool}>Erik Jonsson School · UTD</Text>
          <Text style={s.gtTitle}>BS Computer{'\n'}Science</Text>
          <Text style={s.gtYear}>2025 – 2026 Degree Plan</Text>

          {/* Progress */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 24 }}>
            <View>
              <Text style={s.pctLabel}>Graduation Progress</Text>
              <Text style={s.pctNum}>{pct}<Text style={s.pctSuffix}>%</Text></Text>
            </View>
            <View>
              <Text style={s.credNum}>{earned}</Text>
              <Text style={s.credTotal}>/ {TOTAL_CREDITS} CREDITS</Text>
            </View>
          </View>
          <View style={s.bigBarTrack}>
            <View style={[s.bigBarFill, { width: `${pct}%` as any }]} />
          </View>

          {/* Stats */}
          <View style={s.statsRow}>
            {[
              { label: 'Completed',    val: completed.size,                        color: '#2563EB' },
              { label: 'Remaining',    val: allCoursesFlat.length - completed.size, color: '#DC2626' },
              { label: 'Credits Left', val: TOTAL_CREDITS - earned,                color: '#7C3AED' },
            ].map(stat => (
              <View key={stat.label} style={s.statBox}>
                <Text style={[s.statNum, { color: stat.color }]}>{stat.val}</Text>
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Semester list */}
        <View style={{ padding: 16 }}>
          <Text style={s.hint}>Tap semester to expand · tap course to mark complete</Text>

          {SEMESTERS.map((sem, si) => {
            const sp = semProg(sem);
            const isOpen = expandedSem === si;
            return (
              <View key={si} style={s.semCard}>
                <Pressable style={s.semHeader} onPress={() => setExpandedSem(isOpen ? null : si)}>
                  <View>
                    <Text style={s.semName}>{sem.label}</Text>
                    <Text style={s.semCredits}>{sp.done} / {sp.total} credits</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', flexDirection: 'row', gap: 10 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[s.semPct, sp.pct === 100 && { color: '#2563EB' }]}>{sp.pct}%</Text>
                      <View style={s.miniBarTrack}>
                        <View style={[s.miniBarFill, { width: `${sp.pct}%` as any, backgroundColor: sp.pct === 100 ? '#2563EB' : '#2563EB' }]} />
                      </View>
                    </View>
                    <Ionicons name={isOpen ? 'chevron-down' : 'chevron-forward'} size={16} color="#9CA3AF" />
                  </View>
                </Pressable>

                {isOpen && (
                  <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
                    <View style={s.divider} />
                    {sem.courses.map((course: any) => {
                      const done   = completed.has(course.id);
                      const locked = isLocked(course, completed);
                      const tc     = TYPE_COLORS[course.type as keyof typeof TYPE_COLORS];
                      return (
                        <Pressable
                          key={course.id}
                          onPress={() => toggle(course.id)}
                          style={[
                            s.courseRow,
                            {
                              backgroundColor: done ? '#E8F4EC' : locked ? '#F9FAFB' : tc.bg,
                              borderColor:     done ? '#BFDBFE' : locked ? '#E5E7EB' : tc.border,
                              opacity: locked ? 0.6 : done ? 0.7 : 1,
                            },
                          ]}
                        >
                          {/* Check / Lock */}
                          <View style={[s.checkCircle, {
                            borderColor:     locked ? '#D1D5DB' : done ? '#2563EB' : '#D1D5DB',
                            backgroundColor: done ? '#2563EB' : 'transparent',
                          }]}>
                            {done   && <Ionicons name="checkmark" size={11} color="#fff" />}
                            {locked && <Ionicons name="lock-closed" size={9} color="#9CA3AF" />}
                          </View>

                          {/* Info */}
                          <View style={{ flex: 1, minWidth: 0 }}>
                            <Text
                              numberOfLines={1}
                              style={[s.courseName, { color: done ? '#6B7280' : locked ? '#9CA3AF' : '#111827' }]}
                            >
                              {course.name}
                            </Text>
                            <Text style={[s.courseCode, { color: locked ? '#D1D5DB' : '#6B7280' }]}>
                              {course.code}
                            </Text>

                            {/* Prereq chips */}
                            {course.prereqs.length > 0 && (
                              <View style={s.prereqRow}>
                                {course.prereqs.map((pid: string) => {
                                  const met   = completed.has(pid);
                                  const pCode = courseById[pid]?.code || pid;
                                  return (
                                    <Text
                                      key={pid}
                                      style={[s.prereqChip, {
                                        backgroundColor: met ? '#F0FDF4' : '#FEF2F2',
                                        color:           met ? '#16A34A' : '#DC2626',
                                        borderColor:     met ? '#BBF7D0' : '#FECACA',
                                      }]}
                                    >
                                      {met ? '✓ ' : '✗ '}{pCode}
                                    </Text>
                                  );
                                })}
                              </View>
                            )}
                          </View>

                          {/* Badge + credits */}
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 8 }}>
                            <Text style={[s.tagBadge, {
                              backgroundColor: tc.bg,
                              color:           locked ? '#9CA3AF' : tc.badgeText,
                              borderColor:     tc.border,
                            }]}>
                              {TYPE_LABEL[course.type as keyof typeof TYPE_LABEL]}
                            </Text>
                            <Text style={s.crText}>{course.credits}cr</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}

          {/* Legend */}
          <View style={s.legend}>
            {Object.entries(TYPE_LABEL).map(([k, v]) => (
              <View key={k} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[s.legendDot, { backgroundColor: TYPE_COLORS[k as keyof typeof TYPE_COLORS].badge }]} />
                <Text style={s.legendText}>{v}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── GRADES SCREEN ───────────────────────────────────────────────────────────
function GradesScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.root} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.gtHeader}>
          <Pressable style={s.backBtn} onPress={onBack}>
            <Ionicons name="chevron-back" size={16} color="#6B7280" />
            <Text style={s.backText}>BACK</Text>
          </Pressable>

          <Text style={s.gtSchool}>Erik Jonsson School · UTD</Text>
          <Text style={s.gtTitle}>My Grades</Text>
          <Text style={s.gtYear}>Cumulative GPA: 3.89</Text>
        </View>

        {/* Semesters */}
        <View style={{ padding: 16 }}>
          {MOCK_GRADES.map((term, i) => (
            <View key={i} style={s.gradeCard}>
              <Text style={s.gradeTerm}>{term.term}</Text>
              <Text style={s.gradeGpa}>Term GPA: {term.gpa}</Text>
              {term.courses.map((c, ci) => (
                <View key={ci} style={[s.gradeRow, ci === 0 && { borderTopWidth: 0 }]}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={s.gradeCourseCode}>{c.code}</Text>
                    <Text style={s.gradeCourseName} numberOfLines={1}>{c.name}</Text>
                  </View>
                  <View style={s.gradeLetterWrap}>
                    <Text style={s.gradeLetter}>{c.grade}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
export const CoursesScreen: React.FC = () => {
  const [page, setPage]           = useState<'home' | 'gradtracker' | 'grades'>('home');
  const [completed, setCompleted] = useState<Set<string>>(new Set([
    'CS1436', 'PHYS2325', 'CORE1', // Spring 2024
    'CS1337', 'MATH2417', 'ECS1100', // Fall 2024
  ]));

  const earned = allCoursesFlat.filter(c => completed.has(c.id)).reduce((sum, c) => sum + c.credits, 0);
  const pct    = Math.round((earned / TOTAL_CREDITS) * 100);

  if (page === 'gradtracker') {
    return <GradTrackerScreen completed={completed} setCompleted={setCompleted} onBack={() => setPage('home')} />;
  }
  if (page === 'grades') {
    return <GradesScreen onBack={() => setPage('home')} />;
  }

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.root} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.homeHeader}>
          <Text style={s.homeSubtitle}>UTD · CS Department</Text>
          <Text style={s.homeTitle}>My Dashboard</Text>
        </View>

        {/* Cards */}
        <View style={s.homeBody}>

          {/* Course Tracker card */}
          <Pressable style={s.card} onPress={() => setPage('gradtracker')}>
            {/* Top row */}
            <View style={s.cardTop}>
              <View style={s.cardTitleRow}>
                <View style={s.cardIconWrap}>
                  <Ionicons name="school-outline" size={18} color="#2563EB" />
                </View>
                <View>
                  <Text style={s.cardTitle}>Course Tracker</Text>
                  <Text style={s.cardSub}>BS Computer Science · 2025–26</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </View>

            {/* Progress bar */}
            <View style={s.barLabel}>
              <Text style={s.barLabelText}>Graduation Progress</Text>
              <Text style={s.barLabelPct}>{pct}%</Text>
            </View>
            <View style={s.barTrack}>
              <View style={[s.barFill, { width: `${pct}%` as any }]} />
            </View>

            {/* Credit summary */}
            <View style={s.creditRow}>
              <Text style={s.creditEarned}>{earned} credits earned</Text>
              <Text style={s.creditLeft}>{TOTAL_CREDITS - earned} remaining</Text>
            </View>
          </Pressable>

          {/* Grades card */}
          <Pressable style={[s.card, { marginTop: 16 }]} onPress={() => setPage('grades')}>
            <View style={s.cardTop}>
              <View style={s.cardTitleRow}>
                <View style={[s.cardIconWrap, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="document-text-outline" size={18} color="#16A34A" />
                </View>
                <View>
                  <Text style={s.cardTitle}>Academic Grades</Text>
                  <Text style={s.cardSub}>View transcripts by term</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </View>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
