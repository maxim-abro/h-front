<template>
  <div class="container flex flex-col lg:flex-row mt-10">
    <main class="lg:w-9/12 mb-10 lg:mb-0 lg:mr-4">
      <m-bread-crumbs
        :crumbs="breadCrumbs"
      />
      <h2 class="text-2xl font-bold mb-8">
        Промокоды и скидки {{ shopData.title }}
      </h2>

      <div class="mb-40">
        <m-horizontal-card
          v-for="post in posts"
          :key="post.uin"
          :post="post"
        />
      </div>
    </main>

    <aside class="lg:w-3/12 mb-10 lg:mb-0 lg:ml-4">
      <shop-aside :data="shopData" class="mb-10"/>

      <m-popular-aside :popular="$store.state.aside.popular"/>
    </aside>
  </div>
</template>

<script lang="ts">
import {ShopModel} from "~/models/shop.model";
import {PostModel} from "~/models/post.model";

export default {
  layout: 'shop',
  head():any {
    return {
      //@ts-ignore
      title: `Промокоды акции и скидки из магазина ${this.seo.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          //@ts-ignore
          content: this.seo.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          //@ts-ignore
          content: `сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.seo.title}`
        }
      ],
    }
  },
  data():any {
    return {
      shopData: {} as ShopModel,
      posts: [] as PostModel[],
      page: 1 as number,
      count: 0 as number,
      seo: {
        title: '',
        description: '',
      },
      breadCrumbs: [] as object[]
    }
  },
  async asyncData({ $api, route }:any) {
    const page = route.query.page || 1

    const shop = await $api.get(`/shop/${route.params.uin}`)
    const posts = await $api.get(`/post/?shop=${route.params.uin}&page=${page}`)


    const breadCrumbs = [
      {link: '/categories', title: 'Категории сайтов'},
      {link: `/categories/${shop.data.category.uin}`, title: shop.data.category.title},
      {title: shop.data.title}
    ]

    return {
      shopData: shop.data,
      posts: posts.data.rows,
      count: posts.data.count,
      page,
      seo: {
        title: shop.data.title,
        description: shop.data.description
      },
      breadCrumbs
    }
  }
}
</script>
