export type Student = User & {
    registrationNumber: string;
    dateOfBirth: string;
    gender: Gender;
    institutionId: string;
    organizationId: string;
    unit: string;
    level: string;
    status: 'pending' | 'active' | 'inactive' | 'terminated';
    createdAt: string;
    guardianName?: string;
    guardianPhoneNumber?: string;
    guardianEmail?: string;
    guardianAddress?: string;
    attendance?: Attendance[];
};

export type Student = User & {
    registrationNumber: string;
    dateOfBirth: string;
    gender: Gender;
    institutionId: string;
    organizationId: string;
    unit: string;
    level: string;
    status: 'pending' | 'active' | 'inactive' | 'terminated';
    createdAt: string;
    guardianName?: string;
    guardianPhoneNumber?: string;
    guardianEmail?: string;
    guardianAddress?: string;
    attendance?: Attendance[];
    weeklyAttendance?: AttendanceAggregate;
    monthlyAttendance?: AttendanceAggregate;
    semesterAttendance?: AttendanceAggregate;
};

type AttendanceStatus = 'present' | 'absent';

export type Attendance = {
    id: string;
    studentId: string;
    date: string;
    status: AttendanceStatus;
    remarks?: string;
};

type AttendanceAggregate = {
    studentId: string;
    period: 'weekly' | 'monthly' | 'semester';
    startDate: string;
    endDate: string;
    totalPresent: number;
    totalAbsent: number;
};

export type WeeklyAttendance = AttendanceAggregate & {
    period: 'weekly';
};

export type MonthlyAttendance = AttendanceAggregate & {
    period: 'monthly';
};

export type SemesterAttendance = AttendanceAggregate & {
    period: 'semester';
};
