import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const reports = await prisma.input_form.findMany({
      where: {
        spam: false,
      },
    });

    await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that examines a dataset of ICE raid sightings. Your goal is to identify hotspots using spatial analysis, check for repeated sightings, and provide predictive insights about potential future activity.",
          },
          {
            role: "user",
            content:
              "Using the provided dataset containing the geographical coordinates (longitude and latitude) of reported ICE raid sightings, conduct an analysis to identify potential hotspots of activity. Please focus on:\n\n" +
              "1. Data Aggregation & Preprocessing: Verify accuracy and consistency of the recorded locations, remove duplicates or erroneous entries, and standardize coordinate formats.\n" +
              "2. Identification of Previous Sightings: Determine if specific locations have recorded multiple incidents over time, and establish frequency, clustering, and temporal trends.\n" +
              "3. Hotspot Detection & Analysis: Apply spatial analysis techniques (e.g., DBSCAN, Kernel Density Estimation) to find high-density clusters of sightings. Map the concentration of reports to visualize areas experiencing repeated ICE activity. Check if proximity to certain landmarks correlates with increased sightings.\n" +
              "4. Predictive Insights & Interpretation: Based on identified hotspots, predict potential future areas of increased ICE activity. Provide statistical summaries of trends, highlighting regions with consistently high levels of reported sightings.\n\n" +
              "Please return a concise but thorough response detailing your findings, methods used, and any relevant charts or data structures you might generate. If any location data is unclear or missing, note the uncertainty and propose how to handle incomplete entries. Format your final answer in plain text or JSON, whichever you prefer." +
              "Here are some reports for your reference: \n\n" +
              JSON.stringify(reports),
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    // Insert into database
    const user = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) NextResponse.json({ success: false, user }, { status: 404 });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("No Such User:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
