import { Hamburger } from "../Assets/Icons/Hamburger";
import React from "react";
import { josefinSans } from "./Header";
import { Arrow } from "../Assets/Icons/Arrow";

export const Menu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div>
      {/* Sidebar */}
      <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hamburger Icon */}
      <div
        onClick={() => setMenuOpen((prev) => !prev)}
        className="cursor-pointer p-4"
        aria-label="Toggle menu"
      >
        <Hamburger />
      </div>
    </div>
  );
};

const SideBar = ({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (val: boolean) => void }) => {
  return (
    <div
      className={`fixed h-screen w-[30%] z-50 border-white border-2 bg-black left-0 top-0 transform transition-all ${
        menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      } duration-700 ease-in-out`}
    >
      {/* Close Button */}
      <div
        onClick={() => setMenuOpen(false)}
        className="absolute p-4 flex flex-row-reverse w-full cursor-pointer h-20 items-center"
        aria-label="Close menu"
      >
        <Arrow />
      </div>

      {/* Menu Items */}
      <div className={`${josefinSans.className} mx-8 my-16 py-8 text-2xl h-[35%] flex flex-col justify-between`}>
        {["Home", "Map", "Profile", "Report an Incident"].map((item) => (
          <div key={item} className="cursor-pointer hover:underline tracking-wide underline-offset-[5px]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
