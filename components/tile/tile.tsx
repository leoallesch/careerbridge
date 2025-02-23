// components/Tile.tsx
import React from "react";
import {cn} from "@/lib/utils";
import {DynamicFaIcon} from "../icon/dynamic-fa-icon";

export interface TileProps {
  icon: string;
  text: string;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Tile: React.FC<TileProps>=({
  icon,
  text,
  className,
  onClick,
  isSelected=false,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200",
        isSelected&&"scale-105 bg-accent border-2 border-primary shadow-[0_4px_12px_primary]",
        className
      )}
      onClick={onClick}
    >
      <DynamicFaIcon name={icon} size={32} className="mb-3" />
      <span className="text-sm font-medium text-gray-700 text-center">
        {text}
      </span>
    </div>
  );
};