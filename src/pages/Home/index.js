import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import ListOfGifs from '../../components/ListOfGifs';
import Spinner from '../../components/Spinner';
import LazyTrending from '../../components/LazyTrending';
import { useGifs } from '../../hooks/useGifs';
import './styles.css';

const POPULAR_GIFS = ['Panda', 'Rick', 'Matrix', 'Programming', 'Dance'];

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [, pushLocation] = useLocation();
  const { loading, gifs, error, handleNextPage, loadingNextPage } = useGifs({
    trending: true,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!keyword.trim()) return;
    pushLocation(`/search/${encodeURIComponent(keyword.trim())}`);
  };

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  if (error) {
    return (
      <div className="Home-error" role="alert">
        <span aria-hidden="true">⚠️</span>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="Home-search"
        role="search"
        aria-label="Buscar GIFs"
      >
        <div className="Home-search-input-wrapper">
          <label htmlFor="search-input" className="visually-hidden">
            Buscar GIFs
          </label>
          <input
            id="search-input"
            type="search"
            placeholder="Busca GIFs increíbles..."
            onChange={handleChange}
            value={keyword}
            aria-label="Término de búsqueda"
            autoComplete="off"
          />
          <button
            type="submit"
            aria-label="Buscar"
            disabled={!keyword.trim()}
            className="Home-search-button"
          >
            🔍 Buscar
          </button>
        </div>
      </form>

      <LazyTrending />

      <h2 className="Home-title">🔥 Trending GIFs</h2>

      {loading ? (
        <Spinner />
      ) : (
        <ListOfGifs
          gifs={gifs}
          loadingNextPage={loadingNextPage}
          onEndReached={handleNextPage}
        />
      )}

      <section className="Home-popular" aria-labelledby="popular-title">
        <h3 id="popular-title" className="Home-popular-title">
          💫 Búsquedas Populares
        </h3>
        <ul className="Home-popular-list" >
          {POPULAR_GIFS.map((popularGif) => (
            <li key={popularGif} className="Home-popular-item">
              <Link
                to={`/search/${popularGif}`}
                className="Home-popular-link"
                aria-label={`Ver GIFs de ${popularGif}`}
              >
                <span className="Home-popular-icon" aria-hidden="true">
                  🎯
                </span>
                {popularGif}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}