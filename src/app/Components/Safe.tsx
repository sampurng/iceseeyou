"use client";
import { useRef, useState } from "react";
import { josefinSans } from "./Header";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

const handleSubmit = () => {};

const onPlaceChanged = () => {};

export const Safe = () => {
  const [placeOfArrest, setPlaceOfArrest] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name);
    setPlaceOfArrest(() => value);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "", // Replace with your API Key
    libraries,
  });

  return (
    <div>
      <div className="mb-16">
        <div
          className={`${josefinSans.className} text-3xl items-center py-8 justify-center flex flex-col`}
        >
          <div>We are here for you</div>
          <div className="text-xl pt-4">
            Find out whether your area is safe or not
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border-black border-1 flex flex-col pl-32 pr-32 justify-center items-center"
        >
          {/* Address Input with Autocomplete */}
          <div
            className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
          >
            {isLoaded && (
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  name="placeOfArrest"
                  value={placeOfArrest}
                  onChange={handleChange}
                  className="bg-transparent border-black border-4 p-4 w-[550px] rounded-md"
                  placeholder="Check your Neighborhood"
                />
              </Autocomplete>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
