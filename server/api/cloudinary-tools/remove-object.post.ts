import type { UploadApiResponse , UploadApiErrorResponse  } from 'cloudinary'
import { effect } from 'vue'
// import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import { incrementApiLimit } from "~~/server/services/user-api-limit";
import { connectCloudinary } from '~~/server/utils/cloudinary'
import {validateUserStatus} from "~~/server/utils/validate-user"

export default defineAuthenticatedEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('image') as File | null
  const object = formData.get('object')

  if (!file) {
    throw createError({
      statusCode: 400,
      message: 'No image provided',
    })
  }
    const isPro = await validateUserStatus(event.context.user.id)
  // File → Buffer conversion
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const cloud =  connectCloudinary()
  const uploadFromBuffer = ():Promise<UploadApiResponse> =>{
   return new Promise((resolve , reject) =>{
       const uploadStream = cloud.uploader.upload_stream({
    
       },(error: UploadApiErrorResponse | undefined , result : UploadApiResponse | undefined) => {
        if(error  || !result){
          return reject(error || new Error('Upload Failed'))
        }
        resolve(result);
       })
        uploadStream.end(buffer)
      })
  }
  
  const result  = await uploadFromBuffer()
  const finalImageUrl = cloud.url(result.public_id, {
    transformation:[
       {
         effect : `gen_remove:${object}`
        }
    ],
       
    resource_type:'image',
  })
if(!isPro){
    await incrementApiLimit(event.context.user.id)
}
  return finalImageUrl
})