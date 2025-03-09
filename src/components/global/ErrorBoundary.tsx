
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Location } from 'react-router-dom';

interface Props {
  children?: ReactNode;
  location: Location;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props): void {
    // If the route changes, clear the error state
    if (this.state.hasError && this.props.location !== prevProps.location) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="mb-4 text-gray-600">We've encountered an error and our team has been notified.</p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-w-full">
            {this.state.error?.message}
          </pre>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
