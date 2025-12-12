import { requireAuth } from "../services/better-auth";

export default defineEventHandler(async(event) =>{
    const protectedRoutes = ['/api/ai-tools' , '/api/cloudinary-tools' , '/api/user'];

    const needAuth = protectedRoutes.some(p => event.path === p || event.path.startsWith(p + "/"));
    if(needAuth){
        await requireAuth(event)
    }
})