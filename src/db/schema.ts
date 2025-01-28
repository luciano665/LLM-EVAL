
import { uuid, integer, text, boolean, pgTable, serial, real} from "drizzle-orm/pg-core";

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
    mistralScore: real('mistral_score').notNull(),
    conclusion: text('conclusion').notNull().default('No conclusion provided.')
});

export const speed = pgTable('speed_data', {
    id: serial('id').primaryKey(),
    openAiSpeed: real('openai_speed').notNull(),
    gemminiSpeed: real('gemenis_speed').notNull(),
    deepseekSpeed: real('deepseek_speed').notNull(),
    llamaSpeed: real('llama_speed').notNull(),
    mistralSpeed: real('mistral_speed').notNull(), 
});