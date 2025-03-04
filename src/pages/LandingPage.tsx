
import React from 'react';
import { Button, Typography, Space, Divider, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

const { Title, Paragraph } = Typography;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sms-blue to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <Title level={1} className="text-white text-4xl md:text-5xl font-bold mb-6">
              School Management System
            </Title>
            <Paragraph className="text-lg md:text-xl mb-8 text-white opacity-90">
              An all-in-one platform for schools, educators, and parents to collaborate and optimize the educational journey.
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                className="bg-white text-blue-700 border-white hover:bg-blue-50 hover:text-blue-800"
                onClick={() => navigate('/vendor/login')}
              >
                School Admin Login
              </Button>
              <Button 
                type="default" 
                size="large" 
                className="text-white border-white hover:bg-white/10" 
                onClick={() => navigate('/institution/login')}
              >
                Staff Login
              </Button>
              <Button 
                type="default" 
                size="large" 
                className="text-white border-white hover:bg-white/10"
                onClick={() => navigate('/guardian/login')}
              >
                Parent Login
              </Button>
            </Space>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">Key Features</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-sms-blue mb-4">
                    <GraduationCap size={32} />
                  </div>
                  <Title level={4}>Academic Management</Title>
                  <Paragraph className="text-gray-600">
                    Comprehensive curriculum planning, assignment tracking, and grade management.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <Users size={32} />
                  </div>
                  <Title level={4}>Attendance Tracking</Title>
                  <Paragraph className="text-gray-600">
                    Real-time attendance monitoring with automated notifications for parents.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <Title level={4}>Fee Management</Title>
                  <Paragraph className="text-gray-600">
                    Streamlined billing, payment tracking, and financial reporting.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                    <BookOpen size={32} />
                  </div>
                  <Title level={4}>Class Management</Title>
                  <Paragraph className="text-gray-600">
                    Organize classes, manage student rosters, and schedule academic activities.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                    <Briefcase size={32} />
                  </div>
                  <Title level={4}>Event Management</Title>
                  <Paragraph className="text-gray-600">
                    Plan and coordinate school events, parent-teacher meetings, and activities.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      className="w-8 h-8"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <Title level={4}>Community Portal</Title>
                  <Paragraph className="text-gray-600">
                    Connect students, parents, and staff through a centralized communication hub.
                  </Paragraph>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-6">Ready to transform your school management?</Title>
          <Paragraph className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of educational institutions that have streamlined their operations with our comprehensive school management solution.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => navigate('/vendor/login')}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Title level={4} className="text-white mb-4">School Management System</Title>
              <Paragraph className="text-gray-400">
                Empowering educational excellence through technology.
              </Paragraph>
            </div>
            <div>
              <Title level={4} className="text-white mb-4">Quick Links</Title>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <Title level={4} className="text-white mb-4">Contact Us</Title>
              <Paragraph className="text-gray-400">
                Email: support@schoolmanagementsystem.com<br />
                Phone: +1 (123) 456-7890
              </Paragraph>
            </div>
          </div>
          <Divider className="border-gray-700" />
          <Paragraph className="text-center text-gray-500 mb-0">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </Paragraph>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
