import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import {
    BookOutlined,
    BellOutlined,
    WalletOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { useAuth } from 'hooks/useAuth';
import PATHS from 'pages/student/paths.json';
import { getCloudinaryImage } from 'helpers/image';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const OptionButton = ({
        route,
        icon,
        text,
        className = ''
    }: {
        route: string;
        icon: ReactNode;
        text: string;
        className?: string;
    }) => (
        <Button
            type='primary'
            icon={icon}
            className={`flex h-20 w-full flex-col items-center justify-center rounded-lg ${className}`}
            onClick={() => navigate(route)}
            style={{ backgroundColor: '#049294', borderColor: '#049294' }}
        >
            <span className='mt-2 text-white'>{text}</span>
        </Button>
    );

    return (
        <div
            className='mx-auto flex max-h-[800px] min-h-screen w-full max-w-md flex-col items-center px-4 py-8'
            style={{ backgroundColor: '#e6f7f7' }}
        >
            {/* Profile Section */}
            <div className='mb-8 flex flex-col items-center'>
                <div className='mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white sm:h-32 sm:w-32'>
                    <img
                        src={
                            user?.photo
                                ? getCloudinaryImage(user?.photo)
                                : `https://placehold.co/600x400?text=${user?.firstName}+${user?.lastName}`
                        }
                        alt='Student profile'
                        className='h-full w-full object-cover'
                    />
                </div>
                <h1 className='mb-2 text-center text-xl font-bold sm:text-2xl'>
                    {user?.firstName} {user?.lastName}
                </h1>
                <div className='flex flex-wrap justify-center gap-2'>
                    <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                        Primary one
                    </span>
                    <span className='rounded-md bg-teal-200 px-3 py-1 text-sm'>
                        REG: A35388
                    </span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className='m-auto grid w-full grid-cols-2 gap-4'>
                <OptionButton
                    route={PATHS.students.home}
                    icon={<BookOutlined className='text-xl text-white' />}
                    text='All Students'
                />
                <OptionButton
                    route={PATHS.notifications}
                    icon={<BellOutlined className='text-xl text-white' />}
                    text='Event & notification'
                />
                <OptionButton
                    route={PATHS.payment.home}
                    icon={<WalletOutlined className='text-xl text-white' />}
                    text='Payment'
                />
                <OptionButton
                    route={PATHS.account}
                    icon={<HomeOutlined className='text-xl text-white' />}
                    text='My Account'
                />
            </div>
        </div>
    );
};

export default Home;
