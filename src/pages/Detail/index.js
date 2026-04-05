import React, { useEffect } from 'react';
import { Link } from 'wouter';
import useSingleGif from '../../hooks/useSingleGif';
import Spinner from '../../components/Spinner';
import './styles.css';

export default function Detail({ params }) {
  const { id } = params;
  const { gif, loading, error } = useSingleGif({ id });

  // Actualizar el título de la página
  useEffect(() => {
    if (gif?.title) {
      document.title = `${gif.title} | Giffy`;
    }
    return () => {
      document.title = 'Giffy';
    };
  }, [gif]);

  if (loading) {
    return (
      <div className="Detail-loading">
        <Spinner />
        <p>Cargando GIF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Detail-error" role="alert">
        <span aria-hidden="true">⚠️</span>
        <p>{error}</p>
        <Link to="/" className="Detail-back">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  if (!gif) {
    return (
      <div className="Detail-notfound" role="status">
        <span aria-hidden="true">🔍</span>
        <p>GIF no encontrado</p>
        <Link to="/" className="Detail-back">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  const { title, url } = gif;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <article className="Detail" aria-label={`Detalle de ${title}`}>
      <Link to="/" className="Detail-back-link" aria-label="Volver al inicio">
        ← Volver
      </Link>

      <div className="Detail-content">
        <figure className="Detail-figure">
          <img
            src={url}
            alt={title || 'GIF sin título'}
            className="Detail-image"
            loading="eager"
          />
          <figcaption className="Detail-caption">
            <h1 className="Detail-title">{title || 'Sin título'}</h1>
          </figcaption>
        </figure>

        <div className="Detail-actions">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="Detail-button Detail-button--primary"
            aria-label="Ver GIF original"
          >
            🔗 Ver Original
          </a>
          <button
            onClick={handleShare}
            className="Detail-button Detail-button--secondary"
            aria-label="Copiar enlace"
          >
            📋 Compartir
          </button>
        </div>
      </div>
    </article>
  );
}