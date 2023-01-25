<template>
  <div class="container flex flex-col lg:flex-row mt-10">
    <main class="lg:w-9/12 mb-10 lg:mb-0 lg:mr-4">
      <m-bread-crumbs
        :crumbs="breadCrumbs"
      />
      <h1 class="text-2xl font-bold mb-8">
        Промокоды и скидки {{ shopData.title }}
      </h1>

      <div v-if="posts.length" class="mb-20">
        <m-horizontal-card
          v-for="post in posts"
          :key="post.uin"
          :post="post"
          @like="likePost($event)"
        />
      </div>
      <div v-if='!posts.length' class="mb-20">
        <h2 class="text-3xl font-bold">К сожалению промокодов не найдено, но мы можем предложить промокоды <nuxt-link class='text-primary underline hover:no-underline' to='/alphabet'>других магазинов</nuxt-link></h2>
      </div>

      <h2 class='text-2xl font-bold mb-8'>Промокоды, похожие на {{ shopData.title }}</h2>

      <div class='mb-20'>
        <m-horizontal-card
          v-for="post of recommended"
          :key="post.uin"
          :post="post"
          @like="likePost($event)"
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
      // @ts-ignore
      title: `Промокоды акции и скидки из магазина ${this.seo.title} на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: this.seo.description.slice(0, 346) + "..."
        },
        {
          hid: 'keywords',
          name: 'keywords',
          // @ts-ignore
          content: `сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.seo.title}, ${this.$store.state.seo.month}, ${this.$store.state.seo.year}`
        },
        {
          property: "og:title",
          // @ts-ignore
          content: `Промокоды акции и скидки из магазина ${this.seo.title} на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`
        },
        {
          property: "og:description",
          // @ts-ignore
          content: this.seo.description
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
          href: 'https://za-halyavoi.ru/shop/' + this.$route.params.uin
        }
      ]
    }
  },
  data():any {
    return {
      shopData: {} as ShopModel,
      posts: [] as PostModel[],
      page: 1 as number,
      count: 0 as number,
      recommended: [] as PostModel[],
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
    const recommended = await $api.post('/post/recommended', {
      categories: shop.data.categories,
      shop: shop.data.uin
    });


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
      breadCrumbs,
      recommended: recommended.data,
    }
  },
  methods: {
    async likePost(uin:string) {
      // @ts-ignore
      const likes = this.$cookies.get('likes')
      if (!likes) {
        // @ts-ignore
        await this.$api.get(`/post/like/${uin}`)
        // @ts-ignore
        this.$cookies.set('likes', [uin])
        // @ts-ignore
        this.posts.forEach((i:any) => {
          if (i.uin === uin) {
            i.rating = i.rating + 1
          }
        })
      } else {
        const findLike = likes.find((i:any) => i === uin)
        if (!findLike) {
          likes.push(uin)
          // @ts-ignore
          await this.$api.get(`/post/like/${uin}`)
          // @ts-ignore
          this.$cookies.set('likes', likes)
          // @ts-ignore
          this.posts.forEach((i:any) => {
            if (i.uin === uin) {
              i.rating = i.rating + 1
            }
          })
        }
      }
    }
  }
}
</script>
