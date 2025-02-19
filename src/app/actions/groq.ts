const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface GroqParams {
  model: string;
  systemPrompt: string;
  testQuestion: string;
  expectedAnswer: string;
  judge?: boolean;
}

/**
 * Unified function call to the Groq API for both models (mixtral and llmJudge-llama)
 */
export default async function callGroq(params: GroqParams) {
    try{
        const response = await fetch(`${BASE_URL}/api/groq_models`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Groq API error", error);
        throw error;
    }
    
}