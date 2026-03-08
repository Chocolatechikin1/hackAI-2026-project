import React, { useEffect, useRef } from 'react';
import { Platform, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';
import {
  getCoordsForLocation,
  haversineKm,
  WALKING_SPEED_KMH,
  ARRIVAL_BUFFER_MINUTES,
  AT_VENUE_RADIUS_KM,
} from '../utils/utdBuildings';

const CHECK_INTERVAL_MS = 30 * 1000; // 30 seconds so "leave now" alert can fire soon after adding the event

interface StoredEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  startHour: number;
  startMinute: number;
}

function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function eventStartMinutesFromMidnight(ev: StoredEvent): number {
  return ev.startHour * 60 + ev.startMinute;
}

function nowMinutesFromMidnight(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

async function getCurrentPosition(): Promise<{ lat: number; lng: number } | null> {
  if (Platform.OS === 'web') {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }
  try {
    const expoLocation = require('expo-location').default;
    const { status } = await expoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    const loc = await expoLocation.getCurrentPositionAsync({ accuracy: expoLocation.Accuracy.High });
    return { lat: loc.coords.latitude, lng: loc.coords.longitude };
  } catch {
    return null;
  }
}

async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') {
    if (typeof Notification === 'undefined') return false;
    if (Notification.permission === 'granted') return true;
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }
  try {
    const Notifications = require('expo-notifications').default;
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === 'granted') return true;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

async function showLocalNotification(title: string, body: string): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    return;
  }
  try {
    const Notifications = require('expo-notifications').default;
    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: null },
      trigger: null,
    });
  } catch (_) {
    try {
      await require('expo-notifications').default.presentNotificationAsync({
        title,
        body,
        data: {},
      });
    } catch (_) {}
  }
}

export function LeaveNowNotificationService() {
  const notifiedRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkAndNotify = async () => {
    try {
      const enabledRaw = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
      if (enabledRaw === 'false') return;

      const eventsRaw = await AsyncStorage.getItem(STORAGE_KEYS.SCHEDULE_EVENTS);
      if (!eventsRaw) return;
      const events = JSON.parse(eventsRaw) as StoredEvent[];
      if (!Array.isArray(events)) return;

      const today = getTodayDateString();
      const nowMinutes = nowMinutesFromMidnight();
      const userPos = await getCurrentPosition();
      if (!userPos) return;

      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) return;

      for (const ev of events) {
        if (ev.date !== today) continue;
        const startMinutes = eventStartMinutesFromMidnight(ev);
        if (startMinutes <= nowMinutes) continue; // already started

        const coords = getCoordsForLocation(ev.location);
        if (!coords) continue;

        const distanceKm = haversineKm(userPos.lat, userPos.lng, coords.lat, coords.lng);
        if (distanceKm <= AT_VENUE_RADIUS_KM) continue; // already at venue

        const travelTimeMinutes = (distanceKm / WALKING_SPEED_KMH) * 60;
        const leaveByMinutes = startMinutes - ARRIVAL_BUFFER_MINUTES - Math.ceil(travelTimeMinutes);
        if (nowMinutes < leaveByMinutes) continue; // not yet time to leave

        const key = `${ev.id}-${ev.date}`;
        if (notifiedRef.current.has(key)) continue;
        notifiedRef.current.add(key);

        await showLocalNotification(
          'Time to leave',
          `${ev.title} at ${ev.location} — leave now to arrive ~10 min early.`
        );
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Request location on web so the browser shows the permission prompt at startup
      getCurrentPosition().catch(() => {});
    } else {
      try {
        const Notifications = require('expo-notifications').default;
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });
      } catch (_) {}
    }
    const onAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') checkAndNotify();
    };
    const sub = AppState.addEventListener('change', onAppStateChange);
    const id = setInterval(checkAndNotify, CHECK_INTERVAL_MS);
    intervalRef.current = id;
    checkAndNotify();

    return () => {
      sub.remove();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}
