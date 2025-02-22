import React from 'react';
import {cn} from '@/lib/utils'; // Utility function from shadcn for className merging

interface TileProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export const Tile: React.FC<TileProps>=({icon,text,className}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-700 text-center">
        {text}
      </span>
    </div>
  );
};