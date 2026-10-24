import React, { useState } from 'react';

export const Avatar: React.FC<{
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ src, name, size = 'md' }) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  const sizeClass = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size];

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        onError={() => setImgError(true)}
        className={`${sizeClass} rounded-pill object-cover border border-ih-border`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name || 'Usuario'}
      className={`${sizeClass} rounded-pill bg-ih-sand text-ih-cobalt font-bold inline-flex items-center justify-center border border-ih-border select-none`}
    >
      {initials || 'IH'}
    </span>
  );
};
