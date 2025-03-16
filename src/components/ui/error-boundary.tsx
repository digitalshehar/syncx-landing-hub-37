
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-slate-800 to-black rounded-lg p-8 text-center">
          <div className="space-y-4">
            <p className="text-lg text-slate-300">
              Oops! We couldn't load the 3D experience.
            </p>
            <div className="text-sm text-slate-400">
              Our futuristic visuals are taking a break. Please check back soon.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
