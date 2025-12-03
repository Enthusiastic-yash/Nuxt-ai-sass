import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const  {tursoDataBaseUrl , tursoAuthToken , public:{appEnv}} = useRuntimeConfig()
const adapter = new PrismaLibSql({
  url: tursoDataBaseUrl,
  // authToken: appEnv == 'development' ? undefined :  tursoAuthToken,
   authToken: appEnv === 'production' ? tursoAuthToken : undefined,
})
export const prisma = new PrismaClient({ adapter })