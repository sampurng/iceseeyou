// import { PrismaClient } from "@prisma/client";
// import axios from "axios";
// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     // const body = await req.json();
//     console.log(req);
//     const reports = await prisma.input_form.findMany({
//       where: {
//         spam: false,
//       },
//     });

//     console.log(reports, "REPORTS");
//     await axios
//       .post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are an AI assistant specializing in analyzing ICE raid data. " +
//                 "You have access to a dataset of reported ICE raid sightings, including latitude and longitude, " +
//                 "and any identified hotspots or trends. " +
//                 "Your task is to take a user-supplied location, cross-reference your stored data, " +
//                 "and calculate the probability or risk of ICE raids for that location.",
//             },
//             {
//               role: "user",
//               content:
//                 "A user has entered the following location: {{userLocation}}. " +
//                 "Please do the following:\n\n" +
//                 "1. Compare the user’s location with stored ICE raid data. " +
//                 "   Consider whether the user’s location is near existing hotspots or repeated sightings.\n" +
//                 "2. Use any clustering or density estimation data you have (e.g., DBSCAN, KDE) to find " +
//                 "   the nearest clusters of historical ICE activities.\n" +
//                 "3. Calculate a rough probability or risk percentage of encountering an ICE raid, " +
//                 "   based on proximity to these hotspots and the frequency of past sightings.\n" +
//                 "4. Provide a clear, concise explanation of how you arrived at this probability, " +
//                 "   and note any assumptions or uncertainties due to missing or incomplete data.\n\n" +
//                 "Return your answer in plain text(preferrably) or JSON, whichever is more convenient. " +
//                 "If you do not have enough information to produce a confident estimate, " +
//                 "please say so, and suggest ways to gather the missing data.\n\n" +
//                 "Do it based on this data\n\n" +
//                 JSON.stringify(reports),
//             },
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
//             "Content-Type": "application/json",
//             Accept: "*/*",
//           },
//         }
//       )
//       .then((res) => console.log(res));

//     // Insert into database
//     // const user = await prisma.users.findUnique({
//     //   where: {
//     //     email: body.email,
//     //   },
//     // });

//     // if (!user) NextResponse.json({ success: false, user }, { status: 404 });

//     // return NextResponse.json({ success: true, user }, { status: 200 });
//   } catch (error) {
//     console.error("No Such User:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Uncomment this if you need the request body
    console.log(req);
    const reports = await prisma.input_form.findMany({
      where: {
        spam: false,
      },
    });

    console.log(reports, "REPORTS");

    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant specializing in analyzing ICE raid data. " +
              "You have access to a dataset of reported ICE raid sightings, including latitude and longitude, " +
              "and any identified hotspots or trends. " +
              "Your task is to take a user-supplied location, cross-reference your stored data, " +
              "and calculate the probability or risk of ICE raids for that location.",
          },
          {
            role: "user",
            content:
              "A user has entered the following location: {{ " +
              body.place +
              " }}. " +
              "Please do the following:\n\n" +
              "1. Compare the user's location with stored ICE raid data. " +
              "   Consider whether the user's location is near existing hotspots or repeated sightings.\n" +
              "2. Use any clustering or density estimation data you have (e.g., DBSCAN, KDE) to find " +
              "   the nearest clusters of historical ICE activities.\n" +
              "3. Calculate a rough probability or risk percentage of encountering an ICE raid, " +
              "   based on proximity to these hotspots and the frequency of past sightings.\n" +
              "4. Provide a clear, concise explanation of how you arrived at this probability, " +
              "   and note any assumptions or uncertainties due to missing or incomplete data.\n\n" +
              "Return your answer in plain text, a probability percentage of that location seeing an ICE raid. " +
              // "If you do not have enough information to produce a confident estimate, " +
              // "please say so, and suggest ways to gather the missing data.\n\n" +
              "Do it based on this data\n\n" +
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

    // console.log(openAiResponse.data.choices[0].message);

    // Return the OpenAI response to the client
    return NextResponse.json(openAiResponse.data.choices[0].message, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
