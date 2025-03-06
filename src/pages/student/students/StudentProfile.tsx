import { useParams, useNavigate, generatePath } from 'react-router-dom';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useGuardianStudent } from 'queries/use-guardian';
import { getCloudinaryImage } from 'helpers/image';
import PATHS from 'pages/student/paths.json';

const StudentProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: student } = useGuardianStudent(id ?? '');

    const onAttendanceClick = () => {
        if (student) {
            const path = generatePath(PATHS.students.studentAttendance, {
                id: student.id
            });

            navigate(path);
        }
    };

    if (!student) {
        return <div>Student not found</div>;
    }

    return (
        <div className='mx-auto min-h-screen max-w-3xl bg-white'>
            {/* Top Navigation */}

            {/* Main Content */}
            <div className='px-6 py-4'>
                <h2 className='mb-6 text-xl font-semibold'>
                    Student information
                </h2>

                {/* Profile Section */}
                <div className='mb-6 flex flex-col items-center'>
                    <div className='mb-4 h-32 w-32 overflow-hidden rounded-full'>
                        <img
                            src={
                                student?.photo
                                    ? getCloudinaryImage(student?.photo)
                                    : `https://placehold.co/600x400?text=${student?.firstName}+${student?.lastName}`
                            }
                            alt={`${student.firstName} ${student.lastName}`}
                            className='h-full w-full object-cover'
                        />
                    </div>
                    <h1 className='mb-3 text-2xl font-bold'>
                        {student.firstName} {student.lastName}
                    </h1>

                    {/* Tags */}
                    <div className='mb-4 flex flex-wrap gap-2'>
                        <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                            Level: {student.level}
                        </span>
                        <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                            Unit: {student.unit}
                        </span>
                        <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                            REG: {student.registrationNumber}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className='mb-8 flex gap-3'>
                        <Button
                            icon={<EyeOutlined />}
                            onClick={onAttendanceClick}
                            className='flex items-center border-none bg-teal-200'
                        >
                            Attendance
                        </Button>
                    </div>

                    {/* Registration Date */}
                    <div className='mt-8 w-full'>
                        <h3 className='mb-2 text-gray-500'>Registered</h3>
                        <p>16 March, 2023</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
