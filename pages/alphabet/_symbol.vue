<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-2">
      Магазины по алфавиту на {{ titlePage }}
    </h1>
    <h2 class="text-xl font-bold mb-4">
      Найдите интересующий вас магазин по первой букве:
    </h2>

    <div class="flex gap-2 mb-8">
      <nuxt-link
        to="/alphabet"
        class="text-second flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]"
      >
        Все магазины
      </nuxt-link>
      <nuxt-link
        to="/alphabet/0"
        class="text-second flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]"
      >
        Цифры
      </nuxt-link>
      <nuxt-link
        to="/alphabet/symbol"
        class="text-second flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]"
      >
        Символы
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-2 mb-8">
      <nuxt-link
        v-for="i in engAlphabet"
        :key="i"
        :to="`/alphabet/${i}`"
        class="text-second block text-center bg-primary w-8 sm:w-10 text-second font-medium text-base py-1 sm:text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]"
      >
        {{ i }}
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-2 mb-8">
      <nuxt-link
        v-for="i in ruAlphabet"
        :key="i"
        :to="`/alphabet/${i}`"
        class="text-second block text-center bg-primary w-8 sm:w-10 text-second font-medium text-base py-1 sm:text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]"
      >
        {{ i }}
      </nuxt-link>
    </div>

    <h3 class="text-second dark:text-zinc-200 text-xl mb-1">
      Сайты и магазины на "<span class="font-bold uppercase">{{
        titlePage
      }}</span
      >"
    </h3>

    <div
      v-if="shops.length"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3"
    >
      <nuxt-link
        v-for="shop in shops"
        :key="shop.uin"
        :to="`/shop/${shop.lat_title}`"
        class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
        >{{ shop.title }}</nuxt-link
      >
    </div>
    <div v-else class="font-bold">Магазины скоро появятся</div>
  </div>
</template>

<script lang="ts">
import { ShopModel } from '~/models/shop.model'

export default {
  async asyncData({ $api, route }: any) {
    const shops = await $api.get(
      `/shop/symbol/${encodeURIComponent(route.params.symbol.toLowerCase())}`
    )

    return {
      shops: shops.data,
    }
  },
  data() {
    return {
      shops: [] as ShopModel[],
      engAlphabet: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ],
      ruAlphabet: [
        'а',
        'б',
        'в',
        'г',
        'д',
        'е',
        'ё',
        'ж',
        'з',
        'и',
        'й',
        'к',
        'л',
        'м',
        'н',
        'о',
        'п',
        'р',
        'с',
        'т',
        'у',
        'ф',
        'х',
        'ц',
        'ч',
        'ш',
        'щ',
        'э',
        'ю',
        'я',
      ],
    }
  },
  head(): any {
    return {
      // @ts-ignore
      title: `Все магазины на ${this.titlePage}. Промокоды, скидки акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Все магазины на ${this.$route.params.symbol.toLowerCase()}. Свежие промокоды, скидки и акции на ${
            // @ts-ignore
            this.$store.state.seo.month
          } ${
            // @ts-ignore
            this.$store.state.seo.year
          } год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка',
        },
        {
          property: 'og:title',
          // @ts-ignore
          content: `Все магазины на ${this.$route.params.symbol.toLowerCase()}. Промокоды, скидки акции на ${
            // @ts-ignore
            this.$store.state.seo.month
            // @ts-ignore
          } ${this.$store.state.seo.year} год`,
        },
        {
          property: 'og:description',
          // @ts-ignore
          content: `Все магазины на ${this.$route.params.symbol.toLowerCase()}. Свежие промокоды, скидки и акции на ${
            // @ts-ignore
            this.$store.state.seo.month
          } ${
            // @ts-ignore
            this.$store.state.seo.year
          } год, а также эксклюзивные купоны. Бегом za халявой!`,
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
          href: 'https://za-halyavoi.ru/alphabet/' + this.$route.params.symbol,
        },
      ],
    }
  },
  computed: {
    titlePage(): string {
      // @ts-ignore
      if (this.$route.params.symbol === 'symbol') {
        return 'символ'
        // @ts-ignore
      } else if (this.$route.params.symbol === '0') {
        return 'цифру'
      } else {
        // @ts-ignore
        return this.$route.params.symbol
      }
    },
  },
}
</script>
