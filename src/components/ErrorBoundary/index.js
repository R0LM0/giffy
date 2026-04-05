import React, { Component } from 'react';
import './styles.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary" role="alert" aria-live="assertive">
          <div className="ErrorBoundary-content">
            <span className="ErrorBoundary-emoji" aria-hidden="true">
              💥
            </span>
            <h1 className="ErrorBoundary-title">¡Ups! Algo salió mal</h1>
            <p className="ErrorBoundary-message">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="ErrorBoundary-details">
                <summary>Detalles del error (solo desarrollo)</summary>
                <pre className="ErrorBoundary-stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="ErrorBoundary-actions">
              <button
                onClick={this.handleReload}
                className="ErrorBoundary-button ErrorBoundary-button--primary"
              >
                🔄 Recargar página
              </button>
              <button
                onClick={this.handleGoHome}
                className="ErrorBoundary-button ErrorBoundary-button--secondary"
              >
                🏠 Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;