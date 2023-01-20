<template>
  <div class="">
    <MBreadCrumbs
      :crumbs="breadCrumbs"
    />
    <h1 class="text-3xl font-bold">Все теги</h1>
    <div class="flex flex-wrap gap-2">
      <nuxt-link v-for="h of holidays" :key="h.id_holiday" :to="`/tags/${h.id_holiday}`" class="bg-zinc-200 hover:bg-zinc-100 px-2 py-1">{{ h.title }}</nuxt-link>
    </div>
  </div>
</template>


<script>

export default {
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
          content: `Сезонные скидки. Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. го za халявой!`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          // @ts-ignore
          content: `сезонные скидки, сезонная скидка, сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.$store.state.seo.month}`
        }
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
