"use client";

import React, { useState } from "react";
import {
  PiBowlFoodFill,
  PiPlantFill,
  PiWrench,
  PiCode,
  PiPaintBrush,
  PiMusicNote,
  PiPencil,
  PiFlower,
  PiFish,
  PiSkull,
  PiHammer,
  PiStudent,
} from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define the type for a skill object
type Skill = {
  name: string;
  icon: React.ReactNode;
};

// Define the possible skill names as a union type
type SkillName = 
  | "cooking"
  | "farming"
  | "mechanics"
  | "programming"
  | "artistry"
  | "music"
  | "writing"
  | "gardening"
  | "fishing"
  | "hunting"
  | "construction"
  | "teaching";

const SkillsSelect = () => {
  const [selectedSkills, setSelectedSkills] = useState<SkillName[]>([]);

  const skillsList: Skill[] = [
    { name: "cooking", icon: <PiBowlFoodFill size={32} /> },
    { name: "farming", icon: <PiPlantFill size={32} /> },
    { name: "mechanics", icon: <PiWrench size={32} /> },
    { name: "programming", icon: <PiCode size={32} /> },
    { name: "artistry", icon: <PiPaintBrush size={32} /> },
    { name: "music", icon: <PiMusicNote size={32} /> },
    { name: "writing", icon: <PiPencil size={32} /> },
    { name: "gardening", icon: <PiFlower size={32} /> },
    { name: "fishing", icon: <PiFish size={32} /> },
    { name: "hunting", icon: <PiSkull size={32} /> },
    { name: "construction", icon: <PiHammer size={32} /> },
    { name: "teaching", icon: <PiStudent size={32} /> },
  ];

  const toggleSkill = (skillName: SkillName) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skillName)
        ? prevSkills.filter((skill) => skill !== skillName)
        : [...prevSkills, skillName]
    );
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border">
      <p className="text-lg font-semibold mb-6 text-center">
        lets start by picking your skills ...
      </p>

      <div className="grid grid-cols-4 gap-4">
        {skillsList.map((skill, index) => (
          <div
            key={index}
            onClick={() => toggleSkill(skill.name as SkillName)} // Type assertion here
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-md border-2 cursor-pointer transition-colors duration-200",
              selectedSkills.includes(skill.name as SkillName)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            )}
          >
            {skill.icon}
            <p className="mt-2 font-medium capitalize text-center">
              {skill.name}
            </p>
          </div>
        ))}
      </div>

      <Link href="/skills/skill_dash">
        <Button className="mt-8">Next</Button>
      </Link>
    </div>
  );
};

export default SkillsSelect;