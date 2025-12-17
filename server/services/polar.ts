import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
  const {polarAccessToken , polarProductId , polarWebhookSecret , polarServer} = useRuntimeConfig()
    const polarClient = () =>{
        return new Polar({
    accessToken: polarAccessToken,
    server: polarServer as 'sandbox' | 'production',
   
    });
    }
export const createPolarPlugin = () =>{
    return polar ({
         client: polarClient(),
        createCustomerOnSignUp: true,
         use: [
                    checkout({
                        products: [
                            {
                                productId: polarProductId,
                                slug: "pro-monthly"
                            }
                        ],
                        successUrl: "/",
                        authenticatedUsersOnly: true
                    }),
                     portal(),
                    usage(),
                    webhooks({
                        secret:polarWebhookSecret
                    })
                ]
    })
}
export const getPolarCustomerState = async (userId : string) =>{
    const polar = polarClient()
    const customerState = await polar.customers.getStateExternal({externalId : userId})
    return customerState;
}

export const getCustomerPortalUrl = async (userId : string) =>{
    const polar  = polarClient()
    const customerState = await polar.customerSessions.create({externalCustomerId : userId})
    return customerState;
}