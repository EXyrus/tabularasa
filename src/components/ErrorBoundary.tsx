
import React, { ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { useToast } from '@/hooks/use-toast';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // In a real app, you would send this to your error reporting service
    if (process.env.NODE_ENV !== 'development') {
      // Report error to your error tracking service here
      console.log("Reporting error to tracking service:", error);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === 'development';
      
      if (isDev) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-50">
            <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md border border-red-200">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Development Error</h1>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm mb-4">
                {this.state.error?.stack || this.state.error?.message || 'Unknown error'}
              </pre>
              <Button 
                type="primary" 
                danger 
                onClick={() => window.location.href = '/'}
              >
                Return to Home
              </Button>
            </div>
          </div>
        );
      }
      
      return (
        <Result
          status="error"
          title="Oops! Something went wrong"
          subTitle="We apologize for the inconvenience. Our team has been notified and is working to fix the issue."
          extra={[
            <Button 
              type="primary" 
              key="home" 
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks with class component
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { toast } = useToast();
  
  const handleError = (error: Error) => {
    toast({
      title: "An error occurred",
      description: "The application encountered an unexpected error",
      variant: "destructive",
    });
  };
  
  return <ErrorBoundaryClass children={children} />;
};

export default ErrorBoundary;
