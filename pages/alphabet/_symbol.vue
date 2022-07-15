<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-2">Магазины по алфавиту</h2>
    <h3 class="text-xl font-bold mb-4">Найдите интересующий вас магазин по первой букве:</h3>

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

    <h3 class="text-second text-xl mb-1">Сайты и магазины на "<span class="font-bold uppercase">{{ $route.params.symbol }}</span>"</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3" v-if="shops.length">
      <nuxt-link :to="`/shop/${shop.uin}`" class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden" v-for="shop in shops" :key="shop.uin">{{ shop.title }}</nuxt-link>
    </div>
    <div class="font-bold" v-else>Магазины скоро появятся</div>

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
  head() {
    return {
      title: 'Все магазины по алфавиту. Промокоды, скидки акции на июль 2022 год',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Свежие промокоды, скидки и акции на июль 2022 год, а также эксклюзивные купоны. го za халявой!'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        }
      ]
    }
  },
  async asyncData({ $api, route }:any) {
    const shops = await $api.get(`/shop/symbol/${route.params.symbol.toLowerCase()}`)

    return {
      shops: shops.data
    }
  }
}
</script>
