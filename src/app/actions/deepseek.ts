const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function callDeepSeek(prompt: string) {
    try{
        const response = await fetch(`${BASE_URL}/api/deepseek`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({prompt}),
        })

        const {message, responseTime} = await response.json();
        return {content: message.content, responseTime}
    }catch (error) {
        console.error("DeepSeek API error", error);
        throw error;
    }
    
}