import {drizzle} from 'drizzle-orm/neon-http';
import {neon} from '@neondatabase/serverless';
import {migrate} from 'drizzle-orm/neon-http/migrator';
import {config} from "dotenv";

// Load envirioment varaibles (DB connections seetings)
config({path: '.env'})

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

/**
 * Runs DB migrations
 * 
 * Migrations ensure schema changes are applied in a controlled way
 * Without having data-lekeage
 */

const main = async () => {
    try{
        await migrate(db, {migrationsFolder: 'drizzle'}); //Run migrations
        console.log("Migrations completed ✅");
    } catch (error) {
        console.error("Error while running migrations", error);
        process.exit(1); // Exits process on failure
    }
}

main();