"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {cn} from "@/lib/utils";

interface TileCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export const TileCarousel: React.FC<TileCarouselProps>=({
  children,
  className,
}) => {
  return (
    <Carousel
      className={cn("w-full max-w-5xl mx-auto",className)}
      opts={{
        align: "start",
        loop: false, // Disable infinite scrolling
      }}
    >
      <CarouselContent className="-ml-2">
        {React.Children.map(children,(child,index) => (
          <CarouselItem key={index} className="pl-2 basis-1/3 md:basis-1/4 lg:basis-1/5">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};