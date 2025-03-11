import React from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Progress,
  Table,
  Badge,
  Tabs,
  Button,
  Collapse,
  Tag,
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface Student {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  teacher: string;
  attendance: number;
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
}

interface SubjectGrade {
  subject: string;
  grade: string;
  score: number;
  teacher: string;
}

const GuardianStudents: React.FC = () => {
  const { user } = useAuth();

  // Mock data for students
  const students: Student[] = [
    {
      id: 'STD001',
      name: 'Emma Smith',
      grade: '5th Grade',
      teacher: 'Ms. Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      attendance: 98,
    },
    {
      id: 'STD002',
      name: 'Noah Smith',
      grade: '3rd Grade',
      teacher: 'Mr. Davis',
      avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
      attendance: 95,
    },
  ];

  // Mock attendance data
  const attendanceData: Record<string, AttendanceRecord[]> = {
    STD001: [
      { date: '2023-05-01', status: 'present' },
      { date: '2023-05-02', status: 'present' },
      { date: '2023-05-03', status: 'present' },
      { date: '2023-05-04', status: 'late' },
      { date: '2023-05-05', status: 'present' },
      { date: '2023-05-08', status: 'present' },
      { date: '2023-05-09', status: 'absent' },
      { date: '2023-05-10', status: 'present' },
    ],
    STD002: [
      { date: '2023-05-01', status: 'present' },
      { date: '2023-05-02', status: 'present' },
      { date: '2023-05-03', status: 'absent' },
      { date: '2023-05-04', status: 'present' },
      { date: '2023-05-05', status: 'present' },
      { date: '2023-05-08', status: 'late' },
      { date: '2023-05-09', status: 'present' },
      { date: '2023-05-10', status: 'present' },
    ],
  };

  // Mock subject grades
  const subjectGrades: Record<string, SubjectGrade[]> = {
    STD001: [
      { subject: 'Mathematics', grade: 'A', score: 92, teacher: 'Mr. Smith' },
      { subject: 'Science', grade: 'B+', score: 88, teacher: 'Ms. Johnson' },
      { subject: 'English', grade: 'A-', score: 91, teacher: 'Mrs. Wilson' },
      { subject: 'History', grade: 'B', score: 85, teacher: 'Mr. Thompson' },
      { subject: 'Art', grade: 'A+', score: 96, teacher: 'Ms. Garcia' },
    ],
    STD002: [
      { subject: 'Mathematics', grade: 'B', score: 84, teacher: 'Mr. Parker' },
      { subject: 'Science', grade: 'A', score: 93, teacher: 'Ms. Adams' },
      { subject: 'English', grade: 'B+', score: 87, teacher: 'Mrs. Wilson' },
      { subject: 'History', grade: 'B-', score: 80, teacher: 'Mr. Clark' },
      { subject: 'Art', grade: 'A-', score: 90, teacher: 'Ms. Garcia' },
    ],
  };

  const getStatusTag = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return (
          <Tag color="success">
            <CheckCircleOutlined /> Present
          </Tag>
        );
      case 'absent':
        return (
          <Tag color="error">
            <CloseCircleOutlined /> Absent
          </Tag>
        );
      case 'late':
        return <Tag color="warning">⏱ Late</Tag>;
      default:
        return null;
    }
  };

  const attendanceColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'present' | 'absent' | 'late') => getStatusTag(status),
    },
  ];

  return (
    <>
      <HeaderBar
        appType="guardian"
        userName={user?.name || 'Guardian User'}
        userAvatar={user?.photo}
      />

      <div className="page-container pt-20 pb-24 animate-fade-in">
        <div className="mb-6">
          <Title level={4} className="!mb-1">
            My Students
          </Title>
          <Text type="secondary">View your children's school records and performance</Text>
        </div>

        {/* Student Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          {students.map(student => (
            <Col xs={24} key={student.id}>
              <Card className="shadow-sm">
                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Title level={4} className="!mb-0">
                        {student.name}
                      </Title>
                      <Text type="secondary">
                        {student.grade} • {student.teacher}
                      </Text>
                    </div>
                  </div>
                </div>

                <Tabs defaultActiveKey="attendance">
                  <TabPane
                    tab={
                      <span>
                        <CalendarOutlined /> Attendance
                      </span>
                    }
                    key="attendance"
                  >
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <Text>Attendance Rate</Text>
                        <Text strong>{student.attendance}%</Text>
                      </div>
                      <Progress
                        percent={student.attendance}
                        showInfo={false}
                        strokeColor="#34C759"
                      />
                    </div>

                    <Table
                      columns={attendanceColumns}
                      dataSource={attendanceData[student.id]}
                      pagination={{ pageSize: 5 }}
                      rowKey="date"
                      size="small"
                    />
                  </TabPane>

                  <TabPane
                    tab={
                      <span>
                        <BookOutlined /> Academic Performance
                      </span>
                    }
                    key="academics"
                  >
                    <Collapse defaultActiveKey={['current']}>
                      <Panel header="Current Term Grades" key="current">
                        <Table
                          columns={[
                            { title: 'Subject', dataIndex: 'subject', key: 'subject' },
                            {
                              title: 'Grade',
                              dataIndex: 'grade',
                              key: 'grade',
                              render: (grade: string) => {
                                let color = 'default';
                                if (grade.startsWith('A')) color = 'success';
                                else if (grade.startsWith('B')) color = 'processing';
                                else if (grade.startsWith('C')) color = 'warning';
                                else if (grade.startsWith('D') || grade.startsWith('F'))
                                  color = 'error';
                                return <Tag color={color}>{grade}</Tag>;
                              },
                            },
                            { title: 'Score', dataIndex: 'score', key: 'score' },
                            { title: 'Teacher', dataIndex: 'teacher', key: 'teacher' },
                          ]}
                          dataSource={subjectGrades[student.id]}
                          pagination={false}
                          rowKey="subject"
                          size="small"
                        />
                      </Panel>
                      <Panel header="Previous Terms" key="previous">
                        <div className="text-center py-4">
                          <Text type="secondary">Historical grades will appear here</Text>
                        </div>
                      </Panel>
                    </Collapse>
                  </TabPane>
                </Tabs>

                <div className="mt-4">
                  <Button type="primary" className="bg-sms-guardian">
                    View Full Profile
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <BottomNavigation appType="guardian" />
    </>
  );
};

export default GuardianStudents;
