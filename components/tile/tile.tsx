import React from "react";
import { cn } from "@/lib/utils"; // Utility function from shadcn for className merging
import { DynamicFaIcon } from "../icon/dynamic-fa-icon";

interface TileProps {
  icon: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

export const Tile: React.FC<TileProps> = ({
  icon,
  text,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200",
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
