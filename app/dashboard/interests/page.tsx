"use client";

import React,{useState,useEffect} from "react";
import {cn} from "@/lib/utils";
import PageWrapper from "@/components/layout/page-wrapper";
import {useSession} from "@/lib/auth-client";
import {Tile} from "@/components/tile/tile";
import {TileGrid} from "@/components/tile/tile-grid";
import {TileScroll} from "@/components/tile/tile-grid-scroll";

const InterestsPage=() => {
  const [interests,setInterests]=useState<
    {interestId: number; name: string; icon: string;}[]
  >([]);
  const [selectedInterests,setSelectedInterests]=useState<number[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const {data: session}=useSession();

  const userId=session?.user?.id;

  useEffect(() => {
    const fetchInterests=async () => {
      try {
        const res=await fetch("/api/interests");
        if(!res.ok) throw new Error("Failed to fetch interests");
        const data=await res.json();
        setInterests(data);
      } catch(err) {
        setError(err instanceof Error? err.message:"An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchSavedInterests=async () => {
      try {
        const res=await fetch(`/api/user-saved/interest?userId=${userId}`);
        if(!res.ok) throw new Error("Failed to fetch saved interests");
        const data=await res.json();
        setSelectedInterests(
          data.map((item: {interestId: number;}) => item.interestId)
        );
      } catch(err) {
        console.error("Error fetching saved interests:",err);
      }
    };

    fetchInterests();
    if(userId) fetchSavedInterests();
  },[userId]);

  const toggleInterest=async (interestId: number) => {
    if(!userId) {
      setError("Please sign in to save interests");
      return;
    }

    const isSelected=selectedInterests.includes(interestId);

    setSelectedInterests((prev) =>
      isSelected
        ? prev.filter((id) => id!==interestId)
        :[...prev,interestId]
    );

    try {
      const payload={userId,id: interestId};
      console.log("Sending payload:",payload);

      const res=await fetch("/api/user-saved/interest",{
        method: isSelected? "DELETE":"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData=await res.json();

      if(!res.ok) {
        console.error("Response error:",responseData);
        setSelectedInterests((prev) =>
          isSelected
            ? [...prev,interestId]
            :prev.filter((id) => id!==interestId)
        );
        throw new Error(responseData.error||"Failed to save interest");
      }
    } catch(err) {
      console.error("Error toggling interest:",err);
      setError(err instanceof Error? err.message:"An error occurred");
    }
  };

  const visibleInterests=interests;

  if(error) return <div>Error: {error}</div>;

  return (
    <PageWrapper
      title="Let's start by picking your interests"
      pageNavProps={{
        back: {href: "/dashboard",label: "Dashboard"},
        forward: {href: "/dashboard/jobs",label: "See Jobs"},
      }}
      loading={loading}
    >
      <TileScroll className={cn("w-auto max-h-[60vh]")}>
        <TileGrid columns={4} className="gap-4">
          {visibleInterests.map((interest) => (
            <Tile
              key={interest.interestId}
              icon={interest.icon}
              text={interest.name}
              onClick={() => toggleInterest(interest.interestId)}
              isSelected={selectedInterests.includes(interest.interestId)}
              className={cn(
                "rounded-md border-2", // Match your original styling
                selectedInterests.includes(interest.interestId)
                  ? "bg-blue-50" // Override bg-white with bg-blue-50
                  :"border-gray-300"
              )}
            />
          ))}
        </TileGrid>
      </TileScroll>
    </PageWrapper>
  );
};

export default InterestsPage;