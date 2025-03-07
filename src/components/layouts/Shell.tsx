import { Spin } from 'antd';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import type { Location } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from 'components/global/ErrorBoundary';
import ReloadPrompt from 'components/ReloadPrompt';
import type { LocationState } from 'types';

type Props = {
    children?: ReactNode;
};

const Shell = ({ children }: Props) => {
    const location: Location<LocationState> = useLocation();

    return (
        <ErrorBoundary location={location}>
            <Suspense fallback={<Spin fullscreen />}>
                {children ?? <Outlet />}
            </Suspense>
            <ReloadPrompt />
        </ErrorBoundary>
    );
};

export default Shell;
