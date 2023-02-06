<template>
  <div class=''>

    <div v-html='body' class='prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none'></div>
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
      tags: []
    }
  },
  async asyncData({ $api, route }) {
    const blog = await $api.get(`/blog/id/${route.params.lat_title}`);

    const breadCrumbs = [
      {link: '/blog', title: 'Блог'},
      {title: ''}
    ]
    return {
      title: blog.data.title,
      body: blog.data.body,
      counter: blog.data.counter,
      likes: blog.data.likes,
      author: blog.data.author,
      tags: blog.data.tags,
    }
  }
}
</script>
