import { getUserApiLimit } from "~~/server/services/user-api-limit";
import {getCustomerPortalUrl , getPolarCustomerState} from "~~/server/services/polar"

export default defineAuthenticatedEventHandler(async(event) =>{
    const userApiLimit = await getUserApiLimit(event.context.user.id)
    const customerPortalUrl = await getCustomerPortalUrl(event.context.user.id)
    const customerState = await getPolarCustomerState(event.context.user.id)
    const subscription =    customerState.activeSubscriptions[0]
    return {
        userApiLimit , customerPortalUrl ,subscription
    }
})