
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md">
            <Alert variant="destructive" className="mb-6">
              <AlertTitle className="text-xl font-semibold mb-2">Something went wrong</AlertTitle>
              <AlertDescription className="text-sm">
                <div className="my-2 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-auto max-h-40">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </div>
                <div className="mt-4">
                  <Button 
                    onClick={this.handleReset}
                    variant="outline"
                    className="mr-2"
                  >
                    Try again
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                  >
                    Go to home page
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
