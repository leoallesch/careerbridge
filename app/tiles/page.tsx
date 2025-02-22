"use client";

import React from "react";
import { Tile } from "@/components/tile/tile";
import { TileGrid } from "@/components/tile/tile-grid";
import { TileCarousel } from "@/components/tile/tile-carousel";
import { TileScroll } from "@/components/tile/tile-grid-scroll";

import { PiCode } from "react-icons/pi";

const tileData = [{ icon: <PiCode size={32} />, text: "Caregiving" }];

const Tiles = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border max-w-7xl mx-auto gap-12 flex-grow px-4">
      <TileGrid rows={1} columns={5} className="max-w-2xl">
        <Tile icon={<PiCode size={32} />} text="Home Dashboard" />
        <Tile icon={<PiCode size={32} />} text="User Management" />
        <Tile icon={<PiCode size={32} />} text="System Settings" />
        <Tile icon={<PiCode size={32} />} text="Messages" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
      </TileGrid>

      <TileCarousel>
        <Tile icon={<PiCode size={32} />} text="Home Dashboard" />
        <Tile icon={<PiCode size={32} />} text="User Management" />
        <Tile icon={<PiCode size={32} />} text="System Settings" />
        <Tile icon={<PiCode size={32} />} text="Messages" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
      </TileCarousel>

      <TileScroll className="w-auto max-w-3xl mx-auto h-[10vh] max-h-[80vh] bg-white rounded-lg shadow-md border border-gray-200">
        <TileGrid rows={3} columns={2} className="max-w-xl">
          <Tile icon={<PiCode size={32} />} text="Home Dashboard" />
          <Tile icon={<PiCode size={32} />} text="User Management" />
          <Tile icon={<PiCode size={32} />} text="System Settings" />
          <Tile icon={<PiCode size={32} />} text="Messages" />
          <Tile icon={<PiCode size={32} />} text="Programming" />
        </TileGrid>
      </TileScroll>

      <TileCarousel className="max-w-5xl">
        {tileData.map((tile, index) => (
          <Tile
            key={index} // Use a unique key for each mapped element
            icon={tile.icon}
            text={tile.text}
          />
        ))}
      </TileCarousel>
    </div>
  );
};

export default Tiles;
