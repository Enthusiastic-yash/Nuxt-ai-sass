import { db } from "~~/server/utils/drizzle"
import { userApiLimit } from "~~/server/db/schema"
import { eq } from "drizzle-orm"
import {maxCount} from "~~/shared/utils/user-api-limit"
import { getPolarCustomerState } from "../services/polar"
export const getUserFreeTrialStatus  = async (userId : string) =>{
    const apiLimit  = await db.query.userApiLimit.findFirst({
        where: eq(userApiLimit.userId, userId)
    })

    if(!apiLimit || apiLimit.count < maxCount){
        return true
    }
    return false;
} 

export const getUserProStatus = async (userId : string) =>{
    const customer = await getPolarCustomerState(userId)
    return !!customer.activeSubscriptions[0]
}

export const validateUserStatus = async(userId : string) =>{
        const isFreeTrialExist = await getUserFreeTrialStatus(userId);
        const isPro = await getUserProStatus(userId)
        if(!isPro && !isFreeTrialExist){
            throw createError({
                statusCode: 403,
                statusMessage:'Free trial has expired. Please upgrade to pro.'
            })
        }
    return isPro;
}