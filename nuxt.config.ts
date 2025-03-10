// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/sanity"],
  sanity: {
    projectId: "vnlojsro",
  },
  runtimeConfig: {
    public: {
      base_url: process.env.VUE_APP_BASE_URL,
      accessToken: process.env.VUE_APP_ACCESS_TOKEN,
    },
  },
});