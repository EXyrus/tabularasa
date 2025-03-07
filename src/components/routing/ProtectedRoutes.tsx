
import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type Props = {
    children?: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const { user, isLoggingIn } = useAuth();

    if (isLoggingIn) {
        return <Spin fullscreen />;
    }

    // Handle guest/public routes
    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
