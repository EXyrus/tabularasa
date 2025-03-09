
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import config from '@/config';
import type { AppType } from '@/types/app-type';

type ProtectedRouteProps = {
  children: React.ReactNode;
  appType: AppType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, appType }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Skip auth checks if auth is disabled in config
  if (!config.AUTH_ENABLED) {
    return <>{children}</>;
  }

  if (loading) {
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
  if (user.appType !== appType) {
    // Redirect to the appropriate app type
    return <Navigate to={`/${user.appType}/dashboard`} replace />;
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
  
  // Skip auth checks if auth is disabled in config
  if (!config.AUTH_ENABLED) {
    return <>{children}</>;
  }

  // If restricted is true and user is logged in, redirect to dashboard
  if (restricted && user && user.appType === appType) {
    return <Navigate to={`/${appType}/dashboard`} replace />;
  }

  return <>{children}</>;
};
