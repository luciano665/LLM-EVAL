import { NextResponse } from "next/server";
import OpenAI from "openai";

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {prompt} = body;

        if (!prompt) {
            return NextResponse.json(
                {error: "Prompt must be provided"},
                {status: 400},
            )
        }

        const startTime = Date.now();
        const response = await openAI.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {role: "system", content: "You are a helpful assistant"},
                {role: "user", content: prompt},
            ],
            temperature: 0.0,
            max_tokens: 10000,
        })

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        console.log(
            "OpenAI gpt-4o response time:",
            new Date(startTime).toISOString(),
            responseTime
        );

        return NextResponse.json({
            message: response.choices[0].message,
            responseTime
        });
    } catch(error) {
        console.error("OpenAI API error call: ", error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}

