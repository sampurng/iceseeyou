"use client";

import { josefinSans } from "@/app/Components/Header";
import React, { useState, FormEvent } from "react";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  // Our conversation array
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "You are a helpful AI assistant that can answer questions about ICE, immigration, or other general queries.",
    },
    {
      role: "assistant",
      content: "Hello! Ask me anything about ICE or related topics.",
    },
  ]);

  const [userInput, setUserInput] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user message to the local conversation
    const newUserMessage: ChatMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to call /api/chat");
      }

      const data = await res.json();
      // The assistant's reply
      const aiReply: ChatMessage = {
        role: "assistant",
        content: data.reply,
      };

      // Add AI reply to the conversation
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("Chat error:", err);
      // Add an error message as an assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn’t process your request. Please try again.",
        },
      ]);
    }
  }

  return (
    <div className="border-2 border-black">
      <div
        className={`${josefinSans.className} text-[100px] flex justify-center items-center w-full p-32`}
      >
        Legal Advice for when you face ICE
      </div>
      <div className="border p-2 mx-64 bg-black  shadow-md">
        <div className="mb-4 h-[500px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.role === "user" ? "You" : "AI"}: </strong>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <input
            className="flex-1 border-black border-2 bg-[#262626] p-2 rounded-sm"
            placeholder="Type your question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r hover:bg-[#262626] hover:border-white rounded-lg h-16 mx-4"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
