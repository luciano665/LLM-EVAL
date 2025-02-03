import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_KEY,
})

export async function textToVector(text: string): Promise<number[]> {
    return embeddings.embedQuery(text);
}