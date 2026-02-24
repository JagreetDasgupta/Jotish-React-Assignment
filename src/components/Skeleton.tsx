import type React from 'react';

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  variant?: 'rect' | 'text';
  className?: string;
};

export function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = 4,
  variant = 'rect',
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius,
  };

  const classes = ['skeleton', `skeleton-${variant}`, className].filter(Boolean).join(' ');

  return <div className={classes} style={style} />;
}

