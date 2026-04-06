import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import useSingleGif from '../../hooks/useSingleGif';
import Spinner from '../../components/Spinner';
import Toast from '../../components/Toast';
import './styles.css';

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
        message: '¡Enlace copiado al portapapeles!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Error al copiar el enlace',
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
        <span aria-hidden="true">⚠️</span>
        <p>{error}</p>
        <Link to="/" className="Detail-back">← Volver al inicio</Link>
      </div>
    );
  }

  if (!gif) {
    return (
      <div className="Detail-notfound" role="status">
        <span aria-hidden="true">🔍</span>
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

      <Toast
        message={toast.message}
        isVisible={toast.show}
        onClose={closeToast}
        type={toast.type}
      />
    </>
  );
}