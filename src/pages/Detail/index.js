import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import useSingleGif from '../../hooks/useSingleGif';
import Spinner from '../../components/Spinner';
import Toast from '../../components/Toast';
import './styles.css';

const icons = {
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
};

export default function Detail({ params }) {
  const { id } = params;
  const { gif, loading, error } = useSingleGif({ id });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (gif?.title) {
      document.title = `${gif.title} | Giffy`;
    }
    return () => {
      document.title = 'Giffy';
    };
  }, [gif]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast({
        show: true,
        message: 'Enlace copiado al portapapeles',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'No se pudo copiar el enlace',
        type: 'error'
      });
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

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
        <svg className="Detail-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>{error}</p>
        <Link to="/" className="Detail-back">← Volver al inicio</Link>
      </div>
    );
  }

  if (!gif) {
    return (
      <div className="Detail-notfound" role="status">
        <svg className="Detail-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p>GIF no encontrado</p>
        <Link to="/" className="Detail-back">← Volver al inicio</Link>
      </div>
    );
  }

  const { title, url } = gif;

  return (
    <>
      <article className="Detail" aria-label={`Detalle de ${title}`}>
        <div className="Detail-content">
          <figure className="Detail-figure">
            <img
              src={url}
              alt={title || 'GIF sin título'}
              className="Detail-image"
              loading="eager"
              width="600"
              height="600"
              style={{ aspectRatio: '1/1' }}
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
              <span className="Detail-button-icon">{icons.link}</span>
              Ver Original
            </a>
            <button
              onClick={handleShare}
              className="Detail-button Detail-button--secondary"
              aria-label="Copiar enlace"
            >
              <span className="Detail-button-icon">{icons.share}</span>
              Compartir
            </button>
          </div>
        </div>
      </article>

      <Toast
        message={toast.message}
        isVisible={toast.show}
        onClose={closeToast}
        type={toast.type}
      />
    </>
  );
}