import { openai } from "~~/server/utils/openai";
import { incrementApiLimit } from "~~/server/services/user-api-limit";
import {validateUserStatus} from "~~/server/utils/validate-user"

export default defineAuthenticatedEventHandler(async (event) =>{
    const { articleTitle , articleLength }  = await readBody(event)
    if(!articleTitle){
        throw createError({
            status : 400,
            statusMessage:'Article title is required.'
        })
    }
       const isPro = await validateUserStatus(event.context.user.id)
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
if(!isPro){
    await incrementApiLimit(event.context.user.id)
}
return response.choices[0].message.content;
})