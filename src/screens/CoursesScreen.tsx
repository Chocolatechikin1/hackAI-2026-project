import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Modal, ActivityIndicator, Platform } from 'react-native';
import { ResponsiveButton as Pressable } from '../components/ResponsiveButton';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { nebulaApi } from '../api';

const CLASS_LEVELS = ['Undergraduate', 'Graduate'];

interface CourseItem {
  id: string;
  code: string;
  name: string;
  credits: number;
}

interface TermPlan {
  id: string;
  name: string;
  status: 'past' | 'current' | 'future';
  courses: CourseItem[];
}

const INITIAL_TERMS: TermPlan[] = [
  {
    id: 'f24', name: 'Fall 2024', status: 'past',
    courses: [
      { id: 'CS1337', code: 'CS 1337', name: 'Computer Science I', credits: 3 },
      { id: 'MATH2417', code: 'MATH 2417', name: 'Calculus I', credits: 4 },
      { id: 'ECS1100', code: 'ECS 1100', name: 'Intro to ENGR & CS', credits: 2 },
    ]
  },
  {
    id: 's25', name: 'Spring 2025', status: 'past',
    courses: [
      { id: 'CS1436', code: 'CS 1436', name: 'Programming Fundamentals', credits: 3 },
      { id: 'PHYS2325', code: 'PHYS 2325', name: 'Mechanics and Lab', credits: 4 },
    ]
  },
  {
    id: 'f25', name: 'Fall 2025', status: 'past',
    courses: [
      { id: 'CS2336', code: 'CS 2336', name: 'Computer Science II', credits: 3 },
      { id: 'CS2340', code: 'CS 2340', name: 'Computer Architecture', credits: 3 },
      { id: 'MATH2418', code: 'MATH 2418', name: 'Linear Algebra', credits: 3 },
    ]
  },
  {
    id: 's26', name: 'Spring 2026', status: 'current',
    courses: [
      { id: 'CS3345', code: 'CS 3345', name: 'Data Structures & Algorithms', credits: 3 },
      { id: 'CS3377', code: 'CS 3377', name: 'Systems Programming', credits: 3 },
    ]
  },
  { id: 'f26', name: 'Fall 2026', status: 'future', courses: [] },
  { id: 's27', name: 'Spring 2027', status: 'future', courses: [] }
];

const TOTAL_DEGREE_CREDITS = 120;

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
    ]
  }
];

