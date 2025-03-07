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
    period: 'weekly' | 'monthly' | 'yearly';
    startDate: string;
    endDate: string;
    totalPresent: number;
    totalAbsent: number;
};
