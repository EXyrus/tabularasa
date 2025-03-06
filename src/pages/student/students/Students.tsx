import { useState } from 'react';
import { Input, Card, Spin } from 'antd';
import { useNavigate, generatePath } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { getCloudinaryImage } from 'helpers/image';
import { useGuardianStudents } from 'queries/use-guardian';
import type { Student } from 'types';
import PATHS from 'pages/student/paths.json';

const Students = () => {
    const navigate = useNavigate();
    const { data: students, isLoading } = useGuardianStudents();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <Spin fullscreen />;

    // Filter students based on search term
    const filteredStudents = students?.filter(student =>
        `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const onStudentClick = (student: Student) => {
        const path = generatePath(PATHS.students.studentProfile, {
            id: student.id
        });

        navigate(path);
    };

    return (
        <div
            className='flex min-h-screen flex-col'
            style={{ backgroundColor: '#e6f7f7' }}
        >
            {/* Header */}
            <div className='p-4'>
                <h2 className='mb-4 text-2xl font-bold text-gray-800'>
                    Students
                </h2>

                {/* Search Bar */}
                <div className='relative mb-6'>
                    <Input
                        placeholder='Search Students'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='rounded-full bg-white px-4 py-2'
                        suffix={<SearchOutlined className='text-gray-400' />}
                    />
                </div>

                {/* Student Cards */}
                <div className='space-y-4'>
                    {filteredStudents?.map(student => (
                        <Card
                            key={student.id}
                            className='cursor-pointer rounded-xl shadow-sm transition-transform hover:scale-[1.01]'
                            onClick={() => onStudentClick(student)}
                            bodyStyle={{ padding: '1.5rem' }}
                        >
                            <div className='flex flex-col items-center'>
                                <div className='mb-3 h-24 w-24 overflow-hidden rounded-full'>
                                    <img
                                        src={
                                            student?.photo
                                                ? getCloudinaryImage(
                                                      student?.photo
                                                  )
                                                : `https://placehold.co/600x400?text=${student?.firstName}+${student?.lastName}`
                                        }
                                        alt={`${student.firstName} ${student.lastName}`}
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                                <h3 className='mb-2 text-xl font-bold'>{`${student.firstName} ${student.lastName}`}</h3>
                                <div className='flex space-x-2'>
                                    <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                                        {student.level}
                                    </span>
                                    <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                                        REG: {student.id}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Students;
