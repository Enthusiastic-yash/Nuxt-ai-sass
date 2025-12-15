import { db } from "~~/server/utils/drizzle"
import { userApiLimit } from "~~/server/db/schema"
import { eq } from "drizzle-orm"

/**
 * Increment API usage for a user
 */
export const incrementApiLimit = async (userId: string) => {
  const existing = await db.query.userApiLimit.findFirst({
    where: eq(userApiLimit.userId, userId),
  })

  if (existing) {
    await db
      .update(userApiLimit)
      .set({
        count: existing.count + 1,
        updatedAt: new Date(),
      })
      .where(eq(userApiLimit.userId, userId))
  } else {
    await db.insert(userApiLimit).values({
      id: crypto.randomUUID(),
      userId,
      count: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}

/**
 * Get current API usage for a user
 */
export const getUserApiLimit = async (userId: string) => {
  const existing = await db.query.userApiLimit.findFirst({
    where: eq(userApiLimit.userId, userId),
  })

  return existing?.count ?? 0
}
