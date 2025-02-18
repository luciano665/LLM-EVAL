"use client";

import { useState, useEffect } from "react";
import PromptArea from "@/components/ui/PromptArea";
import ResponseArea from "@/components/ui/ResponseArea";
import SubmitButton from "@/components/ui/SubmitButton";
import callDeepSeek from "./actions/deepseek";
import callGroq from "./actions/groq";
import callOpenAi from "./actions/openai";
import callGemini from "./actions/gemini";
//DIALY COMMIT
export default function Home() {
  /**
   * Prompt area, will be using three of them
   *
   * 1. systemPrompt -> Optional
   * 2. TestPrompt (userPrompt)
   * 3. Expected asnwer
   */
  const [systemPrompt, setSystemPrompt] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");

  return (
    <div className="min-h-screen bg-[#000314] bg-gradient-to-b from-[#000314] to-[#000520] p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white/90">LLM EVAL</h1>
        </div>
      </main>
    </div>
  );
}
