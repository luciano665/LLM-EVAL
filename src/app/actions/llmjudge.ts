/**
 * Evaluates responses from multiple LLM models
 * 1. Calling each model's API to retreive responses
 * 2. Building a compsite prompt for impartial judging
 * 3. Parsing judge repsonse to extract scores
 * 4. Compute cosine similarity between each response and expected answer
 * 5. Detecting task type
 * 
 * @param testQuestion -> the question for which responses are being evaluated
 * @param expectedAnswer -> Espected answer to compare model responses
 * @returns An object contioaning teh conlusionm scores per model and task type
 */

import callGroq from "./groq";
import callDeepSeek from "./deepseek";
import callGemini from "./gemini";
import callOpenAi from "./openai";
import { consineSimilarity } from "@/utils/cosineSimilarity";
import { detectTaskType } from "@/utils/detectTask";
import { textToVector } from "@/utils/textToVector";
import {Score} from "@/types/evaluation";
import { calculateScores } from "@/utils/calculateScores";


export async function llmJudge(
    testQuestion: string,
    expectedAnswer: string
): Promise<{
    conclusion: string;
    scores: {[modelName:string]: Score};
    taskType: "factual" | "creative" | "analytical" ;
}> {
    // Fetch responses from all APIs:
        // - OpenAI, DeepSeek, Gemini, and Mixtral
    const [openaiRes, groqRes, geminiRes, deepseekRes] = await Promise.all([
        callOpenAi(testQuestion),
        callGroq(testQuestion),
        callGemini(testQuestion),
        callDeepSeek(testQuestion),

    ])

    //Assemble the responses into an Object where keys are model names
    const responses: {[modelName: string]: string} = {
        OpenAI: openaiRes.content,
        Mixtral: groqRes.content,
        Gemini: geminiRes.text,
        DeepSeek: deepseekRes.content,
    };

    //Build the composite prompt of the Judge
    // The prompr instructs the judge to evaluae each response based on sveral metrics
    // Each model's response is listed to ensure fair evaluation
    let responsesText = "";
    for(const [model, answer] of Object.entries(responses)){
        responsesText += `- ${model}: "${answer}"\n`;
    }

    //Judge prompt:
    const judgePrompt = `
    You are an impartial judge evaluating AI responses. Compare the following responses to the question:
    Question: "${testQuestion}"
    ${expectedAnswer ? `Expected Answer: "${expectedAnswer}"` : "No expected answer provided."}

    Responses to evaluate:
    ${responsesText}

    Evaluate each response on a scale of 1-10 for these criteria:
    - Closeness (how well it matches the expected answer)
    - Helpfulness (addresses the user's need)
    - Relevance (directness of answer)
    - Accuracy (factual correctness)
    - Depth (detail and explanation)
    - Creativity (innovation and added value)
    - Conciseness (clarity and brevity)

    Provide your evaluation in the following format for each response:

    [Model Name] Scores:
    Closeness: [number]
    Helpfulness: [number]
    Relevance: [number]
    Accuracy: [number]
    Depth: [number]
    Creativity: [number]
    Conciseness: [number]

    Finally, provide a brief conclusion (max 100 words) as:
    "Conclusion: [your analysis]"

    `;


    const judgeData = await callGroq(judgePrompt, true);
    const judgeText = judgeData.judgeResponse;
    if(!judgeText) {
        throw new Error("Judge response missing");
    }

    // Parse of judge response uisng the seprated score function calculation
    const parsedScores = calculateScores(judgeText);

    //Compute the cosine similarity for each model response to expected response
    const expectedVector = await textToVector(expectedAnswer);
    for(const model in responses) {
        const responseVector = await textToVector(responses[model]);
        const similarity = consineSimilarity(expectedVector, responseVector);
        if(parsedScores[model]) {
            parsedScores[model].consineSimilarity = similarity;
        } else {
            parsedScores[model] = {
                accuracy: 0,
                creativity: 0,
                consineSimilarity: similarity,
                relevance: 0,
                conciseness: 0,
                helpfulness: 0,
                depth: 0,
            };
        }
    }

    // Extract teh conlsusion from the judge's text. Should start with "Conclusion.."
    const conslusionMatch = judgeText.match(/conclusion:\s*(.+)$/i);
    const conclusion = conslusionMatch
        ? conslusionMatch[1].trim()
        : "No conlusion provided"

    //Determine the teak type
    const taskType = detectTaskType(testQuestion);


    //Return the conlusion, model scores and task type
    return {
        conclusion,
        scores: parsedScores,
        taskType,
    };
}