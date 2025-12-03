import { auth } from "~~/server/services/better-auth";

export default defineEventHandler((event) => {
    return auth.handler(toWebRequest(event));
});