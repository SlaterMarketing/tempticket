import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let sqlInstance: ReturnType<typeof neon> | null = null;
let dbInstance: NeonHttpDatabase<typeof schema> | undefined;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sqlInstance) {
    sqlInstance = neon(process.env.DATABASE_URL);
  }
  return sqlInstance;
}

export function db(): NeonHttpDatabase<typeof schema> {
  if (!dbInstance) {
    dbInstance = drizzle(getSql(), { schema });
  }
  return dbInstance;
}

export { schema };
