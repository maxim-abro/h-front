<template>
  <div class="">
    <m-bread-crumbs
      :crumbs="breadCrumbs"
    />
    <h1 class="text-lg xl:text-3xl font-bold my-8">
      <fa icon="magnifying-glass" class="text-primary"/>
      Результаты поиска по запросу: "{{ dataq }}"
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3" v-if="searchData.length">
      <nuxt-link :to="`/shop/${shop.uin}`" class="" v-for="shop of searchData" :key="shop.uin">
        <img :src="`https://za-halyavoi.ru/api/static/${shop.image}`" :alt="shop.title" class="w-full h-auto">
        <h2 class="text-center">{{ shop.title }}</h2>
      </nuxt-link>
    </div>
    <div class="font-medium text-lg" v-if="!searchData.length">
      Ничего не найдено по запросу "{{ dataq }}"
    </div>
  </div>
</template>

<script lang="ts">

export default {
  components: {},

  layout: 'default',
  data():any {
    return {
      searchData: [] as string[],
      dataq: '',
      breadCrumbs: [
        {
          // @ts-ignore
          title: `Результаты поиска "${this.$route.query.q}"`
        }
      ]
    }
  },
  head():object {
    return {
      //@ts-ignore
      title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год поиск по магазинам ${this.dataq}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. го za халявой!`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        }
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/search'
        }
      ]
    }
  },
  async asyncData({ $api, route }:any) {
    const response = await $api.get(`/search?q=${encodeURI(route.query.q)}`)

    return {
      searchData: response.data,
      dataq: route.query.q
    }
  }
}
</script>
