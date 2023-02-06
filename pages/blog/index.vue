<template>
  <div class=''>
    <m-bread-crumbs :crumbs="breadCrumbs"/>
    <h1 class="text-2xl lg:text-3xl font-bold mb-4">Блог</h1>

    <div class='grid gird-cols-1 xl:grid-cols-2 gap-1'>
      <div v-for='blog of blogs' :key='blog.id' class='rounded shadow shadow-md shadow-[#00000070]'>
        <img class='mb-4 rounded-t' :src='`https://za-halyavoi.ru/api/static${blog.preview}`' alt=''>
        <div class='p-2'>
          <h2 class='font-bold text-xl mb-2'>{{ blog.title }}</h2>
          <p>{{ blog.description }}</p>

          <div class='flex justify-between items-center mt-4'>
            <nuxt-link :to='`/blog/${blog.lat_title}`'>
              <m-button>Читать далее</m-button>
            </nuxt-link>
            <div class=''>{{ new Date(blog.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      blogs: [],
      breadCrumbs: [
        {title: "Блог"}
      ]
    }
  },
  head() {
    return {
      // @ts-ignore
      title: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'блог, новости, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        },
        {
          property: "og:title",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`
        },
        {
          property: "og:description",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
        },
        {
          property: "og:url",
          // @ts-ignore
          content: `https://za-halyavoi.ru${this.$route.fullPath}`
        },
        {
          property: "og:image",
          content: "https://za-halyavoi.ru/logo.png"
        },
        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:site_name",
          content: "за халявой"
        },
        {
          property: "og:image:url",
          content: "https://za-halyavoi.ru/logo.png"
        },
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/blog'
        }
      ]
    }
  },
  async asyncData({$api}) {
    const blogs = await $api.get('/blog/all')

    return {
      blogs: blogs.data
    }
  }
}
</script>
