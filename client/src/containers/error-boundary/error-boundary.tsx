import React, { ErrorInfo, Component, ReactNode } from 'react';
import { TNullable } from '../../types/types';

interface IErrorState {
    error: TNullable<Error>;
    errorInfo: TNullable<ErrorInfo>;
}

interface IErrorProps {
  children: ReactNode;
  error?: TNullable<Error>;
  errorInfo?: TNullable<ErrorInfo>;
}

export class ErrorBoundary extends Component<IErrorProps, IErrorState> {
    constructor(props: IErrorProps) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }

    public componentDidCatch(error: TNullable<Error>, errorInfo: TNullable<ErrorInfo>): void {
      this.setState({ error, errorInfo });
    }

    public render(): JSX.Element | ReactNode {
      if (this.state.errorInfo) {
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      return this.props.children;
    }
  }