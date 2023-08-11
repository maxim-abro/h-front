<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl font-bold mb-8">
      Промокоды и акции на тему {{ holiday.title }}
    </h1>
    <img
      :title="holiday.title"
      loading="lazy"
      class="w-full mb-8 rounded"
      :src="`https://za-halyavoi.ru/api/static/holidays/${holiday.image}`"
      :alt="holiday.title"
    />

    <p class="mb-8" v-html="holiday.description"></p>

    <h2 class="font-bold text-lg mb-4">
      <fa icon="fire" class="text-primary" /> {{ holiday.title }} - лучшие
      промокоды и акции
    </h2>

    <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
      <m-vertical-card
        v-for="post in holiday.posts"
        :key="post.uin"
        :post="post"
        @like="likePost($event)"
      />
    </div>
  </div>
</template>

<script>
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
import MVerticalCard from '~/components/cards/MVerticalCard.vue'
export default {
  components: {
    MBreadCrumbs,
    MVerticalCard,
  },
  async asyncData({ $api, route }) {
    const holiday = await $api.get('/holiday/id/' + route.params.id)

    const breadCrumbs = [
      { link: '/tags', title: 'Теги' },
      { title: holiday.data.title },
    ]

    return {
      holiday: holiday.data,
      breadCrumbs,
    }
  },

  data() {
    return {
      holiday: null,
      breadCrumbs: [],
    }
  },
  head() {
    return {
      title: `${this.holiday.title}. Промокоды, скидки и акции для сайтов и интернет-магазинов`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.holiday.description.slice(0, 346),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.holiday.title}`,
        },
        {
          property: 'og:title',
          content: `${this.holiday.title}. Промокоды, скидки и акции для сайтов и интернет-магазинов`,
        },
        {
          property: 'og:description',
          content: this.holiday.description,
        },
        {
          property: 'og:url',
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
          href: 'https://za-halyavoi.ru/tags/' + this.$route.params.id,
        },
      ],
    }
  },
  methods: {
    async likePost(uin) {
      // @ts-ignore
      const likes = this.$cookies.get('likes')
      if (!likes) {
        // @ts-ignore
        await this.$api.get(`/post/like/${uin}`)
        // @ts-ignore
        this.$cookies.set('likes', [uin])
        // @ts-ignore
        this.holiday.posts.forEach((i) => {
          if (i.uin === uin) {
            i.rating = i.rating + 1
          }
        })
      } else {
        const findLike = likes.find((i) => i === uin)
        if (!findLike) {
          likes.push(uin)
          // @ts-ignore
          await this.$api.get(`/post/like/${uin}`)
          // @ts-ignore
          this.$cookies.set('likes', likes)
          // @ts-ignore
          this.holiday.posts.forEach((i) => {
            if (i.uin === uin) {
              i.rating = i.rating + 1
            }
          })
        }
      }
    },
  },
}
</script>
