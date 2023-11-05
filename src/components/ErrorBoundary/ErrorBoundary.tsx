import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps } from './ErrorBoundary.props';
import { ErrorBoundaryState } from './ErrorBoundary.state';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
