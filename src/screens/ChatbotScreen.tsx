import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import Markdown from 'react-native-markdown-display';

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
    { id: 1, text: "Hello! I'm your AI academic assistant. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
        const ai = new GoogleGenAI({
          apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY as string,
        });

        const contents = newMessages.map(msg => ({
          role: msg.isUser ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

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
        <Text style={styles.welcomeText}>AI Academic Assistant</Text>
        
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
            <Text style={styles.botMessageText}>AI is thinking...</Text>
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
