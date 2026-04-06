import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import './styles.css';

export default function SearchHeader({ showBack = false }) {
  const [keyword, setKeyword] = useState('');
  const [, pushLocation] = useLocation();
  

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!keyword.trim()) return;
    pushLocation(`/search/${encodeURIComponent(keyword.trim())}`);
    setKeyword('');
  };

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  return (
    <header className="SearchHeader">
      <div className="SearchHeader-container">
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className="SearchHeader-back"
            aria-label="Volver atrás"
            title="Volver"
          >
            ←
          </button>
        )}
        
        <Link to="/" className="SearchHeader-logo" aria-label="Ir al inicio">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="Giffy"
            width="40"
            height="40"
          />
          <span className="SearchHeader-brand">Giffy</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="SearchHeader-form"
          role="search"
        >
          <input
            type="search"
            placeholder="Buscar GIFs..."
            value={keyword}
            onChange={handleChange}
            aria-label="Buscar GIFs"
            className="SearchHeader-input"
          />
          <button
            type="submit"
            className="SearchHeader-button"
            disabled={!keyword.trim()}
            aria-label="Buscar"
          >
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}