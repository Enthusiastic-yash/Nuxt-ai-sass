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
    public:{
      appEnv : process.env.NUXT_PUBLIC_APP_ENV
    }
  }
})