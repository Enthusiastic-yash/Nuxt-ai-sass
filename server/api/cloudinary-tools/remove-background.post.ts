import type { UploadApiResponse , UploadApiErrorResponse  } from 'cloudinary'
// import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import { connectCloudinary } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('image') as File | null

  if (!file) {
    throw createError({
      statusCode: 400,
      message: 'No image provided',
    })
  }

  // File → Buffer conversion
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const cloud =  connectCloudinary()
  const uploadFromBuffer = ():Promise<UploadApiResponse> =>{
   return new Promise((resolve , reject) =>{
       const uploadStream = cloud.uploader.upload_stream({
        transformation:[
          {
            effect: "background_removal",
            background_removal : 'remove_the_background'
          }
        ],
        folder :'bg-removed'
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
  return result.secure_url
})