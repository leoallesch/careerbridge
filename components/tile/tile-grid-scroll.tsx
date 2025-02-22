import React from 'react';
import {cn} from '@/lib/utils';

interface TileScrollProps {
  children: React.ReactNode;
  className?: string; // Use className for all Tailwind styling
}

export const TileScroll: React.FC<TileScrollProps>=({
  children,
  className,
}) => {
  return (
    <div className={cn('relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100',className)}>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};