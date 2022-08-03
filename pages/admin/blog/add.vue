<template>
  <div class="container mt-40">
    <h1 class="text-3xl">Добавить новый блог</h1>
    <m-input
      placeholder="название блога"
      v-model="title"
    />
    <client-only>
      <tiptap-editor class="w-full" v-model="content"/>
    </client-only>

    <div class="mt-10">
      <h3>Content</h3>
      <pre><code>{{ content }}</code></pre>
    </div>

    <m-button @click="handleBlog">Добавить блог</m-button>

  </div>
</template>

<script>


export default {
  components: {},
  layout: 'admin',
  middleware({app ,redirect, $api}) {
    app.store.getters['auth/isAuth'] ? null : redirect('/')

    $api.post('/auth/check', {token: app.store.state.auth.token}).catch(() => {
      if (app.store.state.auth.token) {
        app.store.commit('auth/logout')
      }
      redirect('/?isAuth=false')
    })
  },
  data() {
    return {
      title: '',
      description: '',
      tags: '',
      image: '',
      content: ''
    }
  },
  methods: {
    async handleBlog() {
      await this.$api.post('/blog', {
        title: 'Тестовай тайтл',
        description: '123213215124452',
        body: this.content,
        date: new Date(),
      })
    },
  }

}
</script>
