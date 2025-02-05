import Groq from "groq-sdk";
import { consineSimilarity } from "./cosineSimilarity";
import { Score } from "../types/evaluation";
import { detectTaskType } from "./detectTask";
import { textToVector } from "./textToVector";


//Init Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API
})








/**
 * Function to call the Groq model response as to be the LLM judge
 */