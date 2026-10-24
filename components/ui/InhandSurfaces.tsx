import React from 'react';

export type GradientVariant = 'blue' | 'coral' | 'sand' | 'mixed' | 'soft';
export type TextureVariant = 'paper' | 'fabric' | 'grain' | 'light';
export type PatternVariant = 'dots' | 'arches' | 'lines' | 'geometric' | 'symbols';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
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
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    >
      <div
        className="h-[2px] bg-ih-blue rounded-full"
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
      />
      <div className="w-2 h-2 rounded-full bg-ih-coral shrink-0" />
    </div>
  );
};

/**
 * 04. Graphic Elements — Glow Accent
 */
export const InhandGlow: React.FC<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ size = 280, className = '', style = {} }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ih-glow-coral -z-10 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: 'blur(32px)',
        ...style,
      }}
    />
  );
};
