import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import Markdown from 'react-native-markdown-display';
import { nebulaApi } from '../api';

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  container: { flex: 1 },
  content: { flex: 1 },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userMessage: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  botMessageText: {
    color: '#1F2937',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    color: '#4B5563',
  },
  sendBtn: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  welcomeText: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 16,
  },
});

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your Temoc AI. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /** Fetches only what’s needed to answer the question. Minimal API calls and token usage. */
  const fetchNebulaContext = async (question: string): Promise<string | null> => {
    const parts: string[] = [];

    try {
      // 1) Courses – explicit code (CS 1337) or subject (CS courses, computer science courses)
      const courseCodeMatch = question.toUpperCase().match(/\b([A-Z]{2,4})\s*([0-9]{4})\b/);
      const courseSubjectMatch = question.match(/\b([A-Z]{2,4})\s+courses?\b/i) ?? question.match(/\b(computer science|math|physics|biology|chemistry)\s+courses?\b/i);
      if (courseCodeMatch) {
        const { data } = await nebulaApi.courseSearch({
          subject_prefix: courseCodeMatch[1],
          course_number: courseCodeMatch[2],
        });
        if (Array.isArray(data) && data.length > 0) {
          const c = data[0];
          parts.push(
            `Course ${c.subject_prefix} ${c.course_number}: ${c.title ?? ''}. ${(c.description ?? '').slice(0, 200)} ${c.credit_hours ?? ''}hrs.`
          );
        }
      } else if (courseSubjectMatch) {
        const raw = courseSubjectMatch[1];
        const prefix = raw.length <= 4 ? raw.toUpperCase() : { computer: 'CS', math: 'MATH', physics: 'PHYS', biology: 'BIOL', chemistry: 'CHEM' }[raw.toLowerCase().split(' ')[0]] ?? raw.slice(0, 4).toUpperCase();
        const { data } = await nebulaApi.courseSearch({ subject_prefix: prefix });
        if (Array.isArray(data) && data.length > 0) {
          const list = data.slice(0, 8).map((c) => `${c.subject_prefix} ${c.course_number}: ${(c.title ?? '').slice(0, 50)}`).join(' | ');
          parts.push(`Courses (Nebula): ${list}`);
        }
      }

      // 2) Professor (e.g. "Professor Smith", "Dr. Lee") → single professorSearch, one prof
      const profMatch = question.match(/\b(?:professor|prof\.?|dr\.?)\s+([A-Za-z]+)(?:\s+([A-Za-z]+))?/i);
      if (profMatch) {
        const first = profMatch[2] ? profMatch[1] : undefined;
        const last = profMatch[2] ?? profMatch[1];
        const { data } = await nebulaApi.professorSearch({ first_name: first, last_name: last });
        if (Array.isArray(data) && data.length > 0) {
          const p = data[0];
          parts.push(
            `Professor: ${(p.first_name ?? '').trim()} ${(p.last_name ?? '').trim()}. Email: ${p.email ?? '—'}. Office: ${p.office?.building ?? ''} ${p.office?.room ?? ''}.`
          );
        }
      }

      // 3) Clubs/orgs – extract topic: "chess club" → search "chess", "clubs for coding" → "coding"
      if (/\b(clubs?|organizations?|orgs?|societ(?:y|ies)|associations?)\b/i.test(question)) {
        const forMatch = question.match(/(?:for|about|related to)\s+(\w+(?:\s+\w+)?)/i);
        const topicBeforeClub = question.match(/(\w+)\s+club/i)?.[1];
        const q = (forMatch?.[1] ?? topicBeforeClub ?? 'club').replace(/\?/g, '').trim().slice(0, 25);
        const { data } = await nebulaApi.clubSearch(q);
        if (Array.isArray(data) && data.length > 0) {
          const list = data.slice(0, 8).map((c) => `${c.name ?? '—'}: ${(c.description ?? '').slice(0, 80)}`).join(' | ');
          parts.push(`Clubs (Nebula): ${list}`);
        }
      }

      // 4) Events – "events", "calendar", "what's happening"
      if (/\b(events?|calendar|happening|going on)\b/i.test(question)) {
        const today = new Date().toISOString().slice(0, 10);
        const { data } = await nebulaApi.cometCalendarEvents(today);
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          const events: string[] = [];
          for (const [bldg, rooms] of Object.entries(data)) {
            if (rooms && typeof rooms === 'object') {
              for (const [room, evts] of Object.entries(rooms)) {
                if (Array.isArray(evts) && evts.length > 0) {
                  evts.slice(0, 2).forEach((e: { summary?: string; start_time?: string }) => {
                    events.push(`${bldg} ${room}: ${e.summary ?? '—'} ${e.start_time ?? ''}`);
                  });
                }
              }
            }
          }
          if (events.length > 0) {
            parts.push(`Events today (Nebula): ${events.slice(0, 6).join(' | ')}`);
          }
        }
      }
    } catch (e) {
      console.warn('Nebula API error:', e);
    }

    if (parts.length === 0) return null;
    return parts.join('\n');
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      const userText = inputText.trim();
      const newMessage: Message = {
        id: Date.now(),
        text: userText,
        isUser: true
      };

      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInputText('');

      const botMessageId = Date.now() + 1;
      setMessages(prev => [...prev, { id: botMessageId, text: '', isUser: false }]);
      setIsTyping(true);

      try {
        const nebulaContext = await fetchNebulaContext(userText);

        const ai = new GoogleGenAI({
          apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY as string,
        });

        const contents = [
          {
            role: 'user',
            parts: [{
              text: nebulaContext
                ? `You are an AI academic assistant for the University of Texas at Dallas.\n\nYou have been given real-time UTD data from the Nebula Labs public API (courses, professors, sections, clubs, events, rooms, grades). You MUST:\n- Base ALL UTD-related facts ONLY on the \"Nebula API\" data provided below.\n- Explicitly attribute facts as \"According to the Nebula API, ...\".\n- NOT claim that you are reading UTD websites, CourseBook, catalogs, or any other live UTD pages.\n- If the student asks where your information comes from, clearly state that it is from the Nebula Labs API exposed in this app.\n\nIf the Nebula API data below does not contain information needed to answer a UTD question, say you do not have enough Nebula data to answer and do NOT guess.\n\nNebula API data:\n${nebulaContext}`
                : `You are an AI academic assistant for the University of Texas at Dallas.\n\nRight now, you have NOT been given any \"Nebula API\" data for this question. For UTD-specific questions (courses, professors, clubs, requirements, policies, events, rooms, etc.) you MUST NOT:\n- Claim that you are reading UTD websites, CourseBook, catalogs, or any other live UTD pages.\n- Present specific UTD facts (course numbers, prerequisites, professor details, organization lists, requirements, policies) as if they are guaranteed to be correct.\n\nIf the student asks a UTD-specific question and you do not have Nebula API data, you MUST respond that you don't currently have live UTD data from the Nebula API for this question and cannot give an authoritative answer. Do NOT guess or invent details.\n\nYou may still answer high-level, non-UTD-specific study or planning questions, but make it clear those are general suggestions, not official UTD data.`,
            }],
          },
          ...newMessages.map(msg => ({
            role: msg.isUser ? 'user' : 'model',
            parts: [{ text: msg.text }],
          })),
        ];

        const response = await ai.models.generateContentStream({
          model: 'gemini-3-flash-preview',
          contents,
          config: {
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.HIGH,
            }
          }
        });

        let isFirstChunk = true;
        for await (const chunk of response) {
          if (isFirstChunk) {
            setIsTyping(false);
            isFirstChunk = false;
          }
          if (chunk.text) {
            setMessages(prev => prev.map(msg =>
              msg.id === botMessageId ? { ...msg, text: msg.text + chunk.text } : msg
            ));
          }
        }
      } catch (error) {
        setIsTyping(false);
        console.error("Gemini Error:", error);
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: "Sorry, I am having trouble connecting to the AI." } : msg
        ));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Temoc AI</Text>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.botMessage
            ]}
          >
            {message.isUser ? (
              <Text style={styles.messageText}>
                {message.text}
              </Text>
            ) : (
              <Markdown style={{ body: styles.botMessageText }}>
                {message.text}
              </Markdown>
            )}
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage, { flexDirection: 'row', alignItems: 'center' }]}>
            <ActivityIndicator size="small" color="#1F2937" style={{ marginRight: 8 }} />
            <Text style={styles.botMessageText}>Temoc AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about courses, schedule, or degree planning..."
          placeholderTextColor="#9CA3AF"
          multiline
        />
        <Pressable style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
