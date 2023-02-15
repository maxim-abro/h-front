<template>
  <div class=''>
    <m-bread-crumbs :crumbs="breadCrumbs" class="mb-4"/>

    <div class='prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60]'>
      <h1>{{ title }}</h1>
    </div>

    <div class="text-sm mb-5 flex justify-between">
      <div class="">{{ new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) }} </div>

      <div class="flex items-center">
        <button @click='likeBlog(lat_title)' class="mr-4">
          <fa icon="heart" class="mr-2 hover:text-primary"/>{{ likes }}
        </button>
        <div>
          <fa icon="eye" class="mr-2"/>{{ counter }}
        </div>
      </div>
    </div>
    <img :title='title' :src="`https://za-halyavoi.ru/api/static${preview}`" alt="" class="mb-8">
    <div v-html='body' class='prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60] prose-a:rounded prose-a:px-1 prose-a:no-underline'></div>

    <div class="border-t pt-5 mb-12">
      <span class="mr-2" v-for="tag of blog_tags" :key='tag.title'>#{{ tag.title }}</span>
    </div>
  </div>
</template>

<script>
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
export default {
  components: {
    MBreadCrumbs,
  },
  data() {
    return {
      title: "",
      body: "",
      counter: 0,
      likes: 0,
      author: "",
      blog_tags: [],
      preview: "",
      description: "",
      breadCrumbs: null,
    }
  },
  head() {
    return {
      // @ts-ignore
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: this.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.tagsList
        },
        {
          property: "og:title",
          // @ts-ignore
          content: this.title
        },
        {
          property: "og:description",
          // @ts-ignore
          content: this.description
        },
        {
          property: "og:url",
          // @ts-ignore
          content: `https://za-halyavoi.ru${this.$route.fullPath}`
        },
        {
          property: "og:image",
          content: "https://za-halyavoi.ru/api/static" + this.preview
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
          content: "https://za-halyavoi.ru/api/static" + this.preview
        },
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/blog/' + this.lat_title
        }
      ]
    }
  },
  async asyncData({ $api, route }) {
    const blog = await $api.get(`/blog/id/${route.params.lat_title}`);

    const breadCrumbs = [
      {link: '/blog', title: 'Блог'},
      {title: blog.data.title}
    ]

    return {
      ...blog.data,
      breadCrumbs,
    }
  },
  methods: {
    async likeBlog(lat_title) {
      const likes = this.$cookies.get('likes-blog')
      if (!likes) {
        await this.$api.get(`/blog/like/${lat_title}`)
        this.$cookies.set('likes-blog',[lat_title])
        this.likes = this.likes + 1
      } else {
        const findLike = likes.find(i => i === lat_title)
        if (!findLike) {
          likes.push(lat_title)
          await this.$api.get(`/blog/like/${lat_title}`)
          this.$cookies.set('likes-blog',likes)
          this.likes = this.likes + 1
        }
      }
    }
  },
  computed: {
    tagsList() {
      return this.blog_tags.map(i => i.title)
    }
  }
}
</script>
