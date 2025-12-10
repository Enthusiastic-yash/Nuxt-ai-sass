import type { User } from "better-auth";
import { getAuthSession } from "~~/server/services/better-auth";
import type { H3Event, H3EventContext } from "h3";

type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: User;
  };
};

export function defineAuthenticatedEventHandler<T>(
  handler: (event: AuthenticatedEvent) => T | Promise<T>
) {
  return defineEventHandler(async (event) => {

    const session = await getAuthSession(event);

    if (!session?.user) {
      throw createError({ status: 401, statusMessage: "Unauthorized" });
    }

    (event as AuthenticatedEvent).context.user = session.user;

    return handler(event as AuthenticatedEvent);
  });
}
