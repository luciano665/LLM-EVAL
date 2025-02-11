import { NextResponse } from "next/server";
import Groq from "groq-sdk";


const groq = new Groq({
    apiKey: process.env.GROQ_API,
});

export async function POST(req: Request){
    try{
        const body = await req.json();
        const {prompt, judge} = body;

        if(!prompt) {
            return NextResponse.json(
                {error: "Prompt must be provided"},
                {status: 400},
            );
        }
        const startTime = Date.now();
        const [responseModel, responseJudge ]= await Promise.all([ groq.chat.completions.create({
            model: "mixtral-8x7b-32768",
            messages: [
                {role: "system", content: "You hare a helpful assitant"},
                {role: "user", content: prompt}
            ]
        }),
        judge
            ? groq.chat.completions.create({
                model: "llama3-70b-8192",
                messages: [
                    {role: "system", content: "You are an impartial AI judge evaluating chatbot responses." },
                    {role: "user", content: prompt}
                ],
            })
            : null,
        ]);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        console.log(
            judge ? "Groq Judge (Llama3) response time:" : "Groq Model (Mixtral) response time:",
            new Date(startTime).toISOString(),
            responseTime
        );

        return NextResponse.json({
            modelResponse: responseModel.choices[0].message,
            judgeResponse: responseJudge ? responseJudge.choices[0].message : null,
            responseTime
        });

    } catch(error){
        console.error("Error while calling API (GROQ)", error);
        throw new Error("Failed call groq API")
    }
}
