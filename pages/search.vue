<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-lg xl:text-3xl font-bold my-8">
      <fa icon="magnifying-glass" class="text-primary" />
      Результаты поиска по запросу: "{{ dataq }}"
    </h1>

    <div
      v-if="searchData.length"
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3"
    >
      <nuxt-link
        v-for="shop of searchData"
        :key="shop.uin"
        :to="`/shop/${shop.lat_title}`"
        class=""
      >
        <img
          :title="shop.title"
          loading="lazy"
          :src="`https://za-halyavoi.ru/api/static/${shop.image}`"
          :alt="shop.title"
          class="w-full h-auto"
        />
        <h2 class="text-center">{{ shop.title }}</h2>
      </nuxt-link>
    </div>
    <div v-if="!searchData.length" class="font-medium text-lg">
      Ничего не найдено по запросу "{{ dataq }}"
    </div>
  </div>
</template>

<script lang="ts">
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
export default {
  components: {
    MBreadCrumbs,
  },
  layout: 'default',
  async asyncData({ $api, route }: any) {
    const response = await $api.get(`/search?q=${encodeURI(route.query.q)}`)

    return {
      searchData: response.data,
      dataq: route.query.q,
    }
  },
  data(): any {
    return {
      searchData: [] as string[],
      dataq: '',
      breadCrumbs: [
        {
          // @ts-ignore
          title: `Результаты поиска "${this.$route.query.q}"`,
        },
      ],
    }
  },
  head(): object {
    return {
      // @ts-ignore
      title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год поиск по магазинам ${this.dataq}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка',
        },
        {
          property: 'og:title',
          // @ts-ignore
          content: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год поиск по магазинам ${this.dataq}`,
        },
        {
          property: 'og:description',
          // @ts-ignore
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          property: 'og:url',
          // @ts-ignore
          content: `https://za-halyavoi.ru${this.$route.fullPath}`,
        },
        {
          property: 'og:image',
          content: 'https://za-halyavoi.ru/logo.png',
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:site_name',
          content: 'за халявой',
        },
        {
          property: 'og:image:url',
          content: 'https://za-halyavoi.ru/logo.png',
        },
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/search',
        },
      ],
    }
  },
}
</script>
