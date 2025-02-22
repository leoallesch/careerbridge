import React from "react";
import * as Icons from "react-icons/fa";

// Create a type for all possible icon names from react-icons/fa
type IconName = keyof typeof Icons;

// Props interface with typed name prop
interface DynamicFaIconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
}

/* Your icon name from database data can now be passed as prop */
export const DynamicFaIcon: React.FC<DynamicFaIconProps> = ({
  name,
  size,
  className,
}) => {
  const IconComponent = Icons[name as IconName];

  if (!IconComponent) {
    // Return a default one
    return <Icons.FaExclamationTriangle size={size} className={className} />; // Changed to a more specific warning icon
  }

  return <IconComponent size={size} className={className} />;
};
