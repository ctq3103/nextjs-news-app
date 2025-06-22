import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { logger: true });

export { db };
