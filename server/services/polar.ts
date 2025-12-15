import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
const {polarAccessToken , polarProductId , polarWebhookSecret , polarServer} = useRuntimeConfig()
const polarClient = new Polar({
  accessToken: polarAccessToken,
  server: polarServer as 'sandbox' | 'production',
});

export const setupPolar = () =>  polar ({
  
    client: polarClient,
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

