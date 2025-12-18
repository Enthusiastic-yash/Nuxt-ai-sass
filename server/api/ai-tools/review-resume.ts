import { openai } from "~~/server/utils/openai";
import { extractText, getDocumentProxy } from "unpdf";
import { incrementApiLimit } from "~~/server/services/user-api-limit";
import {validateUserStatus} from "~~/server/utils/validate-user"

export default defineAuthenticatedEventHandler(async (event) =>{
  const formData = await readFormData(event)
  const file = formData.get('resume') as File
    if(!file){
        throw createError({
            status : 400,
            statusMessage:'No resume file is provided'
        })
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer =  Buffer.from(arrayBuffer) 

    // Load PDF from buffer
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    // Extract text from PDF
    const { text } = await extractText(pdf, { mergePages: true });
       const isPro = await validateUserStatus(event.context.user.id)
    const response = await openai.chat.completions.create({
  model: "gemini-2.5-flash",
   messages: [
    {
      role: "system",
      content: "You are a resume reviewer. Provide strengths, weaknesses, and improvements."
    },
    {
      role: "user",
      content: `Summarize this resume briefly:\n${text.slice(0, 8000)}`

    }
  ],
    temperature : 0.5,
    max_completion_tokens:3000

});
if(!isPro){
    await incrementApiLimit(event.context.user.id)
}
return response.choices[0].message.content;
})

