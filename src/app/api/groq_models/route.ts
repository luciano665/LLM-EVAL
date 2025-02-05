import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { error } from "console";


const groq = new Groq({
    apiKey: process.env.GROQ_API,
});

export async function POST(req: Request){
    try{
        const body = await req.json();
        const {prompt} = body;

        if(!prompt) {
            return NextResponse.json(
                {error: "Prompt must be provided"},
                {status: 400},
            );
        }
        const startTime = Date.now();
        const response = await groq.chat.completions.create({
            model: "mixtral-8x7b-32768",
            messages: [
                {role: "system", content: "You hare a helpful assitant"},
                {role: "user", content: prompt}
            ]
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(
            "Llama response time: ", 
            new Date(startTime).toISOString(),
            responseTime
        );

        return NextResponse.json({
            content: response.choices[0]?.message.content,
            responseTime
        });

    } catch(error){
        console.error("Error while calling API (GROQ)", error);
        throw new Error("Failed call groq API")
    }
}
