import { Hamburger } from "../Assets/Icons/Hamburger";
import React from "react";
import { josefinSans } from "./Header";
import { Arrow } from "../Assets/Icons/Arrow";

export const Menu = (props: {
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  return (
    <div>
      <div>
        <div className={`${menuOpen ? "block" : "hidden"} `}>
          <SideBar setMenuOpen={setMenuOpen} setMenuType={props.setMenuType} />
        </div>
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <Hamburger />
        </div>
      </div>
    </div>
  );
};

const SideBar = (props: {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="absolute h-screen w-[30%] z-10000 border-white border-2 bg-black left-0 top-0 transition ease transform duration-300 block transition-all duration-300 ease-out">
      <div
        onClick={() => props.setMenuOpen(false)}
        className="absolute p-4 flex flex-row-reverse w-full cursor-pointer h-20 items-center"
      >
        <Arrow />
      </div>

      <div
        className={`${josefinSans.className} mx-8 my-16 py-8 text-2xl h-[35%] flex flex-col justify-between`}
      >
        <div
          className="cursor-pointer hover:underline tracking-wide underline-offset-[5px]"
          onClick={() => {
            props.setMenuType("home");
            props.setMenuOpen(false);
          }}
        >
          Home
        </div>
        <div
          className="cursor-pointer hover:underline tracking-wide underline-offset-[5px]"
          onClick={() => {
            props.setMenuType("map");
            props.setMenuOpen(false);
          }}
        >
          Map
        </div>
        <div
          className="cursor-pointer hover:underline tracking-wide underline-offset-[5px]"
          onClick={() => {
            props.setMenuType("chat");
            props.setMenuOpen(false);
          }}
        >
          Chat
        </div>
        <div
          className="cursor-pointer  hover:underline tracking-wide underline-offset-[5px] "
          onClick={() => {
            props.setMenuType("report");
            props.setMenuOpen(false);
          }}
        >
          Report an Incident
        </div>

        <div
          className="cursor-pointer  hover:underline tracking-wide underline-offset-[5px] "
          onClick={() => {
            props.setMenuType("safe");
            props.setMenuOpen(false);
          }}
        >
          Am i safe?
        </div>
      </div>
    </div>
  );
};
