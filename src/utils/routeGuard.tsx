
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import config from '@/config';
import { getAppType } from '@/helpers/local-storage';
import type { AppType } from '@/types';

type ProtectedRouteProps = {
  children: React.ReactNode;
  appType: AppType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, appType }) => {
  const { user, isLoggingIn } = useAuth();
  const location = useLocation();
  const storedAppType = getAppType();
  
  // Skip auth checks if auth is disabled in config
  if (!config.AUTH_ENABLED) {
    return <>{children}</>;
  }

  if (isLoggingIn) {
    // You could show a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sms-blue"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to={`/${appType}/login`} state={{ from: location }} replace />;
  }

  // Check if the user is authorized for this app type
  if (storedAppType !== appType) {
    // Redirect to the appropriate app type
    return <Navigate to={`/${storedAppType}/dashboard`} replace />;
  }

  return <>{children}</>;
};

interface PublicRouteProps {
  children: React.ReactNode;
  appType: AppType;
  restricted?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children, appType, restricted = false }) => {
  const { user } = useAuth();
  const storedAppType = getAppType();
  
  // Skip auth checks if auth is disabled in config
  if (!config.AUTH_ENABLED) {
    return <>{children}</>;
  }

  if (restricted && user && storedAppType === appType) {
    return <Navigate to={`/${appType}/dashboard`} replace />;
  }

  return <>{children}</>;
};
