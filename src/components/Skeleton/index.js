import React from 'react';
import './styles.css';

export function GifSkeleton() {
  return (
    <div className="GifSkeleton">
      <div className="GifSkeleton-image" />
      <div className="GifSkeleton-title" />
    </div>
  );
}

export function SkeletonList({ count = 10 }) {
  return (
    <div className="SkeletonList">
      {Array.from({ length: count }).map((_, i) => (
        <GifSkeleton key={i} />
      ))}
    </div>
  );
}

export default SkeletonList;