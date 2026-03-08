/**
 * Nebula API – single entrypoint for UTD Nebula Labs API access.
 *
 * Usage:
 *   import { nebulaApi } from '@/api';
 *   const { data } = await nebulaApi.courseSearch({ subject_prefix: 'CS' });
 *
 * Env: set EXPO_PUBLIC_NEBULA_API_KEY in .env (used in both Expo client and Node tools).
 * @see https://api.utdnebula.com/swagger/index.html
 */

export { nebulaApi, createNebulaClient } from './nebulaClient';
export type { NebulaClientConfig } from './nebulaClient';
export * from './nebula.types';
