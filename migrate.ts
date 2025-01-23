import {drizzle} from "drizzle-orm/neon-http";
import {migrate} from "drizzle-orm/neon-http/migrator";
import {neon} from "@neondatabase/serverless";

// Read the Database connection string from envirioment 
// Sensitivity ensured for the credentials
const connectionString = process.env.DATABASE_URL;

// Validation of connection string
if(!connectionString) {
    throw new Error("DATABASE_URL enviroment variable is not properly set");
}

// Initialize connection to DB
// Using Neon serverless driver from efficient connection pooling
const sql = neon(connectionString);
const db = drizzle(sql);

// Function to execute database migrations
async function main() {
    console.log("Running migrations... 💨");

    try {
        // Execute migrations from the specified folder
        // This ensures the Database schema is kept sync with appplication code
        await migrate(db, {migrationsFolder: "drizzle"});
        console.log("Migrations completed successfully ✅");
    } catch (error){
        // Log detailed error messages to facilitate debugging
        console.error("Error running migrations:", error);

        // Exit with non-zero status code to signal failure in CI/CD pipelines
        process.exit(1)
    }

    // Exit process with a success status code
    process.exit(0);
}

// Immediately invoke the main function to kick off migration process
main();