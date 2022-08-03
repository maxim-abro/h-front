<template>
  <div class="container mt-40">
    <h1 class="text-3xl font-bold">Добавить пост в vk</h1>

    <textarea placeholder="о посте" class="outline outline-2 focus:outline-primary w-full h-20 mb-4" v-model="message"></textarea>
    <m-input type="file" @change="inputImage" class="mb-2"/>

    <m-button @click="handleForm">Добавить пост</m-button>
  </div>
</template>

<script>

export default {
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
      message: '',
      image: ''
    }
  },
  watch: {
    textPost(value) {
      this.textPost = value.replace(/\r?\n/g, '\n')
    }
  },
  methods: {
    async inputImage(event) {
      try {
        const formData = new FormData()
        formData.append('file', event.target.files[0])

        // @ts-ignore
        const res = await this.$api.post('/upload_vk', formData)

        // @ts-ignore
        this.image = res.data
      } catch (e) {
        console.log(e)
      }
    },
    async handleForm() {
      try {
        await this.$api.post('/queue_vk', { message: this.message, image: this.image })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
