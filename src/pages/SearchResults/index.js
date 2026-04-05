import React, { useEffect } from 'react';
import ListOfGifs from '../../components/ListOfGifs';
import Spinner from '../../components/Spinner';
import { useGifs } from '../../hooks/useGifs';
import './styles.css';

export default function SearchResults({ params }) {
  const { keyword } = params;
  const decodedKeyword = decodeURIComponent(keyword);
  const { loading, gifs, error, handleNextPage, loadingNextPage } = useGifs({
    keyword: decodedKeyword,
  });

  // Actualizar el título de la página
  useEffect(() => {
    document.title = `${decodedKeyword} | Giffy Search`;
    return () => {
      document.title = 'Giffy';
    };
  }, [decodedKeyword]);

  if (error) {
    return (
      <div className="SearchResults-error" role="alert">
        <span aria-hidden="true">⚠️</span>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <section className="SearchResults" aria-label={`Resultados para ${decodedKeyword}`}>
      <header className="SearchResults-header">
        <h1 className="SearchResults-title">
          <span role="img" aria-label="Buscar">
            🔍
          </span>{' '}
          Resultados para: <span className="SearchResults-keyword">"{decodedKeyword}"</span>
        </h1>
        {gifs.length > 0 && (
          <p className="SearchResults-count" role="status">
            {gifs.length} GIF{gifs.length !== 1 ? 's' : ''} encontrado
            {gifs.length !== 1 ? 's' : ''}
          </p>
        )}
      </header>

      {loading ? (
        <Spinner />
      ) : (
        <ListOfGifs
          gifs={gifs}
          loadingNextPage={loadingNextPage}
          onEndReached={handleNextPage}
        />
      )}
    </section>
  );
}