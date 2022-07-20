<template>
  <div class="">
    <h1 class="text-3xl font-bold">
      <fa icon="magnifying-glass" class="text-primary"/>
      Результаты поиска по запросу: "{{ dataq }}"
    </h1>

    <div class="grid grid-cols-5 gap-3">
      <div class="" v-for="shop of searchData" :key="shop.uin">
        <img :src="`https://za-halyavoi.ru/api/static/${shop.image}`" alt="" class="w-full h-auto">
        <h2 class="text-center">{{ shop.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  layout: 'default',
  data() {
    return {
      searchData: [] as string[],
      dataq: ''
    }
  },
  head() {
    return {
      title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на июль 2022 год поиск по магазинам ${this.dataq}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Свежие промокоды, скидки и акции на июль 2022 год, а также эксклюзивные купоны. го za халявой!'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        }
      ]
    }
  },
  async asyncData({ $api, route }:any) {
    const response = await $api.get(`/search?q=${route.query.q}`)

    return {
      searchData: response.data,
      dataq: route.query.q
    }
  }
}
</script>
