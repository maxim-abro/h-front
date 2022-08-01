<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-8" ref="hot">
      <fa icon="fire" class="text-primary" />
      Горячие скидки
    </h1>

    <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 mb-8" >
      <m-vertical-card
        v-for="post in posts"
        :key="post.uin"
        :post="post"
        @like="likePost($event)"
      />
    </div>
    <m-pagination
      v-model="pagination.current_page"
      :pageCount="pagination.total_pages"
       class="flex justify-center mb-10"
    />
  </div>
</template>

<script lang="ts">
import {PostModel} from "~/models/post.model";

export default {
  layout: 'default',
  data() {
    return {
      posts: [] as PostModel[],
      count: 0 as number,
      page: 1,
      pagination: {} as object
    }
  },
  head():any {
    return {
      // @ts-ignore
      title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
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
          // @ts-ignore
          content: `сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.$store.state.seo.month}`
        }
      ]
    }
  },
  async asyncData({ $api, route }:any) {
    const page = route.query.page || 1

    const postRes = await $api.get(`/post?page=${page}`)

    const pagination:object = {
      current_page: route.query.page || 1,
      total_elements: postRes.data.count,
      total_pages: Math.ceil(postRes.data.count / 15)
    };

    return { pagination, page, posts: postRes.data.rows, count: postRes.data.count }
  },
  methods: {
    async fetchPosts(page=0 as number) {
      // @ts-ignore
      const postRes = await this.$api.get(`/post?page=${page}`)

      // @ts-ignore
      this.posts = postRes.data.rows
      // @ts-ignore
      this.pagination = {
        current_page: page || 1,
        total_elements: postRes.data.count,
        total_pages: postRes.data.count / 15
      }
    },
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
  },
  watch: {
    async 'pagination.current_page'(query: string | number) {
      // @ts-ignore
      this.$router.push({query: { page: this.pagination.current_page.toString() }})

      // @ts-ignore
      const postRes = await this.$api.get(`/post?page=${query}`)

      // @ts-ignore
      this.posts = postRes.data.rows
      // @ts-ignore
      this.$refs.hot.scrollIntoView({block: 'start', behavior: 'smooth'})
    }
  }
}
</script>
