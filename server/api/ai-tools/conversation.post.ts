import { openai } from "~~/server/utils/openai";
import { incrementApiLimit } from "~~/server/services/user-api-limit";
import {validateUserStatus} from "~~/server/utils/validate-user"
export default defineAuthenticatedEventHandler(async (event) =>{
    const { message }  = await readBody(event)
    if(!message){
        throw createError({
            status : 400,
            statusMessage:'Message is required.'
        })
    }
    const isPro = await validateUserStatus(event.context.user.id)
    const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
   messages: [
        { role: "system", content: "You are a helpful assistant." },
           ...message
    
    ],
    temperature : 0.5,
    max_completion_tokens : 500,

});
if(!isPro){
    await incrementApiLimit(event.context.user.id)
}
return response.choices[0].message.content;
})