import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API
})

/**
 * Async function to call the Groq api models 
 * Will be using to call a model to be evaluated and one will be acting the LLM-Judge
 * */ 
export async function getGroqResponse() {
    
}