import OpenAI from "openai";
const runtimeConfig = useRuntimeConfig();
export const  openai = new OpenAI({
    apiKey: runtimeConfig.geminiApi,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});





