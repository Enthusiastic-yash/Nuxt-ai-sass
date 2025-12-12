import { getUserApiLimit } from "~~/server/services/user-api-limit";


export default defineAuthenticatedEventHandler(async(event) =>{
    const userApiLimit = await getUserApiLimit(event.context.user.id)
    return {
        userApiLimit
    }
})