import { requireAuth } from "~~/server/services/better-auth";
import { openai } from "~~/server/utils/openai";

export default defineEventHandler(async (event) =>{
    await requireAuth(event)
    const { articleTitle , articleLength }  = await readBody(event)
    if(!articleTitle){
        throw createError({
            status : 400,
            statusMessage:'Article title is required.'
        })
    }
    const prompt = `Write an article on ${articleTitle} with in given length ${articleLength ? articleLength : 500 }`
    const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
   messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.5,
    max_completion_tokens : articleLength ? articleLength : 500

});
return response.choices[0].message.content;
})