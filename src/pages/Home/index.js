import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import ListOfGifs from '../../components/ListOfGifs';
import { SkeletonList } from '../../components/Skeleton';
import LazyTrending from '../../components/LazyTrending';
import { useGifs } from '../../hooks/useGifs';
import './styles.css';

const POPULAR_GIFS = ['Panda', 'Rick', 'Matrix', 'Programming', 'Dance'];

export default function Home() {
  const [, pushLocation] = useLocation();
  const { loading, gifs, error, handleNextPage, loadingNextPage } = useGifs({
    trending: true,
  });

  if (error) {
    const isRateLimit = error.includes('429');
    return (
      <div className="Home-error" role="alert">
        <span aria-hidden="true">⚠️</span>
        <p>
          {isRateLimit
            ? 'Has excedido el límite de peticiones. Espera unos minutos e intenta de nuevo.'
            : error}
        </p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <LazyTrending />

      <h2 className="Home-title">🔥 Trending GIFs</h2>

      {loading && gifs.length === 0 ? (
        <SkeletonList count={10} />
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
        <ul className="Home-popular-list">
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