<template>
  <div class=''>
    <m-bread-crumbs :crumbs="breadCrumbs" class="mb-4"/>
    <div class="text-sm mb-5 flex justify-between">
      <div class="">{{ new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) }} </div>

      <div class="flex items-center">
        <div class="mr-4">
          <fa icon="heart" class="mr-2"/>{{ likes }}
        </div>
        <div>
          <fa icon="eye" class="mr-2"/>{{ counter }}
        </div>
      </div>
    </div>
    <img :src="`https://za-halyavoi.ru/api/static${preview}`" alt="" class="mb-8">
    <div v-html='body' class='prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60] prose-a:rounded prose-a:px-1 prose-a:no-underline'>
      <h1>{{ title }}</h1>
    </div>

    <div class="border-t pt-5 mb-12">
      <span class="mr-2" v-for="tag of blog_tags">#{{ tag.title }}</span>
    </div>
  </div>
</template>

<script>

export default {
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
          content: 'блог, новости, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        },
        {
          property: "og:title",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`
        },
        {
          property: "og:description",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
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
  computed: {
    tagsList() {
      return this.blog_tags.map(i => i.title)
    }
  }
}
</script>
