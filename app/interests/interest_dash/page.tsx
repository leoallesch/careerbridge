"use client";

import React,{useState} from "react";
import {cn} from "@/lib/utils";
import {Heart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  PiCode,
  PiBriefcase,
  PiCalculator,
  PiGlobe,
  PiWrench
} from "react-icons/pi";
import Link from "next/link";
import {Tile} from '@/components/tile';
import {TileGrid} from '@/components/tile-grid';
import {TileCarousel} from '@/components/tile-carousel';
import {TileScroll} from '@/components/tile-grid-scroll';

// Define the type for a job object
type Job={
  name: string;
  description: string;
  icon: React.ReactNode;
};

// Define the type for favoriteJobs state
type FavoriteJobs={
  [key: string]: boolean;
};

const DashSkills=() => {
  const [favoriteJobs,setFavoriteJobs]=useState<FavoriteJobs>({});

  const jobList: {programming: Job[];}={
    programming: [
      {
        name: "Web Developer",
        description: "Builds websites and web applications.",
        icon: <PiCode size={32} />,
      },
      {
        name: "Software Engineer",
        description: "Designs, develops, and maintains software systems.",
        icon: <PiCode size={32} />,
      },
      {
        name: "Data Scientist",
        description: "Analyzes data to extract insights and solve problems.",
        icon: <PiCalculator size={32} />,
      },
      {
        name: "Mobile App Developer",
        description: "Creates applications for mobile devices.",
        icon: <PiCode size={32} />,
      },
      {
        name: "Database Administrator",
        description: "Manages and maintains databases.",
        icon: <PiBriefcase size={32} />,
      },
      {
        name: "Game Developer",
        description: "Develops video games for various platforms.",
        icon: <PiCode size={32} />,
      },
      {
        name: "Cybersecurity Analyst",
        description: "Protects computer systems and networks from threats.",
        icon: <PiGlobe size={32} />,
      },
      {
        name: "AI/ML Engineer",
        description:
          "Develops artificial intelligence and machine learning models.",
        icon: <PiCode size={32} />,
      },
      {
        name: "DevOps Engineer",
        description:
          "Manages and automates software development and deployment.",
        icon: <PiWrench size={32} />,
      },
      {
        name: "Front-End Developer",
        description:
          "Develops the user interface of websites and applications.",
        icon: <PiCode size={32} />,
      },
      {
        name: "Back-End Developer",
        description:
          "Develops the server-side logic and infrastructure of applications.",
        icon: <PiCode size={32} />,
      },
      {
        name: "Full-Stack Developer",
        description:
          "Develops both the front-end and back-end of applications.",
        icon: <PiCode size={32} />,
      },
    ],
  };

  const handleFavorite=(job: string) => {
    setFavoriteJobs((prevFavorites) => ({
      ...prevFavorites,
      [job]: !prevFavorites[job],
    }));
  };

  const [gridConfig,setGridConfig]=useState({rows: 5,cols: 4}); // State for grid config


  const selectedSkill="programming"; // Hardcoded for demo
  const jobsToShow=jobList[selectedSkill]||[];

  return (

    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border max-w-7xl mx-auto">

      <TileGrid rows={1} columns={5} className="max-w-2xl">
        <Tile
          icon={<PiCode size={32} />}
          text="Home Dashboard"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="User Management"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="System Settings"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Messages"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Programming"
        />
      </TileGrid>

      <TileCarousel>
        <Tile
          icon={<PiCode size={32} />}
          text="Home Dashboard"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="User Management"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="System Settings"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Messages"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Programming"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Programming"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Programming"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Programming"
        />
        <Tile
          icon={<PiCode size={32} />}
          text="Programming"
        />
      </TileCarousel>

      <TileScroll className="w-full max-w-5xl mx-auto h-[10vh] max-h-[80vh] bg-white rounded-lg shadow-md border border-gray-200">
        <TileGrid rows={1} columns={5} className="max-w-2xl">
          <Tile
            icon={<PiCode size={32} />}
            text="Home Dashboard"
          />
          <Tile
            icon={<PiCode size={32} />}
            text="User Management"
          />
          <Tile
            icon={<PiCode size={32} />}
            text="System Settings"
          />
          <Tile
            icon={<PiCode size={32} />}
            text="Messages"
          />
          <Tile
            icon={<PiCode size={32} />}
            text="Programming"
          />
        </TileGrid>
      </TileScroll>



      <p className="text-lg font-semibold mb-6 text-center">
        Select cards to learn more about each job, favorite the ones you are
        interested in
      </p>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobsToShow.map((job) => (
          <div
            key={job.name}
            className="border rounded-md p-4 w-full bg-gray-100 relative flex flex-col"
          >
            <div className="flex items-center justify-center mb-2">
              {job.icon}
            </div>
            <p className="font-medium text-center">{job.name}</p>
            <p className="text-sm mt-2">{job.description}</p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => handleFavorite(job.name)}
            >
              <Heart
                className={cn(favoriteJobs[job.name]&&"text-red-500")}
                size={20}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <nav className="flex justify-between items-center w-full mt-8">
        <Link href="/interests">
          <Button>Interests</Button>
        </Link>
        <Link href="/compare">
          <Button>Compare Jobs</Button>
        </Link>
      </nav>
    </div>
  );
};

export default DashSkills;
