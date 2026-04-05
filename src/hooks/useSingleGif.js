import { useEffect, useState } from 'react';
import { getSingleGif } from '../services/Giffys/getGits';

export default function useSingleGif({ id }) {
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Intentar recuperar del localStorage primero
    const cachedGifs = localStorage.getItem('lastGifs');
    if (cachedGifs) {
      const gifs = JSON.parse(cachedGifs);
      const cachedGif = gifs.find((g) => g.id === id);
      if (cachedGif) {
        setGif(cachedGif);
        setLoading(false);
        return;
      }
    }

    // Si no está en caché, hacer fetch
    getSingleGif({ id })
      .then((gif) => {
        setGif(gif);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { gif, loading, error };
}