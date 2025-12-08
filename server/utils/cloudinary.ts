import { v2 as cloudinary } from 'cloudinary';
const  {cloudinaryCloudName , cloudinaryApiKey , cloudinaryApiSecret} = useRuntimeConfig()

export const connectCloudinary = () =>{
     cloudinary.config({ 
        cloud_name: cloudinaryCloudName, 
        api_key: cloudinaryApiKey, 
        api_secret: cloudinaryApiSecret
    });
    return cloudinary;
}