"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ResumeDropTile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [addedInterestIds, setAddedInterestIds] = useState<number[]>([]); // Changed to number[]
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleClick = () => {
    if (!loading && !successMessage) {
      fileInputRef.current?.click();
    }
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.includes("pdf")) {
      setError("Please upload a PDF file");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit");
      return false;
    }
    return true;
  };

  const analyzeResume = async () => {
    if (!file) {
      setError("Please upload a resume first");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 25, 75));
      }, 500);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const interestIds: number[] = await response.json(); // Array of numbers

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      if (session?.user) {
        await saveMatchesToUserSaved(interestIds, session.user.id);
        setAddedInterestIds(interestIds);
        setSuccessMessage(
          `Resume analyzed successfully! ${interestIds.length} interests added.`
        );
      }

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const saveMatchesToUserSaved = async (
    interestIds: number[],
    userId: string
  ) => {
    for (const id of interestIds) {
      const payload = { userId, id };
      const res = await fetch("/api/user-saved/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const responseData = await res.json();
        throw new Error(responseData.error || "Failed to save interest");
      }
    }
  };

  const undoLastAnalysis = async () => {
    if (!addedInterestIds.length || !session?.user?.id) return;

    setLoading(true);
    try {
      for (const id of addedInterestIds) {
        const res = await fetch("/api/user-saved/interest", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.user.id,
            id,
          }),
        });

        if (!res.ok) {
          const responseData = await res.json();
          throw new Error(responseData.error || "Failed to remove interest");
        }
      }
      setSuccessMessage("Interests removed successfully.");
      setAddedInterestIds([]);
    } catch {
      setError("Failed to undo analysis");
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "border-2 border-dashed border-blue-500 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "w-fit"
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
          accept=".pdf"
        />

        <Upload size={48} className="mx-auto text-blue-500 mb-4" />
        <p className="text-blue-500">Drag and Drop your Resume here</p>
        <p className="text-gray-500 text-sm mt-2">
          Our AI-powered tool will read your resume and match you with
          industries.
        </p>

        {file && (
          <div className="mt-4 flex items-center justify-center">
            <div className="inline-flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-600">
              {file.name}
              <button
                onClick={removeFile}
                className="ml-2 text-gray-500 hover:text-red-600 focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {file && !loading && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              analyzeResume();
            }}
            className="mt-4 text-white"
            disabled={loading}
          >
            Analyze Resume
          </Button>
        )}

        {loading && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-sm text-blue-600">Analyzing resume...</p>
            <Progress value={progress} className="mt-2 w-64" />
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-600">Error: {error}</p>}

        {successMessage && (
          <div className="mt-4">
            <p className="text-sm text-green-600">{successMessage}</p>
            {addedInterestIds.length > 0 && (
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  undoLastAnalysis();
                }}
                className="mt-2"
                disabled={loading}
              >
                Undo
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDropTile;