const createStyles = (theme: any) => StyleSheet.create({
  root:         { flex: 1, backgroundColor: theme.colors.background },
  safeArea:     { flex: 1, backgroundColor: theme.colors.surface },

  homeHeader:   { backgroundColor: theme.colors.surface, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  homeSubtitle: { fontSize: 10, letterSpacing: 2, color: theme.colors.textSecondary, textTransform: 'uppercase', marginBottom: 4, fontFamily: theme.fonts.medium },
  homeTitle:    { fontSize: 24, color: theme.colors.text, fontFamily: theme.fonts.semiBold },
  homeBody:     { padding: 16 },

  card:         { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, padding: 18 },
  cardTop:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  cardIconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle:    { fontSize: 13, color: theme.colors.text, fontFamily: theme.fonts.semiBold },
  cardSub:      { fontSize: 10, color: theme.colors.textSecondary, marginTop: 1, fontFamily: theme.fonts.regular },
  barLabel:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barLabelText: { fontSize: 10, color: theme.colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: theme.fonts.medium },
  barLabelPct:  { fontSize: 10, color: theme.colors.primary, fontFamily: theme.fonts.semiBold },
  barTrack:     { height: 6, backgroundColor: theme.colors.border, borderRadius: 3, overflow: 'hidden' },
  barFill:      { height: 6, backgroundColor: theme.colors.primary, borderRadius: 3 },
  creditRow:    { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  creditEarned: { fontSize: 10, color: theme.colors.primary, fontFamily: theme.fonts.medium },
  creditLeft:   { fontSize: 10, color: theme.colors.textSecondary, fontFamily: theme.fonts.medium },

  gtHeader:     { backgroundColor: theme.colors.surface, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn:      { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText:     { fontSize: 12, color: theme.colors.textSecondary, letterSpacing: 1.5, marginLeft: 4, fontFamily: theme.fonts.medium },
  gtSchool:     { fontSize: 10, letterSpacing: 2, color: theme.colors.textSecondary, textTransform: 'uppercase', marginBottom: 4, fontFamily: theme.fonts.medium },
  gtTitle:      { fontSize: 26, color: theme.colors.text, lineHeight: 30, marginBottom: 2, fontFamily: theme.fonts.semiBold },
  gtYear:       { fontSize: 11, color: theme.colors.textSecondary, letterSpacing: 1, fontFamily: theme.fonts.regular },
  pctLabel:     { fontSize: 10, letterSpacing: 2, color: theme.colors.textSecondary, textTransform: 'uppercase', fontFamily: theme.fonts.medium },
  pctNum:       { fontSize: 42, color: theme.colors.primary, lineHeight: 48, marginTop: 2, fontFamily: theme.fonts.semiBold },
  pctSuffix:    { fontSize: 18, color: theme.colors.primary },
  credNum:      { fontSize: 20, color: theme.colors.text, textAlign: 'right', fontFamily: theme.fonts.semiBold },
  credTotal:    { fontSize: 10, color: theme.colors.textSecondary, letterSpacing: 1.5, textAlign: 'right', fontFamily: theme.fonts.medium },
  bigBarTrack:  { height: 10, backgroundColor: theme.colors.border, borderRadius: 5, overflow: 'hidden', marginTop: 10 },
  bigBarFill:   { height: 10, backgroundColor: theme.colors.primary, borderRadius: 5 },
  statsRow:     { flexDirection: 'row', gap: 10, marginTop: 18 },
  statBox:      { flex: 1, backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, padding: 12, alignItems: 'center' },
  statNum:      { fontSize: 22, fontFamily: theme.fonts.semiBold, color: theme.colors.text },
  statLabel:    { fontSize: 9, color: theme.colors.textSecondary, marginTop: 2, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: theme.fonts.regular },

  hint:         { fontSize: 9, color: theme.colors.textSecondary, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: theme.fonts.medium },
  semCard:      { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, marginBottom: 10, overflow: 'hidden' },
  semHeader:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  semName:      { fontSize: 13, color: theme.colors.text, fontFamily: theme.fonts.semiBold },
  semCredits:   { fontSize: 11, color: theme.colors.textSecondary, marginTop: 2, fontFamily: theme.fonts.regular },
  semCurrentBadge: { backgroundColor: theme.colors.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 },
  semCurrentText: { fontSize: 10, color: theme.colors.primary, fontFamily: theme.fonts.medium, textTransform: 'uppercase' },
  divider:      { height: 1, backgroundColor: theme.colors.border, marginBottom: 10 },

  courseRow:    { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 8, marginBottom: 5, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.background },
  courseName:   { fontSize: 12, color: theme.colors.text, fontFamily: theme.fonts.medium },
  courseCode:   { fontSize: 10, color: theme.colors.textSecondary, marginTop: 1, fontFamily: theme.fonts.regular },
  crText:       { fontSize: 10, color: theme.colors.textSecondary, minWidth: 26, textAlign: 'right', fontFamily: theme.fonts.medium },
  addCourseBtn: { marginVertical: 8, paddingVertical: 10, alignItems: 'center', borderRadius: 8, borderStyle: 'dashed', borderWidth: 1, borderColor: theme.colors.primary },
  addCourseText:{ fontSize: 12, color: theme.colors.primary, fontFamily: theme.fonts.medium },
  removeBtn:    { padding: 4 },

  gradeCard:       { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, padding: 16, marginBottom: 16 },
  gradeTerm:       { fontSize: 14, color: theme.colors.text, fontFamily: theme.fonts.semiBold },
  gradeGpa:        { fontSize: 11, color: theme.colors.textSecondary, marginTop: 2, marginBottom: 12, fontFamily: theme.fonts.regular },
  gradeRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: theme.colors.border },
  gradeCourseCode: { fontSize: 13, color: theme.colors.text, fontFamily: theme.fonts.semiBold },
  gradeCourseName: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 2, maxWidth: 220, fontFamily: theme.fonts.regular },
  gradeLetterWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' },
  gradeLetter:     { fontSize: 14, color: theme.colors.primary, fontFamily: theme.fonts.semiBold },
  
  dropdownTrigger: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, padding: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dropdownPlaceholder: { color: theme.colors.textSecondary, fontSize: 14, fontFamily: theme.fonts.regular },
  dropdownValue: { color: theme.colors.text, fontSize: 14, fontFamily: theme.fonts.regular },
  dropdownModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  dropdownList: { backgroundColor: theme.colors.surface, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: 320, paddingBottom: 24, paddingTop: 12 },
  dropdownItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: theme.colors.background },
  dropdownItemText: { fontSize: 14, color: theme.colors.text, fontFamily: theme.fonts.medium },
  modalContent: { backgroundColor: theme.colors.surface, padding: 20, marginHorizontal: 20, borderRadius: 12, maxHeight: '80%' },
  modalTitle: { fontSize: 18, color: theme.colors.text, fontFamily: theme.fonts.semiBold, marginBottom: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelButton: { backgroundColor: theme.colors.background, marginRight: 8 },
  saveButton: { backgroundColor: theme.colors.primary, marginLeft: 8 },
  buttonText: { fontSize: 14, fontFamily: theme.fonts.semiBold },
  cancelText: { color: theme.colors.textSecondary },
  saveText: { color: theme.colors.surface },
});

function GradTrackerScreen({ terms, setTerms, onBack, theme }: {
  terms: TermPlan[];
  setTerms: React.Dispatch<React.SetStateAction<TermPlan[]>>;
  onBack: () => void;
  theme: any;
}) {
  const s = createStyles(theme);
  const [expandedSem, setExpandedSem] = useState<string | null>(null);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetTermId, setTargetTermId] = useState<string | null>(null);
  
  // API State
  const [subjectPrefixes, setSubjectPrefixes] = useState<{ label: string; value: string }[]>([]);
  const [subjectPrefixesLoading, setSubjectPrefixesLoading] = useState(false);
  const [selectedSubjectPrefix, setSelectedSubjectPrefix] = useState<string | null>(null);
  const [selectedClassLevel, setSelectedClassLevel] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<'subject' | 'class' | 'course' | null>(null);

  const earned = terms.filter(t => t.status === 'past' || t.status === 'current').flatMap(t => t.courses).reduce((sum, c) => sum + (c.credits || 0), 0);
  const pct = Math.round((earned / TOTAL_DEGREE_CREDITS) * 100);
  
  const inProgress = terms.filter(t => t.status === 'current').flatMap(t => t.courses).reduce((sum, c) => sum + (c.credits || 0), 0);
  const planned = terms.filter(t => t.status === 'future').flatMap(t => t.courses).reduce((sum, c) => sum + (c.credits || 0), 0);

  useEffect(() => {
    if (!showAddModal) return;
    let cancelled = false;
    setSubjectPrefixesLoading(true);
    nebulaApi.autocompleteDAG()
      .then(({ data }) => {
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data
            .map((a: any) => a.subject_prefix)
            .filter((s) => typeof s === 'string' && s.length > 0)
            .sort()
            .map((s) => ({ label: s, value: s }))
          : [];
        setSubjectPrefixes(list);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setSubjectPrefixesLoading(false); });
    return () => { cancelled = true; };
  }, [showAddModal]);

  useEffect(() => {
    if (!selectedSubjectPrefix || !selectedClassLevel) {
      setCourses([]);
      setSelectedCourse(null);
      return;
    }
    let cancelled = false;
    setCoursesLoading(true);
    nebulaApi.courseSearch({ subject_prefix: selectedSubjectPrefix, class_level: selectedClassLevel })
      .then(({ data }) => {
        if (cancelled) return;
        setCourses(Array.isArray(data) ? data : []);
        setSelectedCourse(null);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setCoursesLoading(false); });
    return () => { cancelled = true; };
  }, [selectedSubjectPrefix, selectedClassLevel]);

  const openAddModal = (termId: string) => {
    setTargetTermId(termId);
    setSelectedSubjectPrefix(null);
    setSelectedClassLevel(null);
    setSelectedCourse(null);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setTargetTermId(null);
  };

  const handleAddCourse = () => {
    if (!selectedCourse || !targetTermId) return;
    
    // Attempt to extract credits cleanly (sometimes course format varies. typical default is 3 if unknown)
    const credArr = selectedCourse.credit_hours ? String(selectedCourse.credit_hours).split(/[ -]/) : ['3'];
    const credits = parseInt(credArr[credArr.length - 1] || '3', 10);
    
    const newCourse: CourseItem = {
      id: selectedCourse._id || Math.random().toString(),
      code: `${selectedCourse.subject_prefix} ${selectedCourse.course_number}`,
      name: selectedCourse.title || 'Unknown Course',
      credits: isNaN(credits) ? 3 : credits
    };

    setTerms(prev => prev.map(term => {
      if (term.id === targetTermId) {
        return { ...term, courses: [...term.courses, newCourse] };
      }
      return term;
    }));
    closeAddModal();
  };

  const handleRemoveCourse = (termId: string, courseId: string) => {
    setTerms(prev => prev.map(term => {
      if (term.id === termId) {
        return { ...term, courses: term.courses.filter(c => c.id !== courseId) };
      }
      return term;
    }));
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.root} showsVerticalScrollIndicator={false}>
        <View style={s.gtHeader}>
          <Pressable style={s.backBtn} onPress={onBack}>
            <Ionicons name="chevron-back" size={16} color={theme.colors.textSecondary} />
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
              <Text style={s.credTotal}>/ {TOTAL_DEGREE_CREDITS} CREDITS</Text>
            </View>
          </View>
          <View style={s.bigBarTrack}>
            <View style={[s.bigBarFill, { width: `${Math.min(pct, 100)}%` as any }]} />
          </View>

          {/* Stats */}
          <View style={s.statsRow}>
            {[
              { label: 'Earned',    val: earned, color: theme.colors.text },
              { label: 'In Progress', val: inProgress, color: theme.colors.primary },
              { label: 'Planned', val: planned, color: '#7C3AED' },
            ].map(stat => (
              <View key={stat.label} style={s.statBox}>
                <Text style={[s.statNum, { color: stat.color }]}>{stat.val}</Text>
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={s.hint}>Tap term to view and edit schedule</Text>

          {terms.map(term => {
            const isOpen = expandedSem === term.id;
            const termCredits = term.courses.reduce((sum, c) => sum + (c.credits || 0), 0);
            
            return (
              <View key={term.id} style={[s.semCard, term.status === 'current' && { borderColor: theme.colors.primary }]}>
                <Pressable style={s.semHeader} onPress={() => setExpandedSem(isOpen ? null : term.id)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                      <Text style={s.semName}>{term.name}</Text>
                      <Text style={s.semCredits}>{termCredits} credits</Text>
                    </View>
                    {term.status === 'current' && (
                      <View style={s.semCurrentBadge}>
                        <Text style={s.semCurrentText}>Current</Text>
                      </View>
                    )}
                  </View>
                  <Ionicons name={isOpen ? 'chevron-down' : 'chevron-forward'} size={16} color={theme.colors.textSecondary} />
                </Pressable>

                {isOpen && (
                  <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
                    <View style={s.divider} />
                    {term.courses.length === 0 ? (
                      <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 8, textAlign: 'center' }}>No courses scheduled</Text>
                    ) : (
                      term.courses.map(course => (
                        <View key={course.id} style={s.courseRow}>
                          <View style={{ flex: 1, minWidth: 0 }}>
                            <Text numberOfLines={1} style={s.courseName}>{course.name}</Text>
                            <Text style={s.courseCode}>{course.code}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 8 }}>
                            <Text style={s.crText}>{course.credits}cr</Text>
                            {term.status === 'future' && (
                              <Pressable style={s.removeBtn} onPress={() => handleRemoveCourse(term.id, course.id)}>
                                <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
                              </Pressable>
                            )}
                          </View>
                        </View>
                      ))
                    )}
                    
                    {term.status === 'future' && (
                      <Pressable style={s.addCourseBtn} onPress={() => openAddModal(term.id)}>
                        <Text style={s.addCourseText}>+ Add Course</Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Nebula Course Search Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>Add Course</Text>
            
            {subjectPrefixesLoading ? (
              <View style={{ marginVertical: 16, alignItems: 'center' }}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
                <Text style={{ marginTop: 8, fontSize: 13, color: theme.colors.textSecondary }}>Loading subjects…</Text>
              </View>
            ) : (
              <>
                <Pressable style={s.dropdownTrigger} onPress={() => setDropdownOpen(o => o === 'subject' ? null : 'subject')}>
                  <Text style={selectedSubjectPrefix ? s.dropdownValue : s.dropdownPlaceholder}>
                    {selectedSubjectPrefix ?? 'Subject prefix'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                </Pressable>
                
                <Pressable style={s.dropdownTrigger} onPress={() => setDropdownOpen(o => o === 'class' ? null : 'class')}>
                  <Text style={selectedClassLevel ? s.dropdownValue : s.dropdownPlaceholder}>
                    {selectedClassLevel ?? 'Class level'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                </Pressable>
              </>
            )}

            {!subjectPrefixesLoading && selectedSubjectPrefix && selectedClassLevel && (
              coursesLoading ? (
                <View style={{ marginVertical: 16, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                  <Text style={{ marginTop: 8, fontSize: 13, color: theme.colors.textSecondary }}>Loading courses…</Text>
                </View>
              ) : courses.length === 0 ? (
                <Text style={{ marginVertical: 12, fontSize: 14, color: theme.colors.textSecondary }}>No courses found.</Text>
              ) : (
                <Pressable style={s.dropdownTrigger} onPress={() => setDropdownOpen(o => o === 'course' ? null : 'course')}>
                  <Text style={selectedCourse ? s.dropdownValue : s.dropdownPlaceholder}>
                    {selectedCourse ? `${selectedCourse.subject_prefix} ${selectedCourse.course_number}` : 'Select course'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                </Pressable>
              )
            )}

            <View style={s.modalButtons}>
              <Pressable style={[s.modalButton, s.cancelButton]} onPress={closeAddModal}>
                <Text style={[s.buttonText, s.cancelText]}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={[s.modalButton, s.saveButton, !selectedCourse && { opacity: 0.5 }]} 
                onPress={selectedCourse ? handleAddCourse : undefined}
                disabled={!selectedCourse}
              >
                <Text style={[s.buttonText, s.saveText]}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Dropdown Lists for Modal */}
        {dropdownOpen === 'subject' && (
          <Modal visible transparent animationType="fade">
             <Pressable style={s.dropdownModal} onPress={() => setDropdownOpen(null)}>
               <Pressable style={s.dropdownList} onPress={(e) => e.stopPropagation()}>
                 <ScrollView style={{ maxHeight: 300 }}>
                   {subjectPrefixes.map((p) => (
                     <Pressable key={p.value} style={s.dropdownItem} onPress={() => { setSelectedSubjectPrefix(p.value); setDropdownOpen(null); }}>
                       <Text style={s.dropdownItemText}>{p.label}</Text>
                     </Pressable>
                   ))}
                 </ScrollView>
               </Pressable>
             </Pressable>
          </Modal>
        )}
        {dropdownOpen === 'class' && (
          <Modal visible transparent animationType="fade">
             <Pressable style={s.dropdownModal} onPress={() => setDropdownOpen(null)}>
               <Pressable style={s.dropdownList} onPress={(e) => e.stopPropagation()}>
                 <ScrollView style={{ maxHeight: 300 }}>
                   {CLASS_LEVELS.map((l) => (
                     <Pressable key={l} style={s.dropdownItem} onPress={() => { setSelectedClassLevel(l); setDropdownOpen(null); }}>
                       <Text style={s.dropdownItemText}>{l}</Text>
                     </Pressable>
                   ))}
                 </ScrollView>
               </Pressable>
             </Pressable>
          </Modal>
        )}
        {dropdownOpen === 'course' && (
          <Modal visible transparent animationType="fade">
             <Pressable style={s.dropdownModal} onPress={() => setDropdownOpen(null)}>
               <Pressable style={s.dropdownList} onPress={(e) => e.stopPropagation()}>
                 <ScrollView style={{ maxHeight: 300 }}>
                   {courses.map((c) => (
                     <Pressable key={c._id ?? `${c.subject_prefix}-${c.course_number}`} style={s.dropdownItem} onPress={() => { setSelectedCourse(c); setDropdownOpen(null); }}>
                       <Text style={s.dropdownItemText}>
                         {c.subject_prefix} {c.course_number} – {c.title ?? ''}
                       </Text>
                     </Pressable>
                   ))}
                 </ScrollView>
               </Pressable>
             </Pressable>
          </Modal>
        )}
      </Modal>
    </SafeAreaView>
  );
}

function GradesScreen({ onBack, theme }: { onBack: () => void; theme: any }) {
  const s = createStyles(theme);
  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.root} showsVerticalScrollIndicator={false}>
        <View style={s.gtHeader}>
          <Pressable style={s.backBtn} onPress={onBack}>
            <Ionicons name="chevron-back" size={16} color={theme.colors.textSecondary} />
            <Text style={s.backText}>BACK</Text>
          </Pressable>

          <Text style={s.gtSchool}>Erik Jonsson School · UTD</Text>
          <Text style={s.gtTitle}>My Grades</Text>
          <Text style={s.gtYear}>Cumulative GPA: 3.89</Text>
        </View>

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

export const CoursesScreen: React.FC = () => {
  const { theme } = useTheme();
  const s = createStyles(theme);
  const [page, setPage] = useState<'home' | 'gradtracker' | 'grades'>('home');
  const [terms, setTerms] = useState<TermPlan[]>(INITIAL_TERMS);

  const earned = terms.filter(t => t.status === 'past' || t.status === 'current').flatMap(t => t.courses).reduce((sum, c) => sum + (c.credits || 0), 0);
  const pct = Math.round((earned / TOTAL_DEGREE_CREDITS) * 100);

  if (page === 'gradtracker') {
    return <GradTrackerScreen terms={terms} setTerms={setTerms} onBack={() => setPage('home')} theme={theme} />;
  }
  if (page === 'grades') {
    return <GradesScreen onBack={() => setPage('home')} theme={theme} />;
  }

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.root} showsVerticalScrollIndicator={false}>
        <View style={s.homeHeader}>
          <Text style={s.homeSubtitle}>UTD · CS Department</Text>
          <Text style={s.homeTitle}>My Dashboard</Text>
        </View>

        <View style={s.homeBody}>
          <Pressable style={s.card} onPress={() => setPage('gradtracker')}>
            <View style={s.cardTop}>
              <View style={s.cardTitleRow}>
                <View style={[s.cardIconWrap, { backgroundColor: theme.colors.background }]}>
                  <Ionicons name="school-outline" size={18} color={theme.colors.primary} />
                </View>
                <View>
                  <Text style={s.cardTitle}>Course Tracker</Text>
                  <Text style={s.cardSub}>BS Computer Science · 2025–26</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
            </View>

            <View style={s.barLabel}>
              <Text style={s.barLabelText}>Graduation Progress</Text>
              <Text style={s.barLabelPct}>{pct}%</Text>
            </View>
            <View style={s.barTrack}>
              <View style={[s.barFill, { width: `${pct}%` as any }]} />
            </View>

            <View style={s.creditRow}>
              <Text style={s.creditEarned}>{earned} credits earned</Text>
              <Text style={s.creditLeft}>{TOTAL_DEGREE_CREDITS - earned} remaining</Text>
            </View>
          </Pressable>

          <Pressable style={[s.card, { marginTop: 16 }]} onPress={() => setPage('grades')}>
            <View style={s.cardTop}>
              <View style={s.cardTitleRow}>
                <View style={[s.cardIconWrap, { backgroundColor: theme.colors.background }]}>
                  <Ionicons name="document-text-outline" size={18} color={theme.colors.primary} />
                </View>
                <View>
                  <Text style={s.cardTitle}>Academic Grades</Text>
                  <Text style={s.cardSub}>View transcripts by term</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
