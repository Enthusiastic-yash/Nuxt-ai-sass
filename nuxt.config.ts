// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxtjs/mdc'],
  css: ['~/assets/css/main.css'],
   eslint: {
    config: {
      standalone: false,
    },
  },
  runtimeConfig:{
  tursoDataBaseUrl : process.env.NUXT_TURSO_DATABASE_URL,
  tursoAuthToken : process.env.NUXT_TURSO_AUTH_TOKEN,
  gitHubClientId:process.env.NUXT_GITHUB_CLIENT_ID,
  gitHubclientSecret:process.env.NUXT_GITHUB_CLIENT_SECRET,
  googleClientId:process.env.NUXT_GOOGLE_CLIENT_ID,
  googleClientSecret:process.env.NUXT_GOOGLE_CLIENT_SECRET,
  geminiApi:process.env.NUXT_GEMINI_API,
  cloudinaryCloudName:process.env.NUXT_CLOUDINARY_NAME,
  cloudinaryApiKey:process.env.NUXT_CLOUDINARY_API_KEY,
  cloudinaryApiSecret:process.env.NUXT_CLOUDINARY_API_SECRET,
  polarAccessToken:process.env.NUXT_POLAR_ACCESS_TOKEN,
  polarWebhookSecret:process.env.NUXT_POLAR_WEBHOOK_SECRET,
  polarServer:process.env.NUXT_POLAR_SERVER,
  polarProductId:process.env.NUXT_POLAR_PRODUCT_ID,

    public:{
      appEnv : process.env.NUXT_PUBLIC_APP_ENV
    }
  },

})