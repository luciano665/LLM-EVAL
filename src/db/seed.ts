import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { experiments, scores, speed } from './schema';
import { config } from 'dotenv';

// Load enviriometn variables
config({path: '.env'});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

/**
 * Inserts default records into the database to have some baseline tets data
 * 
 * This is for debugging purpose, ensuring queries work correctly before running evals
 */

async function seed() {
    await db.insert(experiments).values([
        {
            systemPrompt: "You are a helpful assintant",
            testQuestion: "What is the capital of France",
            answerExpected: "Paris", 
        },
    ]);

    await db.insert(speed).values([
        {
            gemminiSpeed: 0,
            mixtralSpeed: 0,
            openAiSpeed: 0,
            deepseekSpeed: 0,
            llamaSpeed: 0,
        },
    ]);

    await db.insert(scores).values([
        {
            mixtralScore: 0,
            gemminiScore: 0,
            openAiScore: 0,
            deepseekScore: 0,
            conclusion: "No conclusion provided",
        },
    ]);
}

/**
 * Runs the seeding process and exits on failure
 */

async function main() {
    try {
        await seed();
        console.log("Seeding completed ✅");
    } catch (error) {
        console.error("Error during seeding", error);
        process.exit(1);
    }
    
}

main();