<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs"/>
    <h1 class="text-2xl lg:text-3xl font-bold mb-4"><fa icon="braille" class="text-primary mr-1"/> Все предложения по скидкам</h1>
    <h2 class="text-xl lg:text-2xl font-bold mb-3">Найдите интересующий вас сайт по категории:</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
      <nuxt-link
        v-for="category in categories"
        :key="category.uin"
        :to="`/categories/${category.lat_title}`"
        class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden"
      >
        <fa :icon="category.icon" class="mr-3 w-4"/>{{ category.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
import {CategoryModel} from "~/models/category.model";

export default {
  components: {
    MBreadCrumbs,
  },
  data() {
    return {
      categories: [] as CategoryModel[],
      breadCrumbs: [
        {title: 'Категории сайтов'},
      ]
    }
  },
  head():any {
    return {
      // @ts-ignore
      title: `Промокоды, скидки акции по категориям на ${this.$store.state.seo.month} ${this.$store.state.seo.month} год.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Промокоды и скидки по категориям - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'сайты, категории, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        },
        {
          property: "og:title",
          // @ts-ignore
          content: `Промокоды, скидки акции по категориям на ${this.$store.state.seo.month} ${this.$store.state.seo.month} год.`
        },
        {
          property: "og:description",
          // @ts-ignore
          content: `Промокоды и скидки по категориям - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
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
          href: 'https://za-halyavoi.ru/categories'
        }
      ]
    }
  },

  async asyncData({$api}:any) {
    const categories = await $api.get('/category')

    return {
      categories: categories.data
    }
  }
}
</script>
