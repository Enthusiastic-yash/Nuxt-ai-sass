import { openai } from "~~/server/utils/openai";

export default defineEventHandler(async (event) =>{
    const { message }  = await readBody(event)
    if(!message){
        throw createError({
            status : 400,
            statusMessage:'Message is required.'
        })
    }
    const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        { role: "system", content: "You are a code generator. you must have to answer only in markdown code snippets." },
        {
            role: 'user',
            content : message
        }
    ],
    temperature : 0.5

});
return response.choices[0].message.content;
})