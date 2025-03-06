import React from 'react';
import { Select, Button, Calendar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import academic from 'assets/img/academic.svg';

const StudentAttendance = () => {
    return (
        <div className='mx-auto max-w-md px-4 py-6'>
            <h1 className='mb-6 text-2xl font-bold'>Attendance Details</h1>

            {/* Dropdowns */}
            <div className='mb-6 grid grid-cols-2 gap-4'>
                <div>
                    <label className='mb-2 block text-sm'>Academic Year</label>
                    <Select
                        defaultValue='2022/2023'
                        className='bg-gray-50 w-full'
                        popupClassName='rounded-lg'
                    >
                        <Select.Option value='2022/2023'>
                            2022/2023
                        </Select.Option>
                    </Select>
                </div>
                <div>
                    <label className='mb-2 block text-sm'>Term</label>
                    <Select
                        defaultValue='First term'
                        className='bg-gray-50 w-full'
                        popupClassName='rounded-lg'
                    >
                        <Select.Option value='First term'>
                            First term
                        </Select.Option>
                    </Select>
                </div>
            </div>

            {/* Student Info */}
            <div className='mb-8'>
                <h2 className='mb-2 text-xl font-semibold'>Juli B. Martin</h2>
                <div className='flex gap-2'>
                    <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                        Primary one
                    </span>
                    <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                        REG: A35388
                    </span>
                </div>
            </div>

            {/* Attendance Circle */}
            <div className='mb-8 flex justify-center'>
                <div className='relative h-48 w-48'>
                    <svg className='h-full w-full' viewBox='0 0 100 100'>
                        <circle
                            className='text-gray-100'
                            strokeWidth='10'
                            stroke='currentColor'
                            fill='transparent'
                            r='45'
                            cx='50'
                            cy='50'
                        />
                        <circle
                            className='text-teal-400'
                            strokeWidth='10'
                            strokeDasharray={`${80 * 2.83} ${283}`}
                            strokeLinecap='round'
                            stroke='currentColor'
                            fill='transparent'
                            r='45'
                            cx='50'
                            cy='50'
                        />
                    </svg>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span className='text-4xl font-bold'>80%</span>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className='mb-8 grid grid-cols-2 gap-4'>
                <div className='rounded-lg bg-green p-4'>
                    <img
                        alt='Academic'
                        className='bg-greenDark mb-2 h-12 w-12'
                        src={academic}
                    />
                    <div className='mb-1 text-3xl font-bold'>2564</div>
                    <div className='text-sm text-teal-600'>
                        Active School day
                    </div>
                </div>
                <div className='rounded-lg bg-danger p-4'>
                    <img
                        alt='Academic'
                        className='mb-2 h-12 w-12 bg-danger'
                        src={academic}
                    />
                    <div className='mb-1 text-3xl font-bold'>2353</div>
                    <div className='text-red-400 text-sm'>Days Missed</div>
                </div>
            </div>

            {/* Calendar */}
            <div className='mb-8'>
                <Calendar />
            </div>

            {/* View Details Button */}
            <Button
                type='default'
                icon={<EyeOutlined />}
                className='w-full border-none bg-teal-100 text-teal-600 hover:bg-teal-200'
            >
                View Attendance Details
            </Button>
        </div>
    );
};

export default StudentAttendance;
