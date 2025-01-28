import "dotenv/config";
import {z} from "zod";


//Schema for env variables
const envSchema = z.object({
    GRQQ_API: z.string(),
    GOOGLE_API_KEY: z.string(),
    OPENAI_KEY: z.string(),
    DEEPSEEK_KEY: z.string(),
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    NEXT_PUBLIC_APP_URL: z.string()
});

// Function to validate enviriometn varibales
const validation = () => {
    try{
        console.log("Validating the ENV keys")
        const env = {
            GROQ_API_KEY: process.env.GROQ_API_KEY,
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: process.env.DATABASE_URL,
            NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        };
        console.log("Successfull validation.")
        const parsed = envSchema.parse(env);
        return parsed;
    } catch(error) {
        if (error instanceof z.ZodError){
            const missing = error.errors.map(err => err.path.join("."));
            throw new Error(
                `Invalid variable: ${missing.join(
                    ","
                )}. Check env file`
            );
        }
        throw error;
    }
}

export const env = validation();
