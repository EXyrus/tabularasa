import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const GuestShell = ({ children }: { children?: ReactNode }) => {
    return (
        <div className='flex min-h-screen flex-col'>
            <div className='flex flex-grow flex-col'>
                <div className='flex flex-grow flex-col'>
                    {children ?? <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default GuestShell;
