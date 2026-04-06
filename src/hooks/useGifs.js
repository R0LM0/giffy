import { useCallback, useContext, useEffect, useState } from 'react';
import getGifs, { getTrendingGifs } from '../services/Giffys/getGits';
import GifsContext from '../context/GifsContext';

const INITIAL_PAGE = 0;

export function useGifs({ keyword, trending = false } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [error, setError] = useState(null);
  const { gifs, setGifs } = useContext(GifsContext);

  // Determinar qué keyword usar
  const keywordToUse =
    keyword || localStorage.getItem('lastKeyword') || 'random';

  // Cargar GIFs iniciales - solo cuando cambia keyword o trending
  useEffect(() => {
    // Resetear gifs cuando cambia la búsqueda
    setGifs([]);
    setPage(INITIAL_PAGE);
    setLoading(true);
    setError(null);

    const fetchGifs = trending
      ? getTrendingGifs({ limit: 10 })
      : getGifs({ keyword: keywordToUse, limit: 10 });

    fetchGifs
      .then((gifs) => {
        setGifs(gifs);
        setLoading(false);
        if (keyword) {
          localStorage.setItem('lastKeyword', keyword);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, trending]);

  // Cargar más GIFs (paginación infinita) - solo cuando cambia page
  useEffect(() => {
    if (page === INITIAL_PAGE) return;

    setLoadingNextPage(true);

    const fetchMoreGifs = trending
      ? getTrendingGifs({ page, limit: 10 })
      : getGifs({ keyword: keywordToUse, page, limit: 10 });

    fetchMoreGifs
      .then((nextGifs) => {
        setGifs((prevGifs) => prevGifs.concat(nextGifs));
        setLoadingNextPage(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingNextPage(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleNextPage = useCallback(() => {
    if (loadingNextPage) return; // Evitar múltiples llamadas
    setPage((prevPage) => prevPage + 1);
  }, [loadingNextPage]);

  return {
    loading,
    loadingNextPage,
    gifs,
    error,
    setPage,
    handleNextPage,
  };
}