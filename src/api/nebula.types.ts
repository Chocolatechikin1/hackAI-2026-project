/**
 * Nebula API types (UTD Nebula Labs API)
 * @see https://api.utdnebula.com/swagger/index.html
 * @see https://github.com/UTDNebula/nebula-api
 */

/** Every API response wraps data in this shape. */
export interface NebulaApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// --- Events ---
export interface AstraEvent {
  activity_name?: string;
  capacity?: number;
  current_state?: string;
  end_date?: string;
  meeting_type?: string;
  not_allowed_usage_mask?: number;
  start_date?: string;
  usage_color?: string;
}

export interface NebulaEvent {
  _id?: string;
  contact_email?: string;
  contact_name?: string;
  contact_phone_number?: string;
  department?: string[];
  description?: string;
  end_time?: string;
  event_tags?: string[];
  event_type?: string[];
  event_website?: string;
  location?: string;
  start_time?: string;
  summary?: string;
  target_audience?: string[];
  topic?: string[];
}

export interface MazevoEvent {
  contactName?: string;
  dateTimeEnd?: string;
  dateTimeStart?: string;
  eventName?: string;
  organizationName?: string;
  setupMinutes?: number;
  statusColor?: string;
  statusDescription?: string;
}

export interface MultiBuildingEvents<T> {
  [building: string]: { [room: string]: T[] };
}

export interface SingleBuildingEvents<T> {
  [room: string]: T[];
}

export interface RoomEvents<T> {
  [room: string]: T[];
}

// --- Other ---
export interface Autocomplete {
  course_numbers?: Array<{ academic_sessions?: unknown[]; course_number?: string; title?: string }>;
  subject_prefix?: string;
}

// --- Clubs ---
export interface Club {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  profile_image?: string;
  tags?: string[];
  contacts?: Array<{ platform?: string; url?: string }>;
  officers?: Record<string, string>[];
  updated_at?: string;
}

// --- Courses ---
export interface Course {
  _id?: string;
  subject_prefix?: string;
  course_number?: string;
  title?: string;
  description?: string;
  school?: string;
  credit_hours?: string;
  class_level?: string;
  activity_type?: string;
  grading?: string;
  internal_course_number?: string;
  lecture_contact_hours?: string;
  laboratory_contact_hours?: string;
  offering_frequency?: string;
  catalog_year?: string;
  sections?: string[];
  prerequisites?: unknown;
  corequisites?: unknown;
  co_or_pre_requisites?: unknown;
  enrollment_reqs?: string;
  attributes?: unknown;
}

export interface Professor {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  office?: { building?: string; room?: string; map_uri?: string };
  office_hours?: Array<{ start_time?: string; end_time?: string; meeting_days?: string[] }>;
}

export interface Section {
  _id?: string;
  section_number?: string;
  course_reference?: string;
  section_capacity?: number;
  academic_session?: unknown;
  professors?: string[];
  teaching_assistants?: unknown[];
  internal_class_number?: string;
  instruction_mode?: string;
  meetings?: unknown[];
}

export interface GradeData {
  _id?: string;
  grade_distribution?: number[];
}

export interface TypedGradeData {
  [key: string]: unknown;
}

// --- Discounts ---
export interface DiscountProgram {
  _id?: string;
  business?: string;
  category?: string;
  discount?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

// --- Rooms / Buildings ---
export interface Room {
  [key: string]: unknown;
}

export interface BuildingRooms {
  building?: string;
  lat?: number;
  lng?: number;
  rooms?: Room[];
}

// --- Storage ---
export interface BucketInfo {
  name?: string;
  created?: string;
  updated?: string;
  contents?: string[];
}

export interface ObjectInfo {
  [key: string]: unknown;
}

// --- Section with time (events) ---
export interface SectionWithTime {
  [key: string]: unknown;
}
