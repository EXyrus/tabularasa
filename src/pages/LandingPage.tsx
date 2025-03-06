import React from 'react';
import {
    CheckCircleOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Divider,
    Layout,
    List,
    Row,
    Space,
    Statistic,
    Typography
} from 'antd';
import { motion } from 'framer-motion';
import studentImage from '@/assets/student-with-book.jpg';
import { 
  BookOpen, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sms-blue to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <Title level={1} className="text-white text-4xl md:text-5xl font-bold mb-6">
              Tabula Rasa
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
                Vendor Login
              </Button>
              <Button 
                type="default" 
                size="large" 
                className="bg-white text-blue-700 border-white hover:bg-blue-50 hover:text-blue-800"
                onClick={() => navigate('/institution/login')}
              >
                Institution Login
              </Button>
              <Button 
                type="default" 
                size="large" 
                className="bg-white text-blue-700 border-white hover:bg-blue-50 hover:text-blue-800"
                onClick={() => navigate('/guardian/login')}
              >
                Parent/Guardian Login
              </Button>
            </Space>
          </div>
        </div>
      </section>
      <Content className='pt-16'>
                <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={staggerChildren}
                    className='container mx-auto py-8'
                >
                    <Row gutter={[32, 32]} className='mb-16'>
                        <Col span={24} md={12}>
                            <motion.div variants={fadeInUp}>
                                <Title>
                                    Empower Your Educational Institution
                                </Title>
                                <Paragraph className='text-lg'>
                                    Tabula Rasa is a comprehensive, multi-tenant
                                    school management system designed to
                                    streamline administrative tasks, enhance
                                    communication, and improve overall
                                    efficiency for educational institutions of
                                    all sizes.
                                </Paragraph>
                                
                            </motion.div>
                        </Col>
                        <Col span={24} md={12}>
                            <motion.img
                                variants={fadeInUp}
                                src={studentImage}
                                alt='School Management'
                                className='w-full rounded-lg shadow-lg'
                            />
                        </Col>
                    </Row>

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

                    <motion.div variants={fadeInUp} className='my-16'>
                        <Title level={2} className='mb-8 text-center'>
                            Why Choose Tabula Rasa?
                        </Title>
                        <Row gutter={[32, 32]}>
                            <Col span={24} md={12}>
                                <List
                                    dataSource={[
                                        "Customizable to fit your institution's needs",
                                        'Robust security measures to protect sensitive data',
                                        'Regular updates and new feature releases',
                                        '24/7 customer support',
                                        'Seamless integration with other educational tools'
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <Space>
                                                <CheckCircleOutlined
                                                    style={{ color: '#52c41a' }}
                                                />
                                                <span>{item}</span>
                                            </Space>
                                        </List.Item>
                                    )}
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <img
                                    src={studentImage}
                                    alt='Why Choose Us'
                                    className='w-full rounded-lg shadow-lg'
                                />
                            </Col>
                        </Row>
                    </motion.div>

                    <motion.div variants={fadeInUp} className='my-16'>
                        <Title level={2} className='mb-8 text-center'>
                            Our Impact
                        </Title>
                        <Row gutter={[32, 32]}>
                            {[
                                { title: 'Schools', value: 50, suffix: '+' },
                                { title: 'Students', value: 1000, suffix: '+' },
                                { title: 'Countries', value: 10, suffix: '+' },
                                {
                                    title: 'Satisfaction',
                                    value: 98,
                                    suffix: '%'
                                }
                            ].map((stat, index) => (
                                <Col key={index} xs={12} md={6}>
                                    <Card>
                                        <Statistic
                                            title={stat.title}
                                            value={stat.value}
                                            suffix={stat.suffix}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className='my-16 text-center'
                    >
                        <Title level={2}>
                            Ready to Transform Your Institution?
                        </Title>
                        <Paragraph className='mb-8 text-lg'>
                            Join hundreds of schools already benefiting from
                            Tabula Rasa. Start your journey towards efficient
                            school management today.
                        </Paragraph>
                        
                    </motion.div>
                </motion.div>
            </Content>


      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-6">Ready to transform your school management?</Title>
          <Paragraph className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of educational institutions that have streamlined their operations with our comprehensive school management solution.
          </Paragraph>
          <Link 
            to="/institution-signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 inline-flex items-center"
          >
            Request Institution Callback
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Title level={4} className="text-white mb-4">Tabula Rasa</Title>
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
                Email: support@tabularasa.ng<br />
                Phone: +1 (123) 456-7890
              </Paragraph>
            </div>
          </div>
          <Divider className="border-gray-700" />
          <Paragraph className="text-center text-gray-500 mb-0">
            © {new Date().getFullYear()} TabulaRasa. All rights reserved.
          </Paragraph>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
