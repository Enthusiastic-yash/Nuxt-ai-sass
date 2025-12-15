import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "~~/server/db/schema"

const { tursoDataBaseUrl, tursoAuthToken, public: { appEnv } } =
  useRuntimeConfig()

const client = createClient({
  url: tursoDataBaseUrl,
  authToken: appEnv === "production" ? tursoAuthToken : undefined,
})
export const db = drizzle(client, { schema })

