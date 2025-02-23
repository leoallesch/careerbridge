'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const ResumeDropTile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Essential to allow drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files; // Get the dropped files (plural)

    if (droppedFiles.length > 0) { // Check if any files were dropped
      const droppedFile = droppedFiles[0]; // Get the first file

      setFile(droppedFile);
      console.log("File dropped:", droppedFile);

      // Here you would typically handle the file upload
      // For example, using fetch or Axios to send it to the server
    }
  };


  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={cn(
          "border-2 border-dashed border-blue-500 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "w-fit"
        )}
        onDragOver={handleDragOver} // Now correctly referenced
        onDrop={handleDrop}         // Now correctly referenced
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input type="file" id="fileInput" className="hidden" onChange={handleFileInputChange} />

        <Upload size={48} className="mx-auto text-blue-500 mb-4" />
        <p className="text-blue-500">Drag and Drop your Resume here</p>
        <p className="text-gray-500 text-sm mt-2">
          Our AI powered tool will read your resume, and gather a list of skills,
          interests, and other keywords to help match you with industries you
          may be best fit for.
        </p>

        {file && <p className="mt-4 text-sm text-gray-600">File: {file.name}</p>}
      </div>
    </div>
  );
};

export default ResumeDropTile;