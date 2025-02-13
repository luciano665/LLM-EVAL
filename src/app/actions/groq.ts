

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * Unified function call to the Groq API for both models (mixtral and llmJudge-llama)
 */
export default async function callGroq(prompt:string, judge: boolean = false) {
    try{
        const response = await fetch(`${BASE_URL}/api/groq_models`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({prompt, judge}), //Send 'judge' falg to decide model usage
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Groq API error", error);
        throw error;
    }
    
}