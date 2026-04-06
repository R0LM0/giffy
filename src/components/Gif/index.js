import React from 'react';
import { Link } from 'wouter';
import './Gif.css';

export default function Gif({ title, url, id }) {
  return (
    <div className="Gif">
      <Link to={`/gif/${id}`} className="Gif-link">
        <h4>{title || 'GIF'}</h4>
        <img 
          loading="lazy" 
          src={url} 
          alt={title || 'GIF sin título'}
          width="300"
          height="300"
          style={{ aspectRatio: '1/1' }}
        />
      </Link>
    </div>
  );
}