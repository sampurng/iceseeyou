import { Pool } from "pg";

const connectionString = process.env.SUPABASE_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("Missing database connection string");
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Required for cloud-hosted databases
});

export const query = async (text: string, params: any) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};
