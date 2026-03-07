/**
 * UTD Nebula API client – full access to api.utdnebula.com
 * @see https://api.utdnebula.com/swagger/index.html
 * Auth: set x-api-key header (use EXPO_PUBLIC_NEBULA_API_KEY in .env)
 */

import type {
  NebulaApiResponse,
  AstraEvent,
  NebulaEvent,
  MazevoEvent,
  MultiBuildingEvents,
  SingleBuildingEvents,
  RoomEvents,
  Autocomplete,
  Club,
  Course,
  Professor,
  Section,
  GradeData,
  TypedGradeData,
  DiscountProgram,
  BuildingRooms,
  BucketInfo,
  ObjectInfo,
} from './nebula.types';

const NEBULA_BASE = 'https://api.utdnebula.com';

function getApiKey(): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.EXPO_PUBLIC_NEBULA_API_KEY || undefined;
  }
  return undefined;
}

export interface NebulaClientConfig {
  apiKey?: string;
  baseUrl?: string;
}

/**
 * Create a Nebula API client. Uses env API key if none provided.
 */
export function createNebulaClient(config?: NebulaClientConfig) {
  const base = config?.baseUrl ?? NEBULA_BASE;
  const apiKey = config?.apiKey ?? getApiKey();

  async function get<T>(
    path: string,
    query?: Record<string, string | number | undefined>
  ): Promise<NebulaApiResponse<T>> {
    const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
    const u = new URL(url);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== '') u.searchParams.set(k, String(v));
      }
    }
    const headers: Record<string, string> = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    const res = await fetch(u.toString(), { headers });
    const json = (await res.json()) as NebulaApiResponse<T>;
    if (!res.ok) {
      const msg = typeof (json as { message?: string })?.message === 'string'
        ? (json as { message: string }).message
        : res.statusText;
      throw new Error(`Nebula API ${res.status}: ${msg}`);
    }
    return json;
  }

  return {
    // —— Events: Astra ——
    astraEvents: (date: string) =>
      get<MultiBuildingEvents<AstraEvent>>(`/astra/${encodeURIComponent(date)}`),
    astraEventsByBuilding: (date: string, building: string) =>
      get<SingleBuildingEvents<AstraEvent>>(
        `/astra/${encodeURIComponent(date)}/${encodeURIComponent(building)}`
      ),
    astraEventsByBuildingAndRoom: (
      date: string,
      building: string,
      room: string
    ) =>
      get<SingleBuildingEvents<AstraEvent>>(
        `/astra/${encodeURIComponent(date)}/${encodeURIComponent(building)}/${encodeURIComponent(room)}`
      ),

    // —— Events: Calendar (Comet) ——
    cometCalendarEvents: (date: string) =>
      get<MultiBuildingEvents<NebulaEvent>>(
        `/calendar/${encodeURIComponent(date)}`
      ),
    cometCalendarEventsByBuilding: (date: string, building: string) =>
      get<SingleBuildingEvents<NebulaEvent>>(
        `/calendar/${encodeURIComponent(date)}/${encodeURIComponent(building)}`
      ),
    cometCalendarEventsByBuildingAndRoom: (
      date: string,
      building: string,
      room: string
    ) =>
      get<RoomEvents<NebulaEvent>>(
        `/calendar/${encodeURIComponent(date)}/${encodeURIComponent(building)}/${encodeURIComponent(room)}`
      ),

    // —— Events: Mazevo ——
    mazevoEvents: (date: string) =>
      get<MultiBuildingEvents<MazevoEvent>>(
        `/mazevo/${encodeURIComponent(date)}`
      ),

    // —— Events: Sections (by date/building/room) ——
    eventsByDate: (date: string) =>
      get<MultiBuildingEvents<unknown>>(
        `/events/${encodeURIComponent(date)}`
      ),
    eventsByBuilding: (date: string, building: string) =>
      get<SingleBuildingEvents<unknown>>(
        `/events/${encodeURIComponent(date)}/${encodeURIComponent(building)}`
      ),
    eventsByRoom: (date: string, building: string, room: string) =>
      get<RoomEvents<unknown>>(
        `/events/${encodeURIComponent(date)}/${encodeURIComponent(building)}/${encodeURIComponent(room)}`
      ),
    sectionsByRoomDetailed: (date: string, building: string, room: string) =>
      get<RoomEvents<Section>>(
        `/events/${encodeURIComponent(date)}/${encodeURIComponent(building)}/${encodeURIComponent(room)}/sections`
      ),

    // —— Other ——
    autocompleteDAG: () => get<Autocomplete[]>('/autocomplete/dag'),

    // —— Clubs ——
    clubSearch: (q: string) =>
      get<Club[]>('/club/search', { q }),
    clubGet: (id: string) =>
      get<Club>(`/club/${encodeURIComponent(id)}`),

    // —— Courses ——
    courseSearch: (params?: {
      offset?: number;
      course_number?: string;
      subject_prefix?: string;
      title?: string;
      description?: string;
      school?: string;
      credit_hours?: string;
      class_level?: string;
      activity_type?: string;
      grading?: string;
      internal_course_number?: string;
      lecture_contact_hours?: string;
      offering_frequency?: string;
    }) => get<Course[]>('/course', params as Record<string, string | number | undefined>),
    courseAll: () => get<Course[]>('/course/all'),
    courseProfessorSearch: (params?: {
      former_offset?: number;
      latter_offset?: number;
      course_number?: string;
      subject_prefix?: string;
      title?: string;
      description?: string;
      school?: string;
      credit_hours?: string;
      class_level?: string;
      activity_type?: string;
      grading?: string;
      internal_course_number?: string;
      lecture_contact_hours?: string;
      offering_frequency?: string;
    }) => get<Professor[]>('/course/professors', params as Record<string, string | number | undefined>),
    courseSectionSearch: (params?: {
      former_offset?: number;
      latter_offset?: number;
      course_number?: string;
      subject_prefix?: string;
      title?: string;
      description?: string;
      school?: string;
      credit_hours?: string;
      class_level?: string;
      activity_type?: string;
      grading?: string;
      internal_course_number?: string;
      lecture_contact_hours?: string;
      offering_frequency?: string;
    }) => get<Section[]>('/course/sections', params as Record<string, string | number | undefined>),
    trendsCourseSectionSearch: (course_number: string, subject_prefix: string) =>
      get<Section[]>('/course/sections/trends', {
        course_number,
        subject_prefix,
      }),
    courseById: (id: string) =>
      get<Course>(`/course/${encodeURIComponent(id)}`),
    gradesByCourseId: (id: string) =>
      get<number[]>(`/course/${encodeURIComponent(id)}/grades`),
    courseProfessorsById: (id: string) =>
      get<Professor[]>(`/course/${encodeURIComponent(id)}/professors`),
    courseSectionsById: (id: string) =>
      get<Section[]>(`/course/${encodeURIComponent(id)}/sections`),

    // —— Discounts ——
    discountPrograms: (params?: {
      offset?: number;
      category?: string;
      business?: string;
      address?: string;
      discount?: string;
      q?: string;
    }) => get<DiscountProgram[]>('/discountPrograms', params as Record<string, string | number | undefined>),

    // —— Grades ——
    gradeAggregationOverall: (params?: {
      prefix?: string;
      number?: string;
      first_name?: string;
      last_name?: string;
      section_number?: string;
    }) => get<number[]>('/grades/overall', params as Record<string, string | number | undefined>),
    gradeAggregationBySemester: (params?: {
      prefix?: string;
      number?: string;
      first_name?: string;
      last_name?: string;
      section_number?: string;
    }) => get<GradeData[]>('/grades/semester', params as Record<string, string | number | undefined>),
    gradeAggregationSectionType: (params?: {
      prefix?: string;
      number?: string;
      first_name?: string;
      last_name?: string;
      section_number?: string;
    }) => get<TypedGradeData[]>('/grades/semester/sectionType', params as Record<string, string | number | undefined>),

    // —— Professors ——
    professorSearch: (params?: {
      offset?: number;
      first_name?: string;
      last_name?: string;
      email?: string;
      phone_number?: string;
      'office.building'?: string;
      'office.room'?: string;
      'office.map_uri'?: string;
      'teaching_assistants.first_name'?: string;
      'teaching_assistants.last_name'?: string;
      'teaching_assistants.role'?: string;
      'teaching_assistants.email'?: string;
    }) => get<Professor[]>('/professor', params as Record<string, string | number | undefined>),
    professorAll: () => get<Professor[]>('/professor/all'),
    professorCourses: (params?: {
      former_offset?: number;
      latter_offset?: number;
      first_name?: string;
      last_name?: string;
      email?: string;
      phone_number?: string;
      'office.building'?: string;
      'office.room'?: string;
      'office.map_uri'?: string;
      'teaching_assistants.first_name'?: string;
      'teaching_assistants.last_name'?: string;
      'teaching_assistants.role'?: string;
      'teaching_assistants.email'?: string;
    }) => get<Course[]>('/professor/courses', params as Record<string, string | number | undefined>),
    professorSections: (params?: {
      former_offset?: number;
      latter_offset?: number;
      first_name?: string;
      last_name?: string;
      email?: string;
      phone_number?: string;
      'office.building'?: string;
      'office.room'?: string;
      'office.map_uri'?: string;
      'teaching_assistants.first_name'?: string;
      'teaching_assistants.last_name'?: string;
      'teaching_assistants.role'?: string;
      'teaching_assistants.email'?: string;
    }) => get<Section[]>('/professor/sections', params as Record<string, string | number | undefined>),
    trendsProfessorSectionSearch: (params: { first_name: string; last_name: string }) =>
      get<Section[]>('/professor/sections/trends', params),
    professorById: (id: string) =>
      get<Professor>(`/professor/${encodeURIComponent(id)}`),
    professorCoursesById: (id: string) =>
      get<Course[]>(`/professor/${encodeURIComponent(id)}/courses`),
    professorGradesById: (id: string) =>
      get<number[]>(`/professor/${encodeURIComponent(id)}/grades`),
    professorSectionsById: (id: string) =>
      get<Section[]>(`/professor/${encodeURIComponent(id)}/sections`),

    // —— Rooms ——
    rooms: () => get<BuildingRooms[]>('/rooms'),

    // —— Sections ——
    sectionSearch: (params?: {
      offset?: number;
      section_number?: string;
      'academic_session.name'?: string;
      'academic_session.start_date'?: string;
      'academic_session.end_date'?: string;
      'teaching_assistants.first_name'?: string;
      'teaching_assistants.last_name'?: string;
      'teaching_assistants.role'?: string;
      'teaching_assistants.email'?: string;
      internal_class_number?: string;
      instruction_mode?: string;
      'meetings.start_date'?: string;
      'meetings.end_date'?: string;
      'meetings.meeting_days'?: string;
      'meetings.start_time'?: string;
      'meetings.end_time'?: string;
      'meetings.modality'?: string;
      'meetings.location.building'?: string;
      'meetings.location.room'?: string;
      'meetings.location.map_uri'?: string;
      core_flags?: string;
      syllabus_uri?: string;
    }) => get<Section[]>('/section', params as Record<string, string | number | undefined>),
    sectionCourseSearch: (params?: {
      former_offset?: number;
      latter_offset?: number;
      section_number?: string;
      'academic_session.name'?: string;
      'academic_session.start_date'?: string;
      'academic_session.end_date'?: string;
      'teaching_assistants.first_name'?: string;
      'teaching_assistants.last_name'?: string;
      'teaching_assistants.role'?: string;
      'teaching_assistants.email'?: string;
      internal_class_number?: string;
      instruction_mode?: string;
      'meetings.start_date'?: string;
      'meetings.end_date'?: string;
      'meetings.meeting_days'?: string;
      'meetings.start_time'?: string;
      'meetings.end_time'?: string;
      'meetings.modality'?: string;
      'meetings.location.building'?: string;
      'meetings.location.room'?: string;
      'meetings.location.map_uri'?: string;
      core_flags?: string;
      syllabus_uri?: string;
    }) => get<Course[]>('/section/courses', params as Record<string, string | number | undefined>),
    sectionProfessorSearch: (params?: {
      former_offset?: number;
      latter_offset?: number;
      section_number?: string;
      'academic_session.name'?: string;
      'academic_session.start_date'?: string;
      'academic_session.end_date'?: string;
      'teaching_assistants.first_name'?: string;
      'teaching_assistants.last_name'?: string;
      'teaching_assistants.role'?: string;
      'teaching_assistants.email'?: string;
      internal_class_number?: string;
      instruction_mode?: string;
      'meetings.start_date'?: string;
      'meetings.end_date'?: string;
      'meetings.meeting_days'?: string;
      'meetings.start_time'?: string;
      'meetings.end_time'?: string;
      'meetings.modality'?: string;
      'meetings.location.building'?: string;
      'meetings.location.room'?: string;
      'meetings.location.map_uri'?: string;
      core_flags?: string;
      syllabus_uri?: string;
    }) => get<Professor[]>('/section/professors', params as Record<string, string | number | undefined>),
    sectionById: (id: string) =>
      get<Section>(`/section/${encodeURIComponent(id)}`),
    sectionCourse: (id: string) =>
      get<Course>(`/section/${encodeURIComponent(id)}/course`),
    sectionGrades: (id: string) =>
      get<number[]>(`/section/${encodeURIComponent(id)}/grades`),
    sectionProfessors: (id: string) =>
      get<Professor[]>(`/section/${encodeURIComponent(id)}/professors`),

    // —— Storage ——
    storageBucket: (bucket: string) =>
      get<BucketInfo>(`/storage/${encodeURIComponent(bucket)}`),
    storageObject: (bucket: string, objectID: string) =>
      get<ObjectInfo>(
        `/storage/${encodeURIComponent(bucket)}/${encodeURIComponent(objectID)}`
      ),
    storageObjectUrl: (bucket: string, objectID: string) =>
      get<{ url?: string }>(
        `/storage/${encodeURIComponent(bucket)}/${encodeURIComponent(objectID)}/url`
      ),
  };
}

/** Singleton client using env API key. Use this for app-wide access. */
export const nebulaApi = createNebulaClient();
