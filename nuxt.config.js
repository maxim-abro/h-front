const axios = require("axios")

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'yandex-verification', content: '8f923e168571864e'},
      {name: 'google-site-verification', content: 'Ugejcci0-aD7mxPeHzRUrHpRoHx0C7C7AEOzXftcTVI'},
      {name: 'verify-admitad', content: '7f699afdb8'},
      {name: 'wmail-verification', content: 'a1ef8b92c390d31de577d80ab6860da6'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: '/apple-touch-icon.png'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      {rel: 'icon', type: 'image/x-icon', sizes: '120x120', href: '/favicon-120x120.ico'}
    ],
    script: [
      {
        src: "/js/yacontext.js"
      },
      {
        src: "https://yandex.ru/ads/system/context.js",
        async: true
      },
      {
        src: "/js/mobileAd.js"
      },
      {
        src: '/js/yndx.js',
        body: true
      },
      {
        src: '/js/google.js'
      }
    ]
  },

  loading: {
    color: '#FDB13C',
    height: '7px'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/axios.js'}
  ],

  serverMiddleware: [
    '~/middleware/redirect.js'
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-gtag'
  ],

  'google-gtag': {
    id: 'G-V6ZSLDKYV2'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', {alias: 'cookies'}],
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa'
  ],

  pwa: {
    meta: {
      title: 'za halyavoi',
      author: 'za-halyavoi',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    manifest: {
      name: 'za-halyavoi',
      short_name: 'halyava',
      lang: 'ru'
    },
    icon: {
      source: 'static/za-halyavoi.png',
      filename: 'za-halyavoi.png',
      purpose: 'maskable'
    }
  },

  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faHouse', 'faHeart', 'faBraille', 'faNewspaper', 'faArrowDownAZ', 'faMoon', 'faSun', 'faCrown',
        'faMagnifyingGlass', 'faFire', 'faCheck', 'faDog', 'faGamepad', 'faShirt', 'faSpa', 'faCar', 'faStore',
        'faPlaneArrival', 'faClockRotateLeft', 'faMobileScreenButton', 'faBriefcase', 'faDrumstickBite', 'faFutbol',
        'faBaby', 'faComputer', 'faChair', 'faSackDollar', 'faGifts', 'faBook', 'faSmileBeam', 'faBars', 'faChevronUp',
        'faEye', 'faStar', 'faEllipsisH', 'faShareAlt', 'faCircleChevronDown', 'faUpRightFromSquare', 'faCircleInfo',
        'faShare', 'faXmark', 'faClone']
    }
  },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: ""
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: ''
  },

  sitemap: {
    hostname: 'https://za-halyavoi.ru',
    path: '/sitemap.xml',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: async () => {
      const result = []
      const categoryData = await axios.get("https://za-halyavoi.ru/api/admin/sitemap/category")
      const shopData = await axios.get("https://za-halyavoi.ru/api/admin/sitemap/shop")
      const holidayData = await axios.get("https://za-halyavoi.ru/api/admin/sitemap/holidays")
      const blogData = await axios.get("https://za-halyavoi.ru/api/admin/sitemap/blog")

      categoryData.data.forEach(i => result.push(`/categories/${i.lat_title}`))
      shopData.data.forEach(i => result.push(`/shop/${i.lat_title}`))
      holidayData.data.forEach(i => result.push(`/tags/${i.lat_title}`))
      blogData.data.forEach(i => result.push(`/blog/${i.lat_title}`))

      return result
    },
    exclude: [
      '/go',
      '/search'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    middleware: ['openPopup']
  }
}
