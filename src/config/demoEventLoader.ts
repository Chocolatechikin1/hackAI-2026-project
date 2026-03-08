/**
 * Optional demo event loader.
 * Uses demoEvent.template (always exists). If demoEvent.ts is present, copy from template and customize.
 * The app works either way - no demoEvent.ts required.
 */

import type { DemoEventShape } from './demoEvent.template';

/**
 * Returns the demo event, or null if unavailable.
 * Safe to call - uses template which always exists.
 */
export async function getDemoEventOptional(): Promise<DemoEventShape | null> {
  try {
    const m = await import('./demoEvent.template');
    return m.getDemoEvent?.() ?? null;
  } catch {
    return null;
  }
}
