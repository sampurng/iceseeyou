// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { messages } = await request.json();
  if (!messages) {
    return NextResponse.json(
      { error: "Missing 'messages' in request body" },
      { status: 400 }
    );
  }

  try {
    const openAiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: ` Bearer ${process.env.OPEN_AI_KEY}`, // stored in .env.local
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // or "gpt-3.5-turbo"
          messages,
        }),
      }
    );

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      return NextResponse.json(
        { error: errorText },
        { status: openAiResponse.status }
      );
    }

    const data = await openAiResponse.json();
    // Typically, data.choices[0].message.content is the bot's reply
    const reply = data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
