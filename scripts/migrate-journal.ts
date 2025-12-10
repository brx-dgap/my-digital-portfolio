import { journalEntries } from "../lib/journal-schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migration complete");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
