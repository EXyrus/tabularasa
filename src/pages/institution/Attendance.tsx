import React, { useState } from 'react';
import { Typography, Card, Radio, Table, Button, DatePicker, Tag, Space, Alert } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface StudentAttendance {
  key: string;
  id: string;
  name: string;
  class: string;
  status: 'present' | 'absent' | 'late' | '';
}

const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [classFilter, setClassFilter] = useState<string>('all');
  const [studentsData, setStudentsData] = useState<StudentAttendance[]>([
    { key: '1', id: 'STD001', name: 'Alice Johnson', class: '5A', status: 'present' },
    { key: '2', id: 'STD002', name: 'Bob Smith', class: '5A', status: 'absent' },
    { key: '3', id: 'STD003', name: 'Charlie Brown', class: '5A', status: 'present' },
    { key: '4', id: 'STD004', name: 'Diana Miller', class: '5A', status: 'late' },
    { key: '5', id: 'STD005', name: 'Ethan Davis', class: '5B', status: 'present' },
    { key: '6', id: 'STD006', name: 'Fiona Wilson', class: '5B', status: 'present' },
    { key: '7', id: 'STD007', name: 'George Martin', class: '5B', status: 'absent' },
    { key: '8', id: 'STD008', name: 'Hannah Clark', class: '5B', status: 'present' },
  ]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStatusChange = (value: string, studentId: string) => {
    setStudentsData(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, status: value as 'present' | 'absent' | 'late' }
          : student
      )
    );
  };

  const handleSaveAttendance = () => {
    // In a real app, this would make an API call to save the attendance data
    console.log('Saving attendance for', selectedDate.format('YYYY-MM-DD'), studentsData);

    // Show success message
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: StudentAttendance) => (
        <Radio.Group
          value={record.status}
          onChange={e => handleStatusChange(e.target.value, record.id)}
          buttonStyle="solid"
        >
          <Radio.Button value="present">
            <CheckCircleOutlined className="text-green-500" /> Present
          </Radio.Button>
          <Radio.Button value="absent">
            <CloseCircleOutlined className="text-red-500" /> Absent
          </Radio.Button>
          <Radio.Button value="late">
            <span className="text-amber-500">⏱</span> Late
          </Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  const filteredStudents =
    classFilter === 'all'
      ? studentsData
      : studentsData.filter(student => student.class === classFilter);

  const classSummary = studentsData.reduce(
    (acc, student) => {
      if (!acc[student.class]) {
        acc[student.class] = { total: 0, present: 0, absent: 0, late: 0 };
      }
      acc[student.class].total++;
      if (student.status) acc[student.class][student.status]++;
      return acc;
    },
    {} as Record<string, { total: number; present: number; absent: number; late: number }>
  );

  return (
    <>
      <HeaderBar
        appType="institution"
        userName={user?.name || 'Institution User'}
        userAvatar={user?.photo}
      />

      <div className="page-container pt-20 pb-24 animate-fade-in">
        <div className="mb-6">
          <Title level={4} className="!mb-1">
            Student Attendance
          </Title>
          <Text type="secondary">Mark and view daily attendance records</Text>
        </div>

        {saveSuccess && (
          <Alert
            message="Attendance saved successfully!"
            type="success"
            showIcon
            className="mb-4"
            closable
          />
        )}

        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <Text strong>Select Date:</Text>
              <DatePicker
                value={selectedDate}
                onChange={date => date && setSelectedDate(date)}
                className="ml-2"
                allowClear={false}
              />
            </div>

            <div>
              <Text strong className="mr-2">
                Filter by Class:
              </Text>
              <Radio.Group value={classFilter} onChange={e => setClassFilter(e.target.value)}>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="5A">5A</Radio.Button>
                <Radio.Button value="5B">5B</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <Title level={5}>Class Summary</Title>
          <div className="flex flex-wrap gap-4">
            {Object.entries(classSummary).map(([className, stats]) => (
              <Card key={className} className="flex-1 min-w-[200px]">
                <Title level={5} className="!mb-2">
                  Class {className}
                </Title>
                <div className="flex gap-2 flex-wrap">
                  <Tag color="default">Total: {stats.total}</Tag>
                  <Tag color="success">Present: {stats.present}</Tag>
                  <Tag color="error">Absent: {stats.absent}</Tag>
                  <Tag color="warning">Late: {stats.late}</Tag>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <Table
            dataSource={filteredStudents}
            columns={columns}
            pagination={false}
            rowKey="id"
            scroll={{ x: true }}
          />

          <div className="mt-4 flex justify-end">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveAttendance}
              size="large"
              className="bg-sms-blue"
            >
              Save Attendance
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation appType="institution" />
    </>
  );
};

export default AttendancePage;
