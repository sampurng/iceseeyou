import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     let spam = false;

//     await axios
//       .post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are an AI assistant tasked with analyzing ICE sighting reports for credibility and relevance. Your job is to determine if a report should be added to the heatmap or marked as spam based on specific criteria.",
//             },
//             {
//               role: "user",
//               content:
//                 "Analyze the following ICE sighting report and determine if it should be added to the heatmap or marked as spam. Consider these criteria:\n\n" +
//                 "1. Location Verification: Does the place of arrest match with a location on the map?\n" +
//                 "2. Email Credibility: Is the email valid? Has this email been flagged as uncredible in the past?\n" +
//                 // "4. Raid Reason Credibility: Is the reason for the raid logical and consistent with past events?\n" +
//                 "5. Court Visit Reason: Does the reason for the court visit make sense and align with previous occurrences?\n" +
//                 "6. Completeness: Are there any missing fields of information?\n" +
//                 "Based on these criteria, provide a clear decision: either 'Add to Heatmap' or 'Mark as Spam'. Also, provide a brief explanation for your decision.\n\n" +
//                 "Here's the report to analyze:\n" +
//                 JSON.stringify(body),
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
//       .then((res) => {
//         console.log(res.data.choices[0].message, "AAA");
//         spam = res.data.choices[0].message.content
//           .toLowerCase()
//           .includes("spam")
//           ? true
//           : false;

//         console.log(spam, "HAHAHAHAHAHA");
//       })
//       .then(async () => {
//         try {
//           const user = await prisma.users.findFirst({
//             where: {
//               email: body.email,
//             },
//           });

//           if (user)
//             await prisma.input_form
//               .create({
//                 data: {
//                   user_id: user.uuid,
//                   location: body.placeOfArrest,
//                   description: body.description,
//                   a_number: body.arrestNumber,
//                   reason_for_visit: body.reasonForCourtVisit,
//                   time_held: body.timeHeldBeforeICE,
//                   additional_info: body.additionalInfo,
//                   spam: spam,
//                   immigration_status: body.immigrationStatus,
//                   under_ice_monitoring: body.iceMonitoring,
//                   how_ice_found_out: body.reasonForRaid,
//                   latitude: body.latitude,
//                   longitude: body.longitude,
//                 },
//               })
//               .then(() => console.log("Inserted form"));
//           // userExists = true;
//         } catch (e) {
//           console.log(e);
//           console.log("does not exists");
//           const user = await prisma.users.create({
//             data: {
//               email: body.email,
//             },
//           });
//           await prisma.input_form.create({
//             data: {
//               user_id: user.uuid,
//               location: body.placeOfArrest,
//               description: body.description,
//               a_number: body.arrestNumber,
//               reason_for_visit: body.reasonForCourtVisit,
//               time_held: body.timeHeldBeforeICE,
//               additional_info: body.additionalInfo,
//               spam: spam,
//               immigration_status: body.immigrationStatus,
//               under_ice_monitoring: body.iceMonitoring,
//               how_ice_found_out: body.reasonForRaid,
//               latitude: body.latitude,
//               longitude: body.longitude,
//             },
//           });
//         }
//       });

//     // Insert into database

//     return NextResponse.json({ success: true }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let spam = false;

    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant tasked with analyzing ICE sighting reports for credibility and relevance. Your job is to determine if a report should be added to the heatmap or marked as spam based on specific criteria.",
          },
          {
            role: "user",
            content:
              "Analyze the following ICE sighting report and determine if it should be added to the heatmap or marked as spam. Consider these criteria:\n\n" +
              "1. Location Verification: Does the place of arrest match with a location on the map?\n" +
              "2. Email Credibility: Is the email valid? Has this email been flagged as uncredible in the past?\n" +
              // "4. Raid Reason Credibility: Is the reason for the raid logical and consistent with past events?\n" +
              "5. Court Visit Reason: Does the reason for the court visit make sense and align with previous occurrences?\n" +
              "6. Completeness: Are there any missing fields of information?\n" +
              "Based on these criteria, provide a clear decision: either 'Add to Heatmap' or 'Mark as Spam'. Also, provide a brief explanation for your decision.\n\n" +
              "Here's the report to analyze:\n" +
              JSON.stringify(body),
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

    console.log(openAiResponse.data.choices[0].message, "AAA");
    spam = openAiResponse.data.choices[0].message.content
      .toLowerCase()
      .includes("spam")
      ? true
      : false;

    console.log(spam, "HAHAHAHAHAHA");

    // --- Database Operations ---
    try {
      let user = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (!user) {
        // User doesn't exist, create a new user
        user = await prisma.users.create({
          data: {
            email: body.email,
          },
        });
        console.log("Created new user:", user);
      }

      // Create input form
      await prisma.input_form.create({
        data: {
          user_id: user.uuid,
          location: body.placeOfArrest, // Consider formatting as needed
          description: body.description,
          report_date: new Date(body.dateOfArrest).toISOString(),
          a_number: body.arrestNumber,
          reason_for_visit: body.reasonForCourtVisit,
          time_held: body.timeHeldBeforeICE,
          additional_info: body.additionalInfo,
          spam: spam,
          immigration_status: body.immigrationStatus,
          under_ice_monitoring: body.iceMonitoring.toLowerCase().includes("yes")
            ? true
            : false,
          how_ice_found_out: body.reasonForRaid,
          latitude: body.latitude,
          longitude: body.longitude,
        },
      });
      console.log("Inserted form");
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 }); // IMPORTANT: Return an error response!
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();

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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    // Insert into database
    const user = await prisma.users.delete({
      where: {
        email: body.email,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("No Such User:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
