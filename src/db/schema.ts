
import { text, pgTable, serial, real} from "drizzle-orm/pg-core";

/**
 * Table: experiments_table
 * 
 * Stores details about AI test experiments, including:
 * - `systemPrompt`: The initial instruction given to the model.
 * - `testQuestion`: The question being tested.
 * - `expectedAnswer`: The expected correct answer.
 */

export const experiments = pgTable('experiments-table', {
    id: serial('id').primaryKey(),
    systemPrompt: text('system_prompt').notNull(),
    testQuestion: text('test_question').notNull(),
    answerExpected: text('expected_answer').notNull(),
});

export const scores = pgTable('score_data', {
    id: serial('id').primaryKey(),
    openAiScore: real('openai_score').notNull(),
    gemminiScore: real('gemenis_score').notNull(),
    deepseekScore: real('deepseek_score').notNull(),
    llamaScore: real('llama_score').notNull(),
    mixtralScore: real('mistral_score').notNull(),
    conclusion: text('conclusion').notNull().default('No conclusion provided.')
});

export const speed = pgTable('speed_data', {
    id: serial('id').primaryKey(),
    openAiSpeed: real('openai_speed').notNull(),
    gemminiSpeed: real('gemenis_speed').notNull(),
    deepseekSpeed: real('deepseek_speed').notNull(),
    llamaSpeed: real('llama_speed').notNull(),
    mixtralSpeed: real('mistral_speed').notNull(), 
});