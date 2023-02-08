<template>
  <div class="">
    <MBreadCrumbs
      :crumbs="breadCrumbs"
    />
    <h1 class="text-3xl font-bold">Все теги</h1>
    <div class="flex flex-wrap gap-2">
      <nuxt-link v-for="h of holidays" :key="h.id_holiday" :to="`/tags/${h.lat_title}`" class="bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-2 py-1">{{ h.title }}</nuxt-link>
    </div>
  </div>
</template>


<script>

export default {
  components: {
    MBreadCrumbs: () => import('~/components/MBreadCrumbs.vue'),
  },
  data() {
    return {
      holidays: [],
      breadCrumbs: [
        {title: "Теги"},
      ],
    }
  },
  head() {
    return {
      title: `Сезонные скидки. Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Сезонные скидки. Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          // @ts-ignore
          content: `сезонные скидки, сезонная скидка, сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.$store.state.seo.month}`
        },
        {
          property: "og:title",
          content: `Сезонные скидки. Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`
        },
        {
          property: "og:description",
          content: `Сезонные скидки. Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
        },
        {
          property: "og:url",
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
          href: 'https://za-halyavoi.ru/tags'
        }
      ]
    }
  },
  async asyncData({$api}) {
    const holidays = await $api.get("/holiday/all");

    return {
      holidays: holidays.data,
    }
  }
}
</script>
