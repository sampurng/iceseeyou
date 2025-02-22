"use client";

import { useState, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { josefinSans } from "./Header";

const libraries: "places"[] = ["places"];

export const Form = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAhgeYMaNNB_2-wO6q_scv9faggzKBETIM", // Replace with your API Key
    libraries,
  });

  // State variables for form inputs
  const [formData, setFormData] = useState({
    placeOfArrest: "",
    email: "",
    dateOfArrest: "",
    iceMonitoring: "",
    immigrationStatus: "",
    arrestNumber: "",
    reasonForRaid: "",
    reasonForCourtVisit: "",
    timeHeldBeforeICE: "",
    additionalInfo: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setFormData((prev) => ({
        ...prev,
        placeOfArrest: place.formatted_address || "",
        latitude: place.geometry?.location?.lat() || null,
        longitude: place.geometry?.location?.lng() || null,
      }));
    }
  };

  // Handle input changes for other fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form & submit data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === "") {
        alert(`Error: ${key.replace(/([A-Z])/g, " $1")} cannot be empty`);
        return;
      }
    }

    // Log JSON output
    console.log("Form Data Submitted:", JSON.stringify(formData, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-black border-1 flex flex-col p-32 justify-center items-center"
    >
      {/* Address Input with Autocomplete */}
      <div
        className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
      >
        {isLoaded && (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              name="placeOfArrest"
              value={formData.placeOfArrest}
              onChange={handleChange}
              className="bg-transparent border-black border-4 p-4 w-[550px] rounded-md"
              placeholder="Place of Arrest"
            />
          </Autocomplete>
        )}
      </div>

      {/* Email Input */}
      <div
        className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
      >
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-transparent border-black border-4 p-4 w-[550px] rounded-md"
          placeholder="Email"
        />
      </div>

      {/* Date & ICE Monitoring */}
      <div className="flex flex-row">
        <div
          className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
        >
          <input
            name="dateOfArrest"
            type="date"
            value={formData.dateOfArrest}
            onChange={handleChange}
            className="bg-transparent border-black border-4 p-4 w-[275px] rounded-md"
          />
        </div>
        <div
          className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
        >
          <input
            name="iceMonitoring"
            value={formData.iceMonitoring}
            onChange={handleChange}
            className="bg-transparent border-black border-4 p-4 w-[250px] rounded-md"
            placeholder="ICE Monitoring?"
          />
        </div>
      </div>

      {/* Additional Inputs */}
      {[
        "immigrationStatus",
        "arrestNumber",
        "reasonForRaid",
        "reasonForCourtVisit",
        "timeHeldBeforeICE",
      ].map((field) => (
        <div
          key={field}
          className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
        >
          <input
            name={field}
            value={formData[field as keyof typeof formData] ?? ""}
            onChange={handleChange}
            className="bg-transparent border-black border-4 p-4 w-[550px] rounded-md"
            placeholder={field.replace(/([A-Z])/g, " $1")}
          />
        </div>
      ))}

      {/* Additional Info */}
      <div
        className={`${josefinSans.className} tracking-widest p-4 flex flex-row justify-center items-center text-2xl w-fit`}
      >
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          className="bg-transparent border-black border-4 p-4 w-[550px] rounded-md"
          placeholder="Additional Info"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-black text-white py-2 px-6 rounded-md text-xl tracking-wide"
      >
        Submit
      </button>
    </form>
  );
};
