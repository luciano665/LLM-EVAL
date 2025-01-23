/* eslint-disable */

import { Meera_Inimai } from "next/font/google";

// Check if the cide is running on the server ir the client
const isServer = typeof window === "undefined";

// A flexible, enviroment-aware Logger class for structured logging
export class Logger {
    // Context of the logger 
    private context: string;

    // Flag indicatinf wheter the logger is running in a server context
    private isServerContext: boolean;

    // ANSI color codes for enhanced server-side log visibility
    private colors = {
        reset: "\x1b[0m",
        red: "\x1b[31m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        gray: "\x1b[90m",
        bold: "\x1b[1m",
        magenta: "\x1b[35m",
    };

    // Constructor to initialize the logger with a specific context
    constructor(context: string){
        this.context = context;
        this.isServerContext = isServer;
    }

    // Determines if logging is enabled based in the enviroment
    private shouldLog(): boolean {
        // Always allow logging on the server for observability
        if(this.isServerContext) return true;

        // On the client, restrict logging to development enviroments
        return process.env.NODE_ENV === "development";
    }

    // Formats a log message with timestamp, context, and optional data
    private formatMessage(level: string, message:string, data?: any) {
        const timestamp = new Date().toISOString(); // ISO format for consistency
        const enviroment = this.isServerContext ? "[SERVER]" : "[CLIENT]"; // Context-aware prefix
        const prefix = `${timestamp} ${enviroment} ${this.context}:`;
        return {prefix, message, ...(data && {data})}; // Includes optional data if present
    }

    // Applies ANSI color codes for better visibility on server-side logs
    private colorize(color: keyof typeof this.colors, text: string): string {
        // Colors are only applied in a server context to avoid browser inconsistencies
        if (!this.isServerContext) return text;
        return `${this.colors[color]} ${text} ${this.colors.reset}`;
    }

    // Formats the log level for structred log output ( INFO, ERROR, etc)
    private formatLogLevel(level:string): string {
        return `[${level.toUpperCase()}]`;
    }

    // Combined all log componets into a singlem redable string
    private formatOutput({
        prefix,
        message,
        data,
    }: {
        prefix:string;
        message: string;
        data?: any;
    }) {
        const logParts = [prefix, message]; // Start with the prefix and message
        if (data) {
            // Pretty-print optional data for better redability
            logParts.push("\n" + JSON.stringify(data, null, 2));
        }
        return logParts.join(" ");
    }

    // Logs informational messages, typically for high-level events
    info(message: string, data?:any) {
        if(!this.shouldLog()) return; // Skip logging if not allowed
        const formattedData = this.formatMessage("info", message, data);
        console.log(
            this.colorize("blue", this.formatLogLevel("info")) + 
            " " + this.formatOutput(formattedData)
        );
    }

    // Logs errors, capturing stack traces if available
    error(message:string, error?:Error | unknown, data?:any) {
        if(!this.shouldLog()) return;

        //Normalize error details for consistency
        const errorData =
            error instanceof Error
                ? {name: error.name, message: error.message, stack: error.stack}
                : error;
        
        const formattedData = this.formatMessage("error", message, {...data, error: errorData});

        console.error(
            this.colorize("red", this.colors.bold + this.formatLogLevel('error')) + 
            " " + this.formatOutput(formattedData)
        );
    }

    // Log debug messages, primarily for troubleshooting
    debug(message: string, data?:any){
        if(!this.shouldLog()) return;
        const formattedData = this.formatMessage("debug",  message, data);
        console.debug(
            this.colorize('gray', this.formatLogLevel("debug")) + 
            " " + this.formatOutput(formattedData)
        );
    }

    // Logs custom server-side actions, distict from standart log levels
    action(message:string, data?:any){
        if (!this.shouldLog()) return;
        const formattedData = this.formatMessage("action", message, data);
        console.log(
            this.colorize("magenta", this.formatLogLevel("action")) + 
            " " + this.formatOutput(formattedData)
        );
    }




}