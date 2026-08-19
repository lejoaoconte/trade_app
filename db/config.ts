import "dotenv/config";

export const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
};

export function getConnectionString(): string {
  const { host, port, user, password, database } = dbConfig;
  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}
