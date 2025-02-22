"use client";

import * as React from "react";

interface FeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  items: string[];
  flipped?: boolean; // Controls whether the layout is flipped (image on right)
}

export default function FeatureCard({
  imageSrc,
  imageAlt,
  title,
  items,
  flipped=false,
}: FeatureCardProps) {
  return (
    <div className="max-w-6xl mx-auto my-12 flex flex-col md:flex-row items-center gap-12 p-6">
      {flipped? (
        <>
          <div className="md:w-1/2 w-full">
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <p className="text-2xl md:text-3xl font-extrabold">{title}</p>
              {items.map((item,index) => (
                <li key={index} className="text-xl md:text-2xl font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="object-cover rounded-lg w-full h-auto"
              width={500} // Increased from 300 to 400
              height={400} // Increased from 200 to 300
            />
          </div>
        </>
      ):(
        <>
          <div className="md:w-1/2 w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="object-cover rounded-lg w-full h-auto"
              width={500} // Increased from 300 to 400
              height={400} // Increased from 200 to 300
            />
          </div>
          <div className="md:w-1/2 w-full">
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <p className="text-2xl md:text-3xl font-extrabold">{title}</p>
              {items.map((item,index) => (
                <li key={index} className="text-xl md:text-2xl font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}