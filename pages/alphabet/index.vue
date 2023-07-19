<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-2">Магазины по алфавиту</h1>
    <h2 class="text-xl font-bold mb-4">Найдите интересующий вас магазин по первой букве:</h2>

    <div class="flex gap-2 mb-8">
      <nuxt-link
        to="/alphabet"
        class="text-second flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]">
        Все магазины
      </nuxt-link>
      <nuxt-link
        to="/alphabet/0"
        class="text-second flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]">
        Цифры
      </nuxt-link>
      <nuxt-link
        to="/alphabet/symbol"
        class="text-second flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]">
        Символы
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-2 mb-8">
      <nuxt-link
        v-for="i in engAlphabet"
        :key="i"
        :to="`/alphabet/${i}`"
        class="text-second block text-center bg-primary w-8 sm:w-10 text-second font-medium text-base py-1 sm:text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]">
        {{ i }}
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-2 mb-8">
      <nuxt-link
        v-for="i in ruAlphabet"
        :key="i"
        :to="`/alphabet/${i}`"
        class="text-second block text-center bg-primary w-8 sm:w-10 text-second font-medium text-base py-1 sm:text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]">
        {{ i }}
      </nuxt-link>
    </div>

    <h3 class="mt-10 text-second dark:text-zinc-200 text-xl mb-1">Сайты по цифрам "<span class="font-bold">0-9</span>"</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3" v-if="filterByNumber.length">
      <nuxt-link :to="`/shop/${shop.lat_title}`" v-for="shop in filterByNumber" :key="shop.uin" class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden">{{ shop.title }}
      </nuxt-link>
    </div>
    <div class="font-bold mb-3" v-else>Магазины скоро появятся</div>

    <h3 class="text-second dark:text-zinc-200 text-xl mb-1">Сайты по символам</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3" v-if="filterBySymbol.length">
      <nuxt-link :to="`/shop/${shop.lat_title}`" v-for="shop in filterBySymbol" :key="shop.uin" class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden">{{ shop.title }}
      </nuxt-link>
    </div>
    <div class="font-bold mb-3" v-else>Магазины скоро появятся</div>


    <div class='my-10' v-for="symbol in ruAlphabet" :key="symbol">
      <h3 class="text-second dark:text-zinc-200 text-xl mb-1">Сайты на букву "<span class="font-bold uppercase">{{ symbol }}</span>"</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3" v-if="filterByAlphabet(symbol).length">
        <nuxt-link :to="`/shop/${shop.lat_title}`" class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden" v-for="shop in filterByAlphabet(symbol)" :key="shop.uin">{{ shop.title }}</nuxt-link>
      </div>
      <div class="font-bold" v-else>Магазины скоро появятся</div>
    </div>
    <div class="my-10" v-for="symbol in engAlphabet" :key="symbol">
      <h3 class="text-second dark:text-zinc-200 text-xl mb-1">Сайты на букву "<span class="font-bold uppercase">{{ symbol }}</span>"</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" v-if="filterByAlphabet(symbol).length">
        <nuxt-link :to="`/shop/${shop.lat_title}`" class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden" v-for="shop in filterByAlphabet(symbol)" :key="shop.uin">{{ shop.title }}</nuxt-link>
      </div>
      <div class="font-bold" v-else>Магазины скоро появятся</div>
    </div>
  </div>
</template>

<script lang="ts">

import {ShopModel} from "~/models/shop.model";

export default {
  data() {
    return {
      shops: [] as ShopModel[],
      engAlphabet: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z',
      ],
      ruAlphabet: [
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж','з', 'и',
        'й', 'к','л', 'м', 'н', 'о','п', 'р', 'с', 'т',
        'у', 'ф', 'х', 'ц','ч', 'ш', 'щ', 'э','ю', 'я'
      ]
    }
  },
  head():any {
    return {
      // @ts-ignore
      title: `Все магазины по алфавиту. Промокоды, скидки акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        },
        {
          property: "og:title",
          // @ts-ignore
          content: `Все магазины по алфавиту. Промокоды, скидки акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`
        },
        {
          property: "og:description",
          // @ts-ignore
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
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
          href: 'https://za-halyavoi.ru/alphabet'
        }
      ]
    }
  },
  async asyncData({ $api }:any) {
    const shops = await $api.get('/shop')

    return {shops: shops.data}
  },
  methods: {
    filterByAlphabet(symbol:string):ShopModel[] {
      // @ts-ignore
      return this.shops.filter(i => {
        return i.title[0].toLowerCase() === symbol.toLowerCase()
      })
    },
  },
  computed: {
    filterBySymbol():ShopModel[] {
      const reg = /[^A-Za-z0-9А-Яа-яЁё]+/gi
      // @ts-ignore
      return this.shops.filter(i => {
        return reg.test(i.title[0])
      })
    },
    filterByNumber():ShopModel[] {
      const reg = /^[0-9]+/gi
      // @ts-ignore
      return this.shops.filter(i => {
        return reg.test(i.title)
      })
    }
  }
}
</script>
