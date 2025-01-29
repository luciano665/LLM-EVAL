import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const gemeini = genAI.getGenerativeModel({model: "gemini-2.0-flash-exp"});

export async function POST(req: Request){
    try{
        const body = await req.json();
        const {prompt} = body;

        if(!prompt) {
            return NextResponse.json(
                {error: "Prompt must be provided"},
                {status: 400}
            )
        }

        const startTime = Date.now();
        const result = await gemeini.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
            generationConfig: {
                maxOutputTokens: 4196,
                temperature: 0.0,
            }
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        console.log(
            "Gemini response time:",
            new Date(startTime).toISOString,
            responseTime
        )

        return NextResponse.json({text: result.response.text(), responseTime});
    } catch (error) {
        
    }
}
