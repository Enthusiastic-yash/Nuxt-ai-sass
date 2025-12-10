import { openai } from "~~/server/utils/openai";

export default defineEventHandler(async (event) =>{

    const { blogTitle , blogCategory }  = await readBody(event)
    if(!(blogTitle && blogCategory)){
        throw createError({
            status : 400,
            statusMessage:'Blog title and category required.'
        })
    }
    const prompt = `Generate a blog title for the keywords  ${blogTitle} with in given category ${blogCategory}`
    const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
   messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.5,
    max_completion_tokens : 500

});
return response.choices[0].message.content;
})