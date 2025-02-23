"use client";
import { useRef, useState } from "react";
import { josefinSans } from "./Header";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import ReactMarkdown from "react-markdown";
import { Toaster, toast } from "react-hot-toast";

const libraries: "places"[] = ["places"];

interface OpenAIResponse {
  content: string;
  role: string;
}

export const Safe = () => {
  const [placeOfArrest, setPlaceOfArrest] = useState("");
  const [markdown, setMarkdown] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setPlaceOfArrest(() => place.formatted_address || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const toastId = toast.loading("Checking safety...");

    try {
      const response = await fetch("/api/Safety/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ place: placeOfArrest }),
      });

      //   const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: OpenAIResponse = await response.json();

      setMarkdown(result.content);
      //   alert("Safety check completed successfully!");
      toast.success("Safety check completed successfully!", {
        id: toastId,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to check safety", { id: toastId });

      //   alert("Something went wrong!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
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
      <Toaster position="bottom-right" />

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
          </div>{" "}
          <button
            type="submit"
            className={`mt-4 bg-black text-white py-6 px-12 rounded-md text-xl tracking-wide  hover:bg-[#262626] border-black border-4`}
          >
            Am I Safe?
          </button>
        </form>
      </div>
      <div
        className={`p-16, text-xl ${josefinSans.className} w-full flex justify-center items-center mb-16`}
      >
        <MarkdownViewer markdown={markdown} />
      </div>
    </div>
  );
};

function MarkdownViewer(props: { markdown: string }) {
  return (
    props.markdown && (
      <div className="prose w-[70%] ">
        <ReactMarkdown>{props.markdown}</ReactMarkdown>
      </div>
    )
  );
}
