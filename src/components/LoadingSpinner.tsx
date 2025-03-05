
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sms-blue"></div>
    </div>
  );
};

export default LoadingSpinner;
