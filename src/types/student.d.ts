
import type { Gender } from './users';

export type Attendance = {
  present: number;
  absent: number;
  late: number;
  total: number;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  photo: string;
  name?: string;
  status?: string;
  guardianName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  grade?: string;
  section?: string;
  attendance?: number;
  avatar?: string; // Alternative to photo
  nextClass?: string; // For student dashboard
  teacher?: string; // For student dashboard
};
