import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getTrendingGifs } from '../../services/Giffys/getGits';
import './styles.css';

export default function TrendingSearches() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingGifs({ limit: 5 })
      .then((gifs) => {
        // Extraer términos únicos de los trending gifs
        const uniqueTerms = [...new Set(gifs.map((gif) => gif.title.split(' ')[0]))];
        setTrends(uniqueTerms.filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        // Fallback a términos por defecto
        setTrends(['React', 'JavaScript', 'Coding', 'Funny', 'Cat']);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="TrendingSearches-loading">Cargando trending...</div>;

  return (
    <div className="TrendingSearches">
      <h4 className="TrendingSearches-title">🔥 Trending Ahora</h4>
      <div className="TrendingSearches-tags">
        {trends.map((term) => (
          <Link key={term} to={`/search/${term}`} className="TrendingSearches-tag">
            {term}
          </Link>
        ))}
      </div>
    </div>
  );
}