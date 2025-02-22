"use client";

import React, { useState } from "react";
import { PiBowlFoodFill, PiPlantFill, PiWrench, PiCode, PiPaintBrush, PiMusicNote, PiPencil, PiFlower, PiFish, PiSkull, PiHammer, PiStudent, PiUsers, PiShieldCheck, PiCookingPot, PiTreePalm, PiHeart, PiShoppingCart, PiBriefcase, PiBuildings, PiWrenchFill, PiFactory, PiMapTrifold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const interestsSelect = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interestsList = [
    { name: "Caregiving", icon: <PiHeart size={32} /> },
    { name: "Health support", icon: <PiHeart size={32} /> },
    { name: "Working with people", icon: <PiUsers size={32} /> },
    { name: "Compassion", icon: <PiHeart size={32} /> },
    { name: "Wellness", icon: <PiHeart size={32} /> },
    { name: "Patient care", icon: <PiHeart size={32} /> },
    { name: "Teamwork", icon: <PiUsers size={32} /> },
    { name: "Empathy", icon: <PiHeart size={32} /> },
    { name: "Daily living", icon: <PiHeart size={32} /> },
    { name: "Physical therapy", icon: <PiHeart size={32} /> },
    { name: "Community", icon: <PiUsers size={32} /> },
    { name: "Support systems", icon: <PiUsers size={32} /> },
    { name: "Nutrition", icon: <PiBowlFoodFill size={32} /> },
    { name: "Safety", icon: <PiShieldCheck size={32} /> },
    { name: "Public safety", icon: <PiShieldCheck size={32} /> },
    { name: "Security", icon: <PiShieldCheck size={32} /> },
    { name: "Justice", icon: <PiShieldCheck size={32} /> },
    { name: "Heroism", icon: <PiShieldCheck size={32} /> },
    { name: "Law enforcement", icon: <PiShieldCheck size={32} /> },
    { name: "Emergency response", icon: <PiShieldCheck size={32} /> },
    { name: "Physical fitness", icon: <PiHeart size={32} /> },
    { name: "Community protection", icon: <PiShieldCheck size={32} /> },
    { name: "Investigation", icon: <PiShieldCheck size={32} /> },
    { name: "Risk management", icon: <PiShieldCheck size={32} /> },
    { name: "Strategy", icon: <PiShieldCheck size={32} /> },
    { name: "Discipline", icon: <PiShieldCheck size={32} /> },
    { name: "Crisis response", icon: <PiShieldCheck size={32} /> },
    { name: "Culinary arts", icon: <PiCookingPot size={32} /> },
    { name: "Hospitality", icon: <PiCookingPot size={32} /> },
    { name: "Food culture", icon: <PiCookingPot size={32} /> },
    { name: "Cooking", icon: <PiCookingPot size={32} /> },
    { name: "Creativity", icon: <PiPaintBrush size={32} /> },
    { name: "Customer satisfaction", icon: <PiUsers size={32} /> },
    { name: "Food science", icon: <PiBowlFoodFill size={32} /> },
    { name: "Baking", icon: <PiCookingPot size={32} /> },
    { name: "Restaurants", icon: <PiCookingPot size={32} /> },
    { name: "Event planning", icon: <PiTreePalm size={32} /> },
    { name: "Travel", icon: <PiMapTrifold size={32} /> },
    { name: "Taste exploration", icon: <PiBowlFoodFill size={32} /> },
    { name: "Outdoor work", icon: <PiTreePalm size={32} /> },
    { name: "Environmental care", icon: <PiTreePalm size={32} /> },
    { name: "Facility upkeep", icon: <PiBuildings size={32} /> },
    { name: "Nature", icon: <PiTreePalm size={32} /> },
    { name: "Physical activity", icon: <PiHeart size={32} /> },
    { name: "Landscaping", icon: <PiTreePalm size={32} /> },
    { name: "Sustainability", icon: <PiTreePalm size={32} /> },
    { name: "Hands-on tasks", icon: <PiWrench size={32} /> },
    { name: "Gardening", icon: <PiFlower size={32} /> },
    { name: "Building maintenance", icon: <PiBuildings size={32} /> },
    { name: "Weather", icon: <PiTreePalm size={32} /> },
    { name: "Ecology", icon: <PiTreePalm size={32} /> },
    { name: "DIY projects", icon: <PiWrench size={32} /> },
    { name: "Beauty", icon: <PiPaintBrush size={32} /> },
    { name: "Event coordination", icon: <PiTreePalm size={32} /> },
    { name: "Childcare", icon: <PiUsers size={32} /> },
    { name: "Personal growth", icon: <PiHeart size={32} /> },
    { name: "Fitness", icon: <PiHeart size={32} /> },
    { name: "Fashion", icon: <PiPaintBrush size={32} /> },
    { name: "Relationships", icon: <PiUsers size={32} /> },
    { name: "Customer service", icon: <PiUsers size={32} /> },
    { name: "Pets", icon: <PiFish size={32} /> },
    { name: "Business", icon: <PiBriefcase size={32} /> },
    { name: "Commerce", icon: <PiBriefcase size={32} /> },
    { name: "Networking", icon: <PiUsers size={32} /> },
    { name: "Consumer behavior", icon: <PiShoppingCart size={32} /> },
    { name: "Marketing", icon: <PiShoppingCart size={32} /> },
    { name: "Negotiation", icon: <PiBriefcase size={32} /> },
    { name: "Entrepreneurship", icon: <PiBriefcase size={32} /> },
    { name: "Sales trends", icon: <PiShoppingCart size={32} /> },
    { name: "Advertising", icon: <PiShoppingCart size={32} /> },
    { name: "Psychology", icon: <PiUsers size={32} /> },
    { name: "Communication", icon: <PiUsers size={32} /> },
    { name: "Competition", icon: <PiBriefcase size={32} /> },
    { name: "Technology", icon: <PiCode size={32} /> },
    { name: "Organization", icon: <PiBriefcase size={32} /> },
    { name: "Efficiency", icon: <PiBriefcase size={32} /> },
    { name: "Office environments", icon: <PiBriefcase size={32} /> },
    { name: "Supporting teams", icon: <PiUsers size={32} /> },
    { name: "Detail-oriented work", icon: <PiBriefcase size={32} /> },
    { name: "Planning", icon: <PiBriefcase size={32} /> },
    { name: "Data management", icon: <PiCode size={32} /> },
    { name: "Problem-solving", icon: <PiWrench size={32} /> },
    { name: "Schedules", icon: <PiBriefcase size={32} /> },
    { name: "Documentation", icon: <PiBriefcase size={32} /> },
    { name: "Farming", icon: <PiPlantFill size={32} /> },
    { name: "Agriculture", icon: <PiPlantFill size={32} /> },
    { name: "Wildlife", icon: <PiFish size={32} /> },
    { name: "Rural living", icon: <PiPlantFill size={32} /> },
    { name: "Equipment", icon: <PiWrench size={32} /> },
    { name: "Conservation", icon: <PiPlantFill size={32} /> },
    { name: "Building", icon: <PiBuildings size={32} /> },
    { name: "Infrastructure", icon: <PiBuildings size={32} /> },
    { name: "Craftsmanship", icon: <PiWrench size={32} /> },
    { name: "Construction", icon: <PiBuildings size={32} /> },
    { name: "Engineering", icon: <PiWrenchFill size={32} /> },
    { name: "Architecture", icon: <PiBuildings size={32} /> },
    { name: "Tools", icon: <PiWrench size={32} /> },
    { name: "Urban development", icon: <PiBuildings size={32} /> },
    { name: "Materials", icon: <PiWrenchFill size={32} /> },
    { name: "Design", icon: <PiPaintBrush size={32} /> },
    { name: "Machines", icon: <PiWrench size={32} /> },
    { name: "Fixing things", icon: <PiWrench size={32} /> },
    { name: "Mechanics", icon: <PiWrench size={32} /> },
    { name: "Innovation", icon: <PiWrench size={32} /> },
    { name: "Precision", icon: <PiWrench size={32} /> },
    { name: "Automotive", icon: <PiWrench size={32} /> },
    { name: "Electronics", icon: <PiCode size={32} /> },
    { name: "Manufacturing", icon: <PiFactory size={32} /> },
    { name: "Product creation", icon: <PiFactory size={32} /> },
    { name: "Industrial processes", icon: <PiFactory size={32} /> },
    { name: "Quality", icon: <PiFactory size={32} /> },
    { name: "Machinery", icon: <PiFactory size={32} /> },
    { name: "Supply chain", icon: <PiMapTrifold size={32} /> },
    { name: "Global trade", icon: <PiMapTrifold size={32} /> },
    { name: "Exploration", icon: <PiMapTrifold size={32} /> },
    { name: "Logistics", icon: <PiMapTrifold size={32} /> },
    { name: "Adventure", icon: <PiMapTrifold size={32} /> },
    { name: "Navigation", icon: <PiMapTrifold size={32} /> }
  ];

  const toggleInterest = (interestName) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interestName)
        ? prevInterests.filter((interest) => interest !== interestName)
        : [...prevInterests, interestName]
    );
  };

  const maxRows = 5;
  const visibleInterests = interestsList.slice(0, maxRows * 4);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border">
      <p className="text-lg font-semibold mb-6 text-center">
        Let's start by picking your interests ...
      </p>

      <div
        className="grid grid-cols-4 gap-4 overflow-y-auto"
        style={{ maxHeight: `${maxRows * (32 + 16 + 30)}px` }}
      >
        {interestsList.map((interest, index) => (
          <div
            key={index}
            onClick={() => toggleInterest(interest.name)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-md border-2 cursor-pointer transition-colors duration-200",
              selectedInterests.includes(interest.name)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            )}
          >
            {interest.icon}
            <p className="mt-2 font-medium capitalize text-center">{interest.name}</p>
          </div>
        ))}
      </div>

      <Link href="/interests/interest_dash">
        <Button className="mt-8">Next</Button>
      </Link>
    </div>
  );
};

export default interestsSelect;