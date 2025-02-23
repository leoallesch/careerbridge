// components/tile/tile-grid.tsx
import React from 'react';
import {cn} from '@/lib/utils';
import {TileProps} from './tile';

interface TileGridProps {
  children: React.ReactElement<TileProps>|React.ReactElement<TileProps>[];
  rows?: number;
  columns?: number;
  className?: string;
}

export const TileGrid: React.FC<TileGridProps>=({
  children,
  rows=1,
  columns=1,
  className,
}) => {
  const gridStyle={
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  return (
    <div
      className={cn('grid gap-4',className)}
      style={gridStyle}
    >
      {children}
    </div>
  );
};