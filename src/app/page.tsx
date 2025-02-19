"use client";

import { useState } from "react";
import PromptArea from "@/components/ui/PromptArea";
import ResponseArea from "@/components/ui/ResponseArea";
import SubmitButton from "@/components/ui/SubmitButton";
import callOpenAi from "@/app/actions/openai";
import callDeepSeek from "@/app/actions/deepseek";
import callGemini from "@/app/actions/gemini";
import callGroq from "@/app/actions/groq";

export default function Home() {
  // Three prompt inputs:
  // 1. System Prompt (optional)
  // 2. Test Question (required)
  // 3. Expected Answer (optional)
  const [systemPrompt, setSystemPrompt] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");

  // Five response areas with response times:
  const [openAIResponse, setOpenAIResponse] = useState("");
  const [openAIResponseTime, setOpenAIResponseTime] = useState<number | null>(
    null
  );

  const [deepSeekResponse, setDeepSeekResponse] = useState("");
  const [deepSeekResponseTime, setDeepSeekResponseTime] = useState<
    number | null
  >(null);

  const [geminiResponse, setGeminiResponse] = useState("");
  const [geminiResponseTime, setGeminiResponseTime] = useState<number | null>(
    null
  );

  const [mixtralResponse, setMixtralResponse] = useState("");
  const [mixtralResponseTime, setMixtralResponseTime] = useState<number | null>(
    null
  );

  const [judgeResponse, setJudgeResponse] = useState("");
  const [judgeResponseTime, setJudgeResponseTime] = useState<number | null>(
    null
  );

  // Global loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!testQuestion.trim()) return;
    setIsLoading(true);

    // Reset previous responses and times
    setOpenAIResponse("");
    setOpenAIResponseTime(null);
    setDeepSeekResponse("");
    setDeepSeekResponseTime(null);
    setGeminiResponse("");
    setGeminiResponseTime(null);
    setMixtralResponse("");
    setMixtralResponseTime(null);
    setJudgeResponse("");
    setJudgeResponseTime(null);

    try {
      const responses = await Promise.all([
        callOpenAi(testQuestion).then((res) => res),
        callDeepSeek(testQuestion).then((res) => res),
        callGemini(testQuestion).then((res) => res),
        callGroq({
          model: "mixtral-8x7b-32768",
          systemPrompt,
          testQuestion,
          expectedAnswer,
        }).then((res) => res),
        callGroq({
          model: "mixtral-8x7b-32768",
          systemPrompt,
          testQuestion,
          expectedAnswer,
          judge: true,
        }).then((res) => res),
      ]);

      setOpenAIResponse(responses[0].content);
      setOpenAIResponseTime(responses[0].responseTime);

      setDeepSeekResponse(responses[1].content);
      setDeepSeekResponseTime(responses[1].responseTime);

      setGeminiResponse(responses[2].text);
      setGeminiResponseTime(responses[2].responseTime);

      setMixtralResponse(responses[3].content);
      setMixtralResponseTime(responses[3].responseTime);

      setJudgeResponse(responses[4].content);
      setJudgeResponseTime(responses[4].responseTime);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-100">
      {/* Prompt Input Section */}
      <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
        {/* System Prompt (Optional) */}
        <div>
          <h3 className="text-sm font-semibold mb-1">
            System Prompt (Optional)
          </h3>
          <PromptArea
            value={systemPrompt}
            onChange={setSystemPrompt}
            placeholder="Enter system prompt (optional)"
          />
        </div>
        {/* Test Question with Integrated Submit Button */}
        <div>
          <h3 className="text-sm font-semibold mb-1">Prompt</h3>
          <div className="relative">
            <PromptArea
              value={testQuestion}
              onChange={setTestQuestion}
              placeholder="Enter your question here..."
            />
            <SubmitButton
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
        {/* Expected Answer (Optional) */}
        <div>
          <h3 className="text-sm font-semibold mb-1">
            Expected Answer (Optional)
          </h3>
          <PromptArea
            value={expectedAnswer}
            onChange={setExpectedAnswer}
            placeholder="Enter expected answer (optional)"
          />
        </div>
      </div>

      {/* Chat Response Section */}
      <div className="flex-grow w-full max-w-6xl mx-auto p-4">
        {/* Arrange each response block as a tall column (side by side) */}
        <div className="grid grid-cols-5 gap-6">
          <ResponseBlock
            title="GPT-4 (OpenAI)"
            titleColor="text-green-600 bg-green-400/50"
            response={openAIResponse}
            responseTime={openAIResponseTime}
            isLoading={isLoading}
          />
          <ResponseBlock
            title="DeepSeek"
            titleColor="text-blue-600 bg-blue-400/50"
            response={deepSeekResponse}
            responseTime={deepSeekResponseTime}
            isLoading={isLoading}
          />
          <ResponseBlock
            title="Gemini"
            titleColor="text-violet-600 bg-violet-400/50"
            response={geminiResponse}
            responseTime={geminiResponseTime}
            isLoading={isLoading}
          />
          <ResponseBlock
            title="Mixtral"
            titleColor="text-orange-600 bg-orange-400/50"
            response={mixtralResponse}
            responseTime={mixtralResponseTime}
            isLoading={isLoading}
          />
          <ResponseBlock
            title="Judge"
            titleColor="text-gray-600 bg-gray-400/50"
            response={judgeResponse}
            responseTime={judgeResponseTime}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

const ResponseBlock = ({
  title,
  titleColor,
  response,
  responseTime,
  isLoading,
}: {
  title: string;
  titleColor: string;
  response: string;
  responseTime: number | null;
  isLoading: boolean;
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-md min-h-[500px] flex flex-col">
      <h3
        className={`inline-block px-4 py-1 text-sm font-semibold text-left ${titleColor} rounded-full mb-2`}
      >
        {title} {responseTime !== null ? `(${responseTime}ms)` : ""}
      </h3>
      <div className="flex-grow min-h-[400px]">
        <ResponseArea value={response} isLoading={isLoading} />
      </div>
    </div>
  );
};
