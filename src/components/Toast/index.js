import React, { useEffect } from 'react';
import './styles.css';

export default function Toast({ message, isVisible, onClose, type = 'success' }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div className="Toast-overlay" onClick={onClose}>
      <div className={`Toast Toast--${type}`} onClick={(e) => e.stopPropagation()}>
        <span className="Toast-icon">{icons[type]}</span>
        <span className="Toast-message">{message}</span>
        <button className="Toast-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className="Toast-progress">
          <div className="Toast-progress-bar" />
        </div>
      </div>
    </div>
  );
}