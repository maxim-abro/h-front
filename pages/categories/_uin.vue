<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs"/>
    <h1 class="text-2xl lg:text-3xl font-bold mb-4"><fa :icon="category.icon" class="text-primary mr-3"/>Промокоды на скидку в категории {{ category.title.toLowerCase() }}</h1>
    <h2 class="text-gray-900 mb-3">{{ category.description }}</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
      <nuxt-link
        v-for="shop in shops"
        :key="shop.uin"
        :to="`/shop/${shop.uin}`"
        class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden"
      >
        {{ shop.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">

import {CategoryModel} from "~/models/category.model";
import {ShopModel} from "~/models/shop.model";

export default {
  data() {
    return {
      category: {} as CategoryModel,
      shops: [] as ShopModel[],
      breadCrumbs: [] as object[]
    }
  },
  head():any {
    return {
      // @ts-ignore
      title: `${this.category.title} по скидкам с купонами и промокодами на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: this.category.description.slice(0, 346) + "..."
        },
        {
          hid: 'keywords',
          name: 'keywords',
          // @ts-ignore
          content: `сайты, категории, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.category.title}, ${this.$store.state.seo.month}`
        },
        {
          hid: "og:title",
          name: 'og:title',
          content: `${this.category.title} по скидкам с купонами и промокодами на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.category.description
        },
        {
          hid: "og:url",
          name: 'og:url',
          content: `https://za-halyavoi.ru${this.$route.fullPath}`
        },
        {
          hid: "og:image",
          name: 'og:image',
          content: "https://za-halyavoi.ru/logo.png"
        },
        {
          hid: "og:type",
          name: 'og:type',
          content: "article"
        },
        {
          hid: "og:site_name",
          name: 'og:site_name',
          content: "за халявой"
        },
        {
          hid: "og:image:url",
          name: 'og:image:url',
          content: "https://za-halyavoi.ru/logo.png"
        },
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/categories/' + this.$route.params.uin
        }
      ]
    }
  },
  async asyncData({$api, route}:any) {
    const category = await $api.get(`/category/by/${route.params.uin}`)
    const shops = await $api.get(`/shop/category/${route.params.uin}`)

    const breadCrumbs = [
      {link: '/categories', title: 'Категории сайтов'},
      {title: category.data.title}
    ]
    return {
      category: category.data,
      shops: shops.data,
      breadCrumbs
    }
  }
}
</script>
