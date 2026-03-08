/**
 * TEMPLATE: Demo event for testing "leave now" notifications.
 * Copy this file to demoEvent.ts (demoEvent.ts is gitignored) and edit.
 *
 * To get an immediate alert:
 * - Set DEMO_EVENT_DATE_OVERRIDE to today (YYYY-MM-DD).
 * - Set DEMO_EVENT_START_HOUR / DEMO_EVENT_START_MINUTE to a time 2–5 min from now.
 * - Set DEMO_EVENT_LOCATION to a building *other* than where you are (e.g. JO when at ECSW).
 * Location must match a UTD building abbreviation (ECSS, JO, MC, ECSW, etc.).
 */

function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** If set, use this date (YYYY-MM-DD) instead of today. Set for immediate "leave now" at a specific time. */
export const DEMO_EVENT_DATE_OVERRIDE: string | null = '2026-03-08';

/** When DATE_OVERRIDE is set: event start time (24h). Give yourself 2–5 min to get the app running (e.g. 12:35 AM). */
export const DEMO_EVENT_START_HOUR = 0;
export const DEMO_EVENT_START_MINUTE = 35;

/** When DATE_OVERRIDE is null: start time = now + this many minutes. */
export const DEMO_EVENT_START_MINUTES_FROM_NOW = 5;

/** Event title (e.g. "CS 4341 – Office Hours", "Study Group – JO 1.110"). */
export const DEMO_EVENT_TITLE = 'CS 4341 – Office Hours';

/** Event location: UTD building *other* than your current location so "leave now" fires. */
export const DEMO_EVENT_LOCATION = 'JO 1.110';

export interface DemoEventShape {
  id: number;
  title: string;
  location: string;
  date: string;
  startHour: number;
  startMinute: number;
}

/**
 * Returns the demo event. Uses fixed date/time when DEMO_EVENT_DATE_OVERRIDE is set; otherwise now + DEMO_EVENT_START_MINUTES_FROM_NOW.
 */
export function getDemoEvent(): DemoEventShape {
  if (DEMO_EVENT_DATE_OVERRIDE) {
    return {
      id: 9001,
      title: DEMO_EVENT_TITLE,
      location: DEMO_EVENT_LOCATION,
      date: DEMO_EVENT_DATE_OVERRIDE,
      startHour: DEMO_EVENT_START_HOUR,
      startMinute: DEMO_EVENT_START_MINUTE,
    };
  }
  const d = new Date();
  const nowMinutes = d.getHours() * 60 + d.getMinutes();
  const startMinutes = nowMinutes + DEMO_EVENT_START_MINUTES_FROM_NOW;
  const startHour = Math.floor(startMinutes / 60) % 24;
  const startMinute = startMinutes % 60;
  return {
    id: 9001,
    title: DEMO_EVENT_TITLE,
    location: DEMO_EVENT_LOCATION,
    date: getTodayDateString(),
    startHour,
    startMinute,
  };
}
