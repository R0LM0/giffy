import React, { useCallback, useRef, useEffect } from 'react';
import Gif from '../Gif';
import './styles.css';

export default function ListOfGifs({ gifs, loadingNextPage, onEndReached }) {
  const observerRef = useRef();
  const isFetchingRef = useRef(false);

  // Resetear el flag cuando cambia loadingNextPage
  useEffect(() => {
    if (!loadingNextPage) {
      isFetchingRef.current = false;
    }
  }, [loadingNextPage]);

  const lastGifRef = useCallback(
    (node) => {
      if (loadingNextPage || isFetchingRef.current) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && onEndReached && !isFetchingRef.current) {
          isFetchingRef.current = true;
          onEndReached();
        }
      }, {
        rootMargin: '100px',
      });

      if (node) observerRef.current.observe(node);
    },
    [loadingNextPage, onEndReached]
  );

  if (!gifs || gifs.length === 0) {
    return (
      <div className="ListOfGifs-empty" role="status" aria-live="polite">
        <span className="ListOfGifs-empty-emoji" aria-hidden="true">
          🔍
        </span>
        <p>No se encontraron GIFs</p>
        <small>Intenta con otra búsqueda</small>
      </div>
    );
  }

  return (
    <>
      <div className="ListOfGifs" role="list" aria-label="Lista de GIFs">
        {gifs.map(({ id, title, url }, index) => {
          const isLast = index === gifs.length - 1;
          return (
            <div
              key={`${id}-${index}`}
              ref={isLast ? lastGifRef : null}
              className="ListOfGifs-item"
              role="listitem"
            >
              <Gif title={title} url={url} id={id} />
            </div>
          );
        })}
      </div>
      {loadingNextPage && (
        <div className="ListOfGifs-loading" role="status" aria-live="polite">
          <div className="ListOfGifs-loading-spinner" />
          <span>Cargando más GIFs...</span>
        </div>
      )}
    </>
  );
}