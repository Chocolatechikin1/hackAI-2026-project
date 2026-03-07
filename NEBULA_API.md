# Nebula API integration

This project uses the [UTD Nebula Labs API](https://api.utdnebula.com) via a typed client so the app and AI assistance can access UTD data (courses, professors, sections, clubs, events, grades, etc.) in one place.

## How the AI has access

1. **Single client**  
   All Nebula calls go through `src/api`: `nebulaApi` (singleton) or `createNebulaClient(config)`. No scattered `fetch` calls to the API.

2. **Types**  
   `src/api/nebula.types.ts` defines `NebulaApiResponse<T>` and entity types (Course, Professor, Section, Club, etc.) so the AI and IDE get correct types and autocomplete.

3. **Cursor rule**  
   `.cursor/rules/nebula-api.mdc` is set to `alwaysApply: true` for `src/**/*.{ts,tsx,js,jsx}`. That gives Cursor (and any AI using the project) consistent context: use `nebulaApi` from `@/api` or `src/api`, and which methods exist.

So “giving the AI access” is: **one client, one entrypoint, one rule that tells the AI to use it.**

## Usage

```ts
import { nebulaApi } from '@/api';  // or from '../api' etc.

const { data } = await nebulaApi.courseSearch({ subject_prefix: 'CS' });
const { data: club } = await nebulaApi.clubSearch('chess');
const { data: events } = await nebulaApi.cometCalendarEvents('2025-03-07');
```

Every method returns `Promise<NebulaApiResponse<T>>`; the payload is in `data`.

## API key (env)

Use a single env var for Nebula everywhere:

- Set `EXPO_PUBLIC_NEBULA_API_KEY` in `.env`.  
  - Expo (client) sees it because it starts with `EXPO_PUBLIC_`.
  - Node scripts/tools can also read the same variable if needed.

## API reference

- Swagger: https://api.utdnebula.com/swagger/index.html  
- Repo: https://github.com/UTDNebula/nebula-api/
