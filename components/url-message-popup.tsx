"use client";
import { Alert } from "./ui/alert";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Info, CircleAlert } from "lucide-react";

/**
 *
 * Gets input from ?error= or ?message=
 */
export default function UrlMessagePopup() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [alert, setAlert] = useState<{
    type: "error" | "message" | null;
    message: string | null;
  }>({ type: null, message: null });

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error) {
      setAlert({ type: "error", message: error }); // Use the error message
    } else if (message) {
      // Only set if error is NOT present
      setAlert({ type: "message", message: message }); // Use the general message
    } else {
      setAlert({ type: null, message: null }); // Clear if neither is present
    }
  }, [searchParams]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(alert.type || ""); // Simplified deletion
    router.push(`?${params.toString()}`);
    setAlert({ type: null, message: null });
  };

  if (!alert.type || !alert.message) {
    return null;
  }

  return (
    <div className="fixed justify-center w-full ">
      <Alert
        variant={alert.type === "error" ? "destructive" : "default"}
        className="w-fit mx-auto mt-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {alert.type === "error" && <CircleAlert className="h-4 w-4 mr-2" />}
            {alert.type === "message" && <Info className="h-4 w-4 mr-2" />}
            <p>{alert.message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </Alert>
    </div>
  );
}
