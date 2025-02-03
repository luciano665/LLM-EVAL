import Groq from "groq-sdk";
import { consineSimilarity } from "./cosineSimilarity";

//Init Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API
})



//Interface for scores
interface Score {
    accuracy: number;
    creativity: number;
    consineSimilarity: number;
    relevance: number;
    conciseness: number;
    helpfulness: number;
    depth: number;
}




/**
 * Function to call the Groq model response as to be the LLM judge
 */