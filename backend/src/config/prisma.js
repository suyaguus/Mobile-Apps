import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "suyaguus",
  database: "db_apps_finance",
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});
