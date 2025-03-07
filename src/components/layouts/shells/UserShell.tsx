import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import type { ReactNode } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

type Props = {
    children?: ReactNode;
    primaryPath?: string;
    buttonLabel?: string;
};

const UserShell = ({
    children,
    primaryPath = '/',
    buttonLabel = 'Account'
}: Props) => {
    const { user, isLoggingIn } = useAuth();
    const navigate = useNavigate();

    const onNavigation = (path: string) => {
        navigate(path);
    };

    const onNavigateBack = () => {
        navigate(-1);
    };

    if (isLoggingIn) {
        return <Spin fullscreen />;
    }

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className='flex min-h-screen flex-col'>
            <div className='flex flex-grow flex-col'>
                <div className='flex flex-grow flex-col'>
                    {children ?? <Outlet />}
                </div>
            </div>
            <footer className='sticky bottom-0 z-10 bg-white p-4 text-black shadow-2xl'>
                <nav className='flex items-center justify-between'>
                    <button
                        onClick={() => onNavigation('/')}
                        className='flex items-center rounded-md border p-2'
                    >
                        <HomeOutlined />
                        <span className='mx-2'>Home</span>
                    </button>
                    <button
                        onClick={() => {
                            onNavigation(primaryPath);
                        }}
                        className='flex items-center rounded-md border p-2'
                    >
                        <UserOutlined />
                        <span className='mx-2'>{buttonLabel}</span>
                    </button>
                    <button
                        onClick={() => onNavigateBack()}
                        className='flex items-center rounded-md border p-2'
                    >
                        <LogoutOutlined />
                        <span className='mx-2'>Back</span>
                    </button>
                </nav>
            </footer>
        </div>
    );
};

export default UserShell;
