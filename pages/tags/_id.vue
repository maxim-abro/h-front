<template>
  <div class="">
    <m-bread-crumbs
      :crumbs="breadCrumbs"
    />
    <h1 class="text-2xl font-bold mb-8">Промокоды и акции на тему {{ holiday.title }}</h1>
    <img class="w-full mb-8 rounded" :src="`https://za-halyavoi.ru/api/static/holidays/${holiday.image}`" :alt="holiday.title">

    <p class="mb-8">{{ holiday.description }}</p>

    <h2 class="font-bold text-lg mb-4"> <fa icon="fire" class="text-primary" /> {{ holiday.title }} - лучшие промокоды и акции</h2>

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

export default {
  components: {},
  async asyncData({$api, route}) {
    const holiday = await $api.get("/holiday/id/" + route.params.id);

    const breadCrumbs = [
      {link: "/tags", title: "Теги"},
      {title: holiday.data.title},
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
          hid: "description",
          name: "description",
          content: this.holiday.description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.holiday.title}`,
        },
      ]
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
    }
  }
}
</script>
