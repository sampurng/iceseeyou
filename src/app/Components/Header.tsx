"use client";

import { Josefin_Sans } from "next/font/google";
import React from "react";
import { Menu } from "./Menu";

export const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const Header = () => {
  return (
    <div className="flex justify-between border-black border-b p-8">
      <div className="bg-[#262626] flex">
        <Menu />
      </div>
      <div className={`bg-[#262626] flex ${josefinSans.className}`}>
        ICESEEYOU
      </div>
    </div>
  );
};
