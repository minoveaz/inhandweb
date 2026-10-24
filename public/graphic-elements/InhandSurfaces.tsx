import React from 'react';
import './inhand-surfaces.css';

export type GradientVariant = 'blue' | 'coral' | 'sand' | 'mixed' | 'soft';
export type TextureVariant = 'paper' | 'fabric' | 'grain' | 'light';
export type PatternVariant = 'dots' | 'arches' | 'lines' | 'geometric' | 'symbols';

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: GradientVariant;
  texture?: TextureVariant;
  withGrainOverlay?: boolean;
  children?: React.ReactNode;
}

/**
 * Contenedor de superficie INHAND para aplicar Gradientes (05) y Texturas (06)
 * Ejemplo:
 * <InhandSurface gradient="mixed" withGrainOverlay className="p-10 rounded-3xl">
 *   <h2>Small objects. Big meaning.</h2>
 * </InhandSurface>
 */
export const InhandSurface: React.FC<SurfaceProps> = ({
  gradient,
  texture,
  withGrainOverlay = false,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    gradient ? `ih-bg-${gradient === 'soft' ? 'soft' : `${gradient}-gradient`}` : '',
    texture ? `ih-texture-${texture}` : '',
    withGrainOverlay ? 'ih-with-grain' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * 04. Graphic Elements — Divider (Línea azul con punto coral al final)
 */
export const InhandDivider: React.FC<{ width?: number | string; className?: string }> = ({
  width = 120,
  className = '',
}) => (
  <svg
    width={width}
    height="14"
    viewBox="0 0 120 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line
      x1="2"
      y1="7"
      x2="108"
      y2="7"
      stroke="var(--ih-icon-primary, #2638A5)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="113" cy="7" r="4.5" fill="var(--ih-icon-accent, #FC6C21)" />
  </svg>
);

/**
 * 02. Shape Variations — Arch + Dot (Propósito y Foco)
 */
export const InhandArchBadge: React.FC<{ size?: number; outlined?: boolean; className?: string }> = ({
  size = 80,
  outlined = false,
  className = '',
}) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 80 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {outlined ? (
      <path
        d="M 14 82 V 42 A 26 26 0 0 1 66 42 V 82"
        stroke="var(--ih-icon-primary, #2638A5)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    ) : (
      <path d="M 10 86 V 42 A 30 30 0 0 1 70 42 V 86 Z" fill="#EFE2D6" />
    )}
    <circle cx="40" cy="64" r="8" fill="var(--ih-icon-accent, #FC6C21)" />
  </svg>
);

/**
 * 04. Graphic Elements — Glow (Énfasis suave en coral)
 */
export const InhandGlow: React.FC<{ size?: number; className?: string }> = ({
  size = 160,
  className = '',
}) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      borderRadius: '9999px',
      background: 'var(--ih-glow-coral)',
      filter: 'blur(8px)',
      pointerEvents: 'none',
    }}
  />
);
