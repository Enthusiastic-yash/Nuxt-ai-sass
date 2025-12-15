/// <reference types="node" />
import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.NUXT_TURSO_DATABASE_URL!,
  },
})
