export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/foo",
        component: resolve(__dirname, "pages/foo.vue")
      });
    }
    // 全局配置中间件
    // middleware: ['auth']
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  proxy: {
    "/api": "http://localhost:8080"
  }
};
