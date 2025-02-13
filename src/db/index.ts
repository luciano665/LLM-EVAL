"use server"

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { scores, speed, experiments } from './schema';


//Load enviriometn variables
config({path: '.env'});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

/**
 * Inserts model evaluation scores to the DB
 * 
 * All the scores of all models to be evaluated as well as the LLMJudge conclusion
 */

export async function feedScore(
    mixtralScore: number,
    gemminiScore: number,
    openAiScore: number,
    deepseekScore: number,
    conclusion: string) {
    
    try {
        await db.insert(scores).values({
            mixtralScore,
            gemminiScore,
            openAiScore,
            deepseekScore,
            conclusion,
        });
        console.log("Score data inserted correclty into DB ✅");
    } catch (error) {
        console.error("Error while inserting score data", error);
        throw error;
    }   
}

/**
 * Insert model response times into the DB
 */

export async function feedSpeed(
    mixtralSpeed: number, 
    gemminiSpeed: number, 
    openAiSpeed: number, 
    deepseekSpeed: number,
    llamaSpeed: number
) {
    try {
        await db.insert(speed).values({
            mixtralSpeed,
            gemminiSpeed,
            openAiSpeed,
            deepseekSpeed,
            llamaSpeed
        });
        console.log("Response time data inserted correctly into DB ✅")
    } catch (error) {
        console.error("Error while inserting response time data", error);
        throw error;
    }
}


/**
 * Inserts a new AI experiment into the Database
 */

export async function feedExperiment(systemPrompt: string, testQuestion: string, answerExpected:string) {
    try{
        await db.insert(experiments).values({
            systemPrompt,
            testQuestion,
            answerExpected
        });
        console.log("Experiment data inserted correctly into DB ✅");
    } catch (error) {
        console.error("Error while inserting experiment into DB", error);
        throw error;
    }
    
}
