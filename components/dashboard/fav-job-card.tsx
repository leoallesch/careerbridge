// FavoriteableJobCard.tsx
import {Card,CardContent} from "@/components/ui/card";
import {PiHeartFill,PiHeart} from "react-icons/pi"; // Import filled and outline heart icons
import {Job} from "@/lib/types"; // Import your Job type

interface FavoriteableJobCardProps {
  job: Job;
  isFavorite: boolean;
  onFavorite: (title: string) => void;
  isSelected?: boolean; // Optional prop for selection state
  onClick?: (title: string) => void; // Optional prop for click handling
}

const FavoriteableJobCard: React.FC<FavoriteableJobCardProps>=({
  job,
  isFavorite,
  onFavorite,
  isSelected=false, // Default to false if not provided
  onClick,
}) => {
  return (
    <Card
      className={`cursor-pointer hover:bg-accent transition-colors relative ${isSelected
          ? "bg-accent border-2 border-primary" // Style when selected
          :isFavorite
            ? "bg-accent border-2 border-red-500" // Style when favorited but not selected
            :""
        }`}
      onClick={() => onClick?.(job.title)} // Trigger selection when card is clicked
    >
      <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
        <span className="text-lg font-semibold">{job.title}</span>
        <span className="text-sm text-muted-foreground">{job.company}</span>
      </CardContent>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from triggering when favoriting
          onFavorite(job.title);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        {isFavorite? (
          <PiHeartFill className="h-6 w-6 text-red-500" /> // Filled heart if favorited
        ):(
          <PiHeart className="h-6 w-6" /> // Outline heart if not favorited
        )}
      </button>
    </Card>
  );
};

export default FavoriteableJobCard;