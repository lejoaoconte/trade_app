import fs from "fs";
import path from "path";
import pgp from "pg-promise";
import { getConnectionString } from "./config";

async function migrate(): Promise<void> {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  const connection = pgp()(getConnectionString());
  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf8");
      console.log(`Running migration: ${file}`);
      await connection.none(sql);
    }
    console.log("All migrations applied successfully.");
  } finally {
    await connection.$pool.end();
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
