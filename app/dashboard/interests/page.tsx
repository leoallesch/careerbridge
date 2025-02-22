"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/layout/page-wrapper";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicFaIcon } from "@/components/icon/dynamic-fa-icon";

const InterestsPage = () => {
  const [interests, setInterests] = useState<
    { interestId: number; name: string; icon: string }[]
  >([]);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch("/api/interests");
        if (!res.ok) throw new Error("Failed to fetch interests");
        const data = await res.json();
        setInterests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchSavedInterests = async () => {
      try {
        const res = await fetch(`/api/user-saved/interest?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch saved interests");
        const data = await res.json();
        setSelectedInterests(
          data.map((item: { interestId: number }) => item.interestId)
        );
      } catch (err) {
        console.error("Error fetching saved interests:", err);
      }
    };

    fetchInterests();
    if (userId) fetchSavedInterests();
  }, [userId]);

  const toggleInterest = async (interestId: number) => {
    if (!userId) {
      setError("Please sign in to save interests");
      return;
    }

    const isSelected = selectedInterests.includes(interestId);

    setSelectedInterests((prev) =>
      isSelected
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );

    try {
      const payload = { userId, id: interestId };
      console.log("Sending payload:", payload);

      const res = await fetch("/api/user-saved/interest", {
        method: isSelected ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Response error:", responseData);
        setSelectedInterests((prev) =>
          isSelected
            ? [...prev, interestId]
            : prev.filter((id) => id !== interestId)
        );
        throw new Error(responseData.error || "Failed to save interest");
      }
    } catch (err) {
      console.error("Error toggling interest:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const maxRows = 5;
  const visibleInterests = interests;

  // Render exactly 5 skeleton cards while loading
  if (loading) {
    return (
      <PageWrapper
        title="Let's start by picking your interests"
        pageNavProps={{
          forward: { href: "/dashboard/jobs", label: "See Jobs" },
        }}
      >
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[110px] w-full rounded-md" />
          ))}
        </div>
      </PageWrapper>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper
      title="Let's start by picking your interests"
      pageNavProps={{
        back: { href: "/dashboard", label: "Dashboard" },
        forward: { href: "/dashboard/jobs", label: "See Jobs" },
      }}
    >
      <div
        className="grid grid-cols-4 gap-4 overflow-y-auto"
        style={{ maxHeight: `${maxRows * (32 + 16 + 30)}px` }}
      >
        {visibleInterests.map((interest) => {
          return (
            <div
              key={interest.interestId}
              onClick={() => toggleInterest(interest.interestId)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-md border-2 cursor-pointer transition-colors duration-200",
                selectedInterests.includes(interest.interestId)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              )}
            >
              <DynamicFaIcon name={interest.icon} size={32} />
              <p className="mt-2 font-medium capitalize text-center">
                {interest.name}
              </p>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default InterestsPage;
