import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schemas";
import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {
  schema,
  casing: "snake_case",
  logger: true,
});
