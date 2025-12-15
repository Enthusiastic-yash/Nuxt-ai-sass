import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~~/server/utils/drizzle";
// import {setupPolar} from "~~/server/services/polar";
import type {H3Event} from "h3"
import { schema } from "~~/server/db/schema"

const {gitHubClientId , gitHubclientSecret ,googleClientId , googleClientSecret } = useRuntimeConfig()

export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
       schema,
    }),
    emailAndPassword: { 
        enabled: true, 
  }, 
   socialProviders: { 
    github: { 
      clientId: gitHubClientId, 
      clientSecret: gitHubclientSecret, 
    },
    google:{
      clientId : googleClientId,
      clientSecret:googleClientSecret
    }
  }, 
   account: {
     accountLinking: {
        enabled: true, 
    },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, 
    },
  },
 
 },
});

export const getAuthSession = async(event : H3Event) =>{
   const session = await auth.api.getSession({
        headers: event.headers,
    })
  return session
}

export const requireAuth = async(event : H3Event) =>{
  const session = await getAuthSession(event)
  if(!session){
   throw createError({
    statusCode : 401,
    statusMessage : 'Unauthorized'
   })
  }
  event.context.user = session.user
}